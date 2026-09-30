// Netlify Function that receives contact submissions from the site and forwards
// them to admin.tayoos.com with a shared secret held only on the server side.
//
// The site's browser bundle NEVER sees the secret — it only POSTs its own
// {name, email, subject, message} JSON to /.netlify/functions/contact.
//
// Configure in Netlify site → Site configuration → Environment variables:
//   CONTACT_WEBHOOK_SECRET  — matches the value set on tayoos-admin
//   ADMIN_WEBHOOK_URL       — default https://admin.tayoos.com/api/contact/webhook

const ADMIN_WEBHOOK_URL = process.env.ADMIN_WEBHOOK_URL || 'https://admin.tayoos.com/api/contact/webhook';
const SECRET = process.env.CONTACT_WEBHOOK_SECRET;

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers: cors, body: JSON.stringify({ message: 'Use POST' }) };
    if (!SECRET) return { statusCode: 503, headers: cors, body: JSON.stringify({ message: 'Contact relay not configured' }) };

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'Invalid JSON' }) };
    }

    const name = String(payload.name ?? '').trim();
    const email = String(payload.email ?? '').trim();
    const subject = String(payload.subject ?? '').trim();
    const message = String(payload.message ?? '').trim();
    const source = String(payload.source ?? 'tayoos.com').trim();
    const honeypot = String(payload.website ?? ''); // honeypot field (see the form example below)

    if (honeypot) return { statusCode: 204, headers: cors }; // silently drop bot submissions
    if (!name || name.length > 100) return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'Name required' }) };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'Valid email required' }) };
    if (message.length < 4 || message.length > 4000) return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'Message must be 4-4000 characters' }) };
    if (subject.length > 200) return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'Subject too long' }) };

    try {
        const res = await fetch(ADMIN_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Secret': SECRET,
            },
            body: JSON.stringify({ name, email, subject, message, source }),
        });
        if (!res.ok) {
            const body = await res.text().catch(() => '');
            return { statusCode: 502, headers: cors, body: JSON.stringify({ message: `Admin relay ${res.status}: ${body.slice(0, 200)}` }) };
        }
        return { statusCode: 200, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
    } catch (err) {
        return { statusCode: 502, headers: cors, body: JSON.stringify({ message: err.message }) };
    }
};

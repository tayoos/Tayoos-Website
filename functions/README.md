# Netlify Functions

## `contact.js` — Contact form relay

Receives `POST /.netlify/functions/contact` from the site's contact form and forwards it to `admin.tayoos.com/api/contact/webhook` with a shared secret held only server-side. Submissions land in the admin panel's Contact inbox.

### Site environment variables

Set in Netlify → Site configuration → **Environment variables**:

| Variable | Value | Notes |
|---|---|---|
| `CONTACT_WEBHOOK_SECRET` | Same random hex you set on tayoos-admin | Server-side only. NEVER prefix with `VITE_` — that would leak it to the browser bundle. |
| `ADMIN_WEBHOOK_URL` | *(optional)* | Defaults to `https://admin.tayoos.com/api/contact/webhook`. Override if you ever move the admin. |

Set for **all deploy contexts** (production + branch deploys) if you want the form to work on preview URLs too.

### Expected request body (from the site's form)

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Hello (optional)",
  "message": "I'd like to chat about a project.",
  "source": "tayoos.com (optional)",
  "website": ""
}
```

- `website` is a honeypot field. Bots often auto-fill every input; a non-empty value silently drops the submission with a 204.
- All other fields are validated (email format, message length 4–4000 chars, name required, etc).

### Client-side form example (minimal)

Anywhere in the React app:

```jsx
async function submitContact({ name, email, subject, message }) {
  const res = await fetch('/.netlify/functions/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message, source: 'tayoos.com' }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message ?? 'Send failed');
}
```

Add a hidden `<input name="website" tabIndex="-1" autoComplete="off">` to your form and pass its value under `website` — the function drops submissions where it's non-empty.

### Local dev

```
npx netlify dev
```

Serves the site + functions locally on `http://localhost:8888`. Function is reachable at `/.netlify/functions/contact` just like in production.

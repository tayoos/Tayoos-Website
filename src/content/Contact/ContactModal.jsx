import React, { useContext, useState } from 'react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';
import './ContactModal.css';

const WEBHOOK_URL = 'https://admin.tayoos.com/api/contact/webhook';
const WEBHOOK_SECRET = import.meta.env.VITE_CONTACT_WEBHOOK_SECRET ?? '';
const FALLBACK_EMAIL = 'dtoshidero@gmail.com';

const ContactModal = () => {
    const { darkMode } = useContext(ModalContext);

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    // Bots love filling every field. Real users leave `hp` (honeypot) empty.
    const [hp, setHp] = useState('');
    const [status, setStatus] = useState({ state: 'idle', error: null });

    const canSubmit =
        form.name.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
        form.message.trim().length >= 4 &&
        status.state !== 'sending';

    const onField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        if (hp) return; // silently drop bot submissions

        setStatus({ state: 'sending', error: null });

        try {
            const res = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Webhook-Secret': WEBHOOK_SECRET,
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    message: form.message.trim(),
                    source: 'tayoos.com',
                    userAgent: navigator.userAgent,
                }),
            });

            if (!res.ok) {
                throw new Error(`Webhook returned ${res.status}`);
            }

            setStatus({ state: 'sent', error: null });
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            console.error('Contact webhook failed:', err);
            setStatus({ state: 'error', error: err.message });
        }
    };

    return (
        <div className={`ContactModal ${darkMode ? 'dark' : ''}`}>
            {status.state === 'sent' ? (
                <div className="ContactModal-sent">
                    <h3>Message sent.</h3>
                    <p>I'll get back to you at the email you provided.</p>
                    <button
                        type="button"
                        className="ContactModal-secondary"
                        onClick={() => setStatus({ state: 'idle', error: null })}
                    >
                        Send another
                    </button>
                </div>
            ) : (
                <form className="ContactModal-form" onSubmit={submit} noValidate>
                    <label className="ContactModal-field">
                        <span>Name</span>
                        <input
                            type="text"
                            value={form.name}
                            onChange={onField('name')}
                            autoComplete="name"
                            maxLength={100}
                            required
                        />
                    </label>

                    <label className="ContactModal-field">
                        <span>Email</span>
                        <input
                            type="email"
                            value={form.email}
                            onChange={onField('email')}
                            autoComplete="email"
                            maxLength={200}
                            required
                        />
                    </label>

                    <label className="ContactModal-field">
                        <span>Message</span>
                        <textarea
                            value={form.message}
                            onChange={onField('message')}
                            rows={6}
                            maxLength={4000}
                            required
                        />
                    </label>

                    {/* Honeypot — hidden from real users, catches naive form-fillers. */}
                    <label className="ContactModal-hp" aria-hidden="true">
                        Leave this field blank
                        <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={hp}
                            onChange={(e) => setHp(e.target.value)}
                        />
                    </label>

                    {status.state === 'error' && (
                        <p className="ContactModal-error">
                            Couldn't send — {status.error}. You can also email{' '}
                            <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
                        </p>
                    )}

                    <div className="ContactModal-actions">
                        <a className="ContactModal-secondary" href={`mailto:${FALLBACK_EMAIL}`}>
                            Prefer email? {FALLBACK_EMAIL}
                        </a>
                        <button type="submit" className="ContactModal-submit" disabled={!canSubmit}>
                            {status.state === 'sending' ? 'Sending…' : 'Send'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactModal;

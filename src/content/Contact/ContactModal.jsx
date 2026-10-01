import { useContext, useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Mail, Send } from 'lucide-react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';
import './ContactModal.css';

const FALLBACK_EMAIL = 'dtoshidero@gmail.com';
const EMPTY_FORM = { name: '', email: '', message: '' };
const FORM_NAME = 'contact';

// Encode form fields as application/x-www-form-urlencoded for Netlify Forms.
const encode = (data) =>
    Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`)
        .join('&');

const ContactModal = () => {
    const { darkMode } = useContext(ModalContext);
    const id = useId();
    const [form, setForm] = useState(EMPTY_FORM);
    const [touched, setTouched] = useState({});
    const [hp, setHp] = useState('');
    const [status, setStatus] = useState('idle');
    const [sentEmail, setSentEmail] = useState('');
    const formRef = useRef(null);
    const successRef = useRef(null);
    const requestRef = useRef(null);
    const sending = status === 'sending';
    const errors = {
        name: form.name.trim() ? '' : 'Please enter your name.',
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : 'Enter a valid email so I can reply.',
        message: form.message.trim().length >= 4 ? '' : 'Add a little more detail (at least 4 characters).',
    };

    useEffect(() => () => requestRef.current?.abort(), []);
    useEffect(() => {
        if (status === 'sent') successRef.current?.focus();
    }, [status]);

    const onField = (field) => (event) => {
        setForm((previous) => ({ ...previous, [field]: event.target.value }));
        if (status === 'error') setStatus('idle');
    };
    const fieldProps = (field) => ({
        id: `${id}-${field}`, name: field, value: form[field],
        onChange: onField(field),
        onBlur: () => setTouched((previous) => ({ ...previous, [field]: true })),
        'aria-invalid': Boolean(touched[field] && errors[field]),
        'aria-describedby': touched[field] && errors[field] ? `${id}-${field}-error` : undefined,
        required: true, readOnly: sending,
    });
    const fieldError = (field) => touched[field] && errors[field] && (
        <span className="ContactModal-field-error" id={`${id}-${field}-error`}>{errors[field]}</span>
    );

    const submit = async (event) => {
        event.preventDefault();
        if (requestRef.current || sending || hp) return;
        setTouched({ name: true, email: true, message: true });
        const invalid = Object.keys(errors).find((field) => errors[field]);
        if (invalid) {
            formRef.current.elements.namedItem(invalid)?.focus();
            return;
        }
        setStatus('sending');
        const controller = new AbortController();
        requestRef.current = controller;
        const timeout = setTimeout(() => controller.abort(), 15000);
        try {
            // Netlify Forms expects a urlencoded POST to any path on the site
            // with form-name matching one of its detected forms.
            const response = await fetch('/', {
                method: 'POST',
                signal: controller.signal,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                    'form-name': FORM_NAME,
                    'bot-field': hp,
                    name: form.name.trim(),
                    email: form.email.trim(),
                    message: form.message.trim(),
                    source: 'tayoos.com',
                }),
            });
            if (!response.ok) throw new Error(`Contact request returned ${response.status}`);
            setSentEmail(form.email.trim());
            setStatus('sent');
            setForm(EMPTY_FORM);
            setTouched({});
        } catch {
            setStatus('error');
        } finally {
            clearTimeout(timeout);
            requestRef.current = null;
        }
    };

    const emailLink = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent('Hello from tayoos.com')}&body=${encodeURIComponent(form.message)}`;

    return (
        <div className={`ContactModal ${darkMode ? 'dark' : ''}`}>
            {status === 'sent' ? (
                <section className="ContactModal-sent" aria-labelledby={`${id}-success`}>
                    <span className="ContactModal-icon ContactModal-icon-success"><Check aria-hidden="true" /></span>
                    <p className="ContactModal-eyebrow">Thanks for reaching out</p>
                    <h3 id={`${id}-success`} ref={successRef} tabIndex={-1}>Your message is on its way.</h3>
                    <p>I’ll reply to <strong>{sentEmail}</strong>. Looking forward to the conversation.</p>
                    <button type="button" className="ContactModal-submit" onClick={() => setStatus('idle')}>
                        Write another message <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                </section>
            ) : (
                <>
                    <header className="ContactModal-intro">
                        <a className="ContactModal-icon ContactModal-email-icon" href={emailLink} aria-label={`Send an email to ${FALLBACK_EMAIL}`} title="Send an email instead">
                            <Mail size={23} aria-hidden="true" />
                        </a>
                        <div>
                            <h3>Start a conversation.</h3>
                            <p>Have a project in mind, a question or want to connect?</p>
                        </div>
                    </header>
                    <form
                        ref={formRef}
                        className="ContactModal-form"
                        name={FORM_NAME}
                        method="POST"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={submit}
                        noValidate
                        aria-busy={sending}
                    >
                        <input type="hidden" name="form-name" value={FORM_NAME} />
                        <p className="ContactModal-required">All fields are required.</p>
                        <div className="ContactModal-row">
                            <div className="ContactModal-field">
                                <label htmlFor={`${id}-name`}>Your name</label>
                                <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={100} placeholder="How should I address you?" />
                                {fieldError('name')}
                            </div>
                            <div className="ContactModal-field">
                                <label htmlFor={`${id}-email`}>Email address</label>
                                <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={200} placeholder="you@example.com" spellCheck={false} autoCapitalize="none" />
                                {fieldError('email')}
                            </div>
                        </div>
                        <div className="ContactModal-field">
                            <label htmlFor={`${id}-message`}>Your message</label>
                            <textarea {...fieldProps('message')} rows={5} maxLength={4000} placeholder="Tell me a little about what you have in mind…" />
                            <div className="ContactModal-message-meta">
                                <span>{fieldError('message')}</span>
                                <span className="ContactModal-count">{form.message.length.toLocaleString()} / 4,000</span>
                            </div>
                        </div>
                        <label className="ContactModal-hp" aria-hidden="true">
                            Leave this field blank
                            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" value={hp} onChange={(event) => setHp(event.target.value)} />
                        </label>
                        <div className="ContactModal-feedback" role="alert" aria-atomic="true">
                            <div className={`ContactModal-error ${status !== 'error' ? 'ContactModal-error-placeholder' : ''}`} aria-hidden={status !== 'error'}>
                                <strong>We couldn’t confirm your message was sent.</strong>
                                <p>Your message is still here. Try again, or <a href={emailLink}>send it by email</a>.</p>
                            </div>
                        </div>
                        <div className="ContactModal-actions">
                            <button type="submit" className="ContactModal-submit" disabled={sending}>
                                {sending ? <LoaderCircle className="ContactModal-spinner" size={17} aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
                                {sending ? 'Sending…' : status === 'error' ? 'Try again' : 'Send message'}
                            </button>
                        </div>
                        <span className="ContactModal-sr-only" role="status">{sending ? 'Sending your message. Please wait.' : ''}</span>
                    </form>
                </>
            )}
            <footer className="ContactModal-footer">
                <span>Prefer email?</span>
                <a href={emailLink}><span>{FALLBACK_EMAIL}</span><ArrowUpRight size={15} aria-hidden="true" /></a>
            </footer>
        </div>
    );
};

export default ContactModal;

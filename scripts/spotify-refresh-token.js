#!/usr/bin/env node
/**
 * Spotify — Re-authorize the MusicWidget's account and mint a fresh refresh token.
 *
 * Spotify refresh tokens can be invalidated (password change, account revoke,
 * ~180-day inactivity, app rotation). When the widget starts showing
 * "Failed to connect to the music service", it usually means the token that
 * powers the AWS Lambda (and .env fallback) is dead. Run this to get a new one.
 *
 * Usage (from repo root):
 *   node --env-file=.env scripts/spotify-refresh-token.js
 *
 * Prereqs — do these ONCE per Spotify app, not every time:
 *   1. In your Spotify Developer Dashboard (https://developer.spotify.com/dashboard),
 *      open the app whose CLIENT_ID/CLIENT_SECRET live in .env.
 *   2. Ensure Settings → Redirect URIs contains an entry that MATCHES the
 *      SPOTIFY_REDIRECT_URI this script uses (default: http://localhost:3000/callback).
 *      If a different URI is already registered, either add the default, or
 *      override at runtime, e.g.:
 *        SPOTIFY_REDIRECT_URI=http://localhost:5179/callback npm run spotify:refresh
 *   3. Save.
 *
 * Note: Spotify still honors localhost URIs registered in older apps (grandfathered).
 * For brand-new apps, prefer 127.0.0.1 over localhost.
 *
 * Flow:
 *   - Starts a local HTTP server on 127.0.0.1:8888
 *   - Prints an authorization URL — open it in your browser, log in, click Agree
 *   - Spotify redirects back to the local server with a one-time `code`
 *   - Script exchanges the code for access_token + refresh_token
 *   - Prints the new refresh_token
 *
 * After it prints the token, update BOTH places that store it:
 *   a) Tayoos-Website/.env  — VITE_SPOTIFY_REFRESH_TOKEN=<new token>
 *      (only used for local dev; production reads from AWS)
 *   b) AWS SSM Parameter Store — the parameter the currently-playing Lambda reads.
 *      Look up the parameter name in the Lambda code / env; likely something like
 *      /tayoos/spotify/refresh_token. Update via the AWS console or:
 *        aws ssm put-parameter --name /tayoos/spotify/refresh_token \
 *          --type SecureString --overwrite --value '<new token>'
 *
 * Then redeploy the Lambda (if it caches on cold start only, force a new deploy).
 */

import http from 'node:http';
import crypto from 'node:crypto';
import { URL } from 'node:url';

const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;

// Redirect URI must EXACTLY match one registered in the Spotify app dashboard.
// Spotify no longer accepts `http://localhost` at authorization time (even when
// grandfathered in the dashboard). Only `http://127.0.0.1` (loopback IP literal)
// or `https://` schemes work. Add `http://127.0.0.1:3000/callback` to your app's
// Redirect URIs list, then this default will match.
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI ?? 'http://127.0.0.1:3000/callback';

let parsedRedirect;
try {
    parsedRedirect = new URL(REDIRECT_URI);
} catch {
    console.error(`ERROR: SPOTIFY_REDIRECT_URI is not a valid URL: ${REDIRECT_URI}`);
    process.exit(1);
}
const HOST = parsedRedirect.hostname;
const PORT = Number(parsedRedirect.port || (parsedRedirect.protocol === 'https:' ? 443 : 80));
const CALLBACK_PATH = parsedRedirect.pathname || '/callback';

// Scopes the MusicWidget actually uses.
const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
].join(' ');

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('ERROR: VITE_SPOTIFY_CLIENT_ID and VITE_SPOTIFY_CLIENT_SECRET must be set.');
    console.error('Run with:  node --env-file=.env scripts/spotify-refresh-token.js');
    process.exit(1);
}

const state = crypto.randomBytes(16).toString('hex');

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('scope', SCOPES);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('state', state);
authUrl.searchParams.set('show_dialog', 'true');

async function exchangeCodeForTokens(code) {
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
    });

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });

    const text = await res.text();
    if (!res.ok) {
        throw new Error(`Spotify token exchange failed (${res.status}): ${text}`);
    }
    return JSON.parse(text);
}

function respond(res, status, html) {
    res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);
    if (url.pathname !== CALLBACK_PATH) {
        respond(res, 404, `<h1>Not found</h1><p>This server only handles ${CALLBACK_PATH}.</p>`);
        return;
    }

    const returnedState = url.searchParams.get('state');
    const code = url.searchParams.get('code');
    const err = url.searchParams.get('error');

    if (err) {
        respond(res, 400, `<h1>Spotify returned an error</h1><pre>${err}</pre>`);
        console.error('Spotify authorization error:', err);
        server.close();
        process.exit(1);
    }

    if (returnedState !== state) {
        respond(res, 400, '<h1>State mismatch</h1><p>Possible CSRF. Aborted.</p>');
        console.error('State mismatch — expected', state, 'got', returnedState);
        server.close();
        process.exit(1);
    }

    if (!code) {
        respond(res, 400, '<h1>Missing code</h1>');
        console.error('No code parameter in callback');
        server.close();
        process.exit(1);
    }

    try {
        const tokens = await exchangeCodeForTokens(code);
        respond(
            res,
            200,
            `<h1>Done.</h1><p>New refresh token printed in the terminal. You can close this tab.</p>`
        );
        console.log('\n===== NEW SPOTIFY REFRESH TOKEN =====\n');
        console.log(tokens.refresh_token);
        console.log('\n=====================================\n');
        console.log('Also received:');
        console.log('  access_token (short-lived, ignore for storage):', `${tokens.access_token.slice(0, 20)}...`);
        console.log('  expires_in:', tokens.expires_in, 'seconds');
        console.log('  scope:     ', tokens.scope);
        console.log('  token_type:', tokens.token_type);
        console.log('\nNext steps:');
        console.log('  1. Paste the refresh token into Tayoos-Website/.env  →  VITE_SPOTIFY_REFRESH_TOKEN=');
        console.log('  2. Update the AWS SSM parameter the currently-playing Lambda reads (see file header).');
        console.log('  3. Redeploy the Lambda if it caches the token at cold start.');
        server.close();
        process.exit(0);
    } catch (e) {
        respond(res, 500, `<h1>Exchange failed</h1><pre>${e.message}</pre>`);
        console.error(e);
        server.close();
        process.exit(1);
    }
});

server.listen(PORT, HOST, () => {
    console.log('\nSpotify auth helper running.');
    console.log(`Local callback listener: ${REDIRECT_URI}`);
    console.log('(This URI must exactly match one registered in your Spotify app.)');
    console.log('\n1. Open this URL in your browser:\n');
    console.log(authUrl.toString());
    console.log('\n2. Log in to Spotify (if not already) and click "Agree".');
    console.log('3. You will be redirected back here. The new refresh token will print in this terminal.\n');
});

// Safety timeout so a forgotten run doesn't leave the server up.
setTimeout(() => {
    console.error('\nTimed out after 5 minutes without a callback. Exiting.');
    server.close();
    process.exit(1);
}, 5 * 60 * 1000).unref();

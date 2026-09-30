# Issues Log

## 2026-09-30 — Netlify white screen after chunk splitting (RESOLVED)

### Symptom
Site loaded fine locally in `npm run dev`, but production build (`npm run preview` and deployed Netlify) rendered a white screen. Console showed two variants of the same class of error:

```
vendor-C2VbikZs.js:24 Uncaught TypeError: Cannot read properties of undefined (reading 'forwardRef')
```

then after a partial fix:

```
vendor-2ffdjuOU.js:9 Uncaught TypeError: Cannot set properties of undefined (setting 'Children')
    at yp (vendor-2ffdjuOU.js:9:3911)
    at Kr (vendor-2ffdjuOU.js:9:6734)
    at Ue (grid-D1kGK0Dw.js:1:32729)
```

### Root cause
`vite.config.js` had `manualChunks` splitting the React ecosystem across multiple output chunks — one for React itself, plus separate chunks for `react-grid-layout`, `framer-motion`, `@mui`, `react-router`, etc. This caused two distinct failures:

1. **Missing React internals** — the regex `/[/\\]react[/\\]/` caught `react` and `react-dom` but missed transitive deps like `scheduler`, `use-sync-external-store`, and `object-assign`. Those stayed in `vendor`. Result: `react` chunk imported from `vendor` (needed scheduler), while `vendor` libraries (lucide-react, react-error-boundary, styled-components) imported from `react` chunk. Circular dependency between chunks → ES module bindings resolved as `undefined` mid-evaluation → `React.forwardRef` was `undefined` when consumer libraries executed.

2. **CJS→ESM interop across chunk boundaries** — even with React moved back into `vendor`, splitting `react-grid-layout` into its own `grid` chunk broke a different code path. Rollup's CJS interop wrapper writes to a namespace object during module init (`exports.Children = ...`). When the consumer (grid chunk) called into React (vendor chunk) before that object was fully constructed, the write hit `undefined`.

Why dev never showed it: `npm run dev` doesn't chunk — every module is served as its own file with strict ESM ordering, no cross-chunk cycles possible.

### Fix
Reverted `manualChunks` to a single `vendor` chunk for everything in `node_modules`. Lazy chunks (`React.lazy` on `NCReactGridLayout` / `NCReactGridLayoutMobile`) still emit their own bundles, so code-splitting still works — just not manual node_modules splitting.

Final bundle: `vendor-*.js` ~450 kB (147 kB gzipped) + lazy chunks (~8 kB each).

### Lesson
Manual `manualChunks` splitting of React consumers is fragile. Any React-consuming library placed in a chunk separate from React itself risks a cross-chunk interop failure. If future splitting is attempted, all React-consuming libraries must live in the same chunk as React, or the split needs to keep entire React-consumer subgraphs together. Always verify with `npm run preview` before deploying — `npm run dev` will not surface these bugs.

### Files touched
- `vite.config.js` — reverted to single vendor chunk

---

## 2026-09-30 — MusicWidget "Failed to connect to the music service"

### Symptom
Widget shows the error banner instead of a track or the last-played fallback. Console: `Error fetching currently playing track:`. Probe of `VITE_AEP` (the AWS API Gateway URL) returns HTTP 200 with an **empty body** — the Lambda is invoked but returns nothing usable.

### Root cause (most likely)
Spotify refresh token invalidated. Spotify tokens don't officially "expire" on a clock, but in practice they get revoked after:
- ~180 days of inactivity
- Password change
- Manual revoke in Spotify account settings
- App credential rotation in the Spotify Developer dashboard

When the Lambda tries to refresh, Spotify returns `400 invalid_grant`; if the Lambda doesn't handle that path it silently exits and API Gateway returns an empty 200.

### Fix
Re-authorize the account and store the new refresh token in **both** places:

1. Run the auth helper from repo root:
   ```
   npm run spotify:refresh
   ```
   Opens a local server on `http://127.0.0.1:8888/callback`, prints an authorization URL, catches the callback, prints the new refresh token.

2. Update the token in:
   - `Tayoos-Website/.env` → `VITE_SPOTIFY_REFRESH_TOKEN=<new>` (local dev only; not what the deployed widget actually uses)
   - **AWS SSM Parameter Store**, region `eu-west-2`, parameter name `/Spotify/SPOTIFY_REFRESH_TOKEN` (SecureString). This is what the currently-playing Lambda reads. Console: https://eu-west-2.console.aws.amazon.com/systems-manager/parameters — or CLI:
     ```
     aws ssm put-parameter --name "/Spotify/SPOTIFY_REFRESH_TOKEN" \
       --value "<new>" --type SecureString --overwrite --region eu-west-2
     ```
   - Related SSM params (usually don't need touching): `/Spotify/SPOTIFY_CLIENT_ID`, `/Spotify/SPOTIFY_CLIENT_SECRET`

3. Redeploy the Lambda if it caches the token at cold start only.

### Prereq (one-time)
Add `http://127.0.0.1:3000/callback` to Redirect URIs in the Spotify app on https://developer.spotify.com/dashboard. Spotify's newer auth rules **reject `http://localhost`** at authorization time even when grandfathered in the dashboard list — only the `127.0.0.1` IP literal or `https://` schemes are accepted. Once registered, the script default matches. Override with:
```
$env:SPOTIFY_REDIRECT_URI="http://127.0.0.1:5179/callback"; npm run spotify:refresh
```

### Files touched
- `scripts/spotify-refresh-token.js` — the auth helper (zero deps, Node built-ins only)
- `package.json` — added `spotify:refresh` script

---

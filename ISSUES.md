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

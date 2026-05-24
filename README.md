David Oshidero Personal Website

---

This repository contains the code for my personal resume website, hosted at [www.tayoos.com](http://www.tayoos.com). It has yet to be uploaded.

---

## **_Technology Stack_**

- **Frontend**: JavaScript with React, TailwindCSS for styling.
- **Hosting**: XXX
- **Backend Services**: XXX

---

## **_Key Dependencies_**

- `react`, `react-dom`: Core React libraries.
- `@mui/material`, `@mui/icons-material`: Material-UI for UI components.
- `@emotion/react`, `@emotion/styled`: Emotion for styled components in React.
- `axios`: For HTTP requests.
- `react-router-dom`: For navigation and routing.
- `ReactGridLayout`: For responsive grid layouts.

---

## **_Where to edit content_**

| What you want to change | File |
|-------------------------|------|
| Current job / status card (role, company) | `src/siteConfig.js` → `status` |
| Welcome widget text | `src/siteConfig.js` → `welcome` |
| Site name & URL | `src/siteConfig.js` → `meta` |
| Work experience (roles, summaries, full details) | `src/content/experiences.js` |
| Education & certifications | `src/content/EducationCertification/EducationCertificationModal.jsx` |
| Tech skills | `src/content/TechSkills/TechModal.jsx` |
| Affiliates & memberships | `src/content/Affiliates/AffiliatesModal.jsx` |
| Projects & GitHub link | `src/content/projects.js` |
| Taskbar labels & icons | `src/components/Taskbar/Taskbar.jsx` (and `TaskbarMobile.jsx`) |

**Experience tips:** Use `logoKey` (`capgemini`, `jacobs`, `alten`, `rollsRoyce`) per role. Add optional `detail` with `lead` + `sections` for the “Full details” view — see Capgemini in `experiences.js` for an example.

---

## **_Setup and Deployment_**

This project uses [Vite](https://vitejs.dev/), so local development uses `npm run dev`.

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev` — then open the URL shown in the terminal (usually `http://localhost:5173`).
3. Production build: `npm run build`
4. Preview the production build locally: `npm run preview`
5. Lint: `npm run lint`

**Available npm scripts:** `dev`, `build`, `preview`, `lint`

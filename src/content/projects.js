/**
 * Projects modal — edit `projects` to add rows; `github` is the top link.
 * Each project: title, description, stack (array), optional href.
 */

export const projectsConfig = {
    github: {
        url: 'https://github.com/tayoos',
        label: 'View Profile on GitHub',
        hint: 'Click items to see more details…',
    },

    projects: [
        {
            id: 'tayoos-website',
            title: 'Tayoos Website',
            description:
                'This site — a macOS-inspired personal portfolio and résumé workspace built with React and Vite. The home screen uses a draggable widget grid (status, weather, photos, music, and more), and the dock opens modals for experience, education, tech skills, affiliates, and projects. Includes dark mode, splash intro, and responsive layouts for desktop and mobile.',
            stack: ['React', 'Vite', 'JavaScript'],
            href: 'https://github.com/tayoos/Tayoos-Website',
        },
        {
            id: 'stock-analyzer',
            title: 'Stock Analyzer',
            description:
                'AI-powered portfolio analyser packaged as a Docker container. Syncs holdings from Trading 212 (or Excel), fetches live market data, and uses the Claude API for Buy/Hold/Sell recommendations with price targets, sentiment, catalysts, and risk notes. Includes a Flask web dashboard, scheduled runs, SQLite handoff memory between analyses, and compose templates for Unraid and Proxmox with Watchtower auto-updates.',
            stack: ['Python', 'Flask', 'Docker'],
            href: 'https://github.com/tayoos/Trading-Analysis---AI-Assisted',
        },
        {
            id: 'sysml-visualisation-tool',
            title: 'SysML Visualisation Tool',
            description:
                'Offline SysML model of marine radar ingestion and a parallel Hybrid Navy integration flow, with source traceability to marine radar reference material. Primary deliverable is a local vanilla-JS web app (activity and block-definition diagrams, rationale page) runnable via Python’s built-in server — no CDN or PlantUML install required.',
            stack: ['JavaScript', 'HTML', 'CSS'],
            href: 'https://github.com/tayoos/SysML-Visualisation-Tool-Exclusion',
        },
    ],
};

export default projectsConfig;

# Aznirul Iqmal – Portfolio

Modern interactive portfolio built with React (Vite + TS), Tailwind CSS, Framer Motion and Lottie.

## Features
- Glassmorphism hero with animated radial gradients & micro-interaction CTA
- Lottie micro-interactions (sparkle)
- Scroll-based motion reveals
- Dark / Light theme toggle persisted to system preference
- JSON (Git-based) content for projects (extendable to CMS)
- Plausible analytics script for privacy-friendly tracking
- Accessible semantic HTML and focus states

## Tech Stack
React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lottie, Zustand (planned for global state), React Router.

## Content Editing
Currently project data lives in `src/content/projects.json`. You can replace with a headless CMS later (Sanity, Contentful, Netlify CMS). Keep shape: `{ projects: Project[] }`.

## Development
Install deps then run dev:
```
npm install
npm run dev
```

## Build
```
npm run build
npm run preview
```

## Deploy
Deploy directly to Vercel (import repo) or Netlify (drag `dist` or connect repo). Vite defaults are production-ready.

## Analytics Events
Plausible custom events can be sent via:
```js
window.plausible?.('CTA Click', { props: { location: 'hero' } });
```

## License
MIT

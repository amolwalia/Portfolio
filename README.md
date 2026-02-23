# Amol's Portfolio

A React + Vite portfolio site with animated page transitions, a 3D scene layer, manual SPA routing, and case-study pages.

## Tech Stack

- React 18
- Vite 6
- Motion (`motion/react`) for animations
- Three.js via `@react-three/fiber`, `@react-three/drei`, and postprocessing
- Radix UI primitives (component set in `src/components/ui`)

## Project Structure

- `src/App.jsx`: App shell, route parsing, navigation state, transitions, footer/theme toggle
- `src/components/pages/`: Route-level pages (`HomePage`, `WorkPage`, `ThreeDPage`, `AboutPage`, `ContactPage`, `CaseStudyPage`)
- `src/components/Scene3D.jsx`: Shared 3D scene rendered behind non-3D routes
- `public/`: Static assets (images, icons, 3D files, HDRIs, fonts)
- `vercel.json`: SPA rewrite config for production deploys

## Routes

The app uses browser history APIs (not `react-router`) with route handling in `src/App.jsx`.

- `/`
- `/work`
- `/work/:slug` (case studies from the `CASE_STUDIES` object)
- `/3d`
- `/about`
- `/contact`

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Vite runs on port `3000` (`vite.config.js`) and opens the browser automatically.

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build production bundle into `dist/`
- `npm run preview`: Preview production build locally
- `npm run vercel-build`: Vercel build command (same as `vite build`)

## Deployment

Configured for Vercel:

- Build output: `dist`
- Rewrites all paths to `index.html` so direct route visits work in SPA mode

See `vercel.json` for rewrite details.

## Content Editing Notes

- Update case study data in `src/App.jsx` (`CASE_STUDIES`)
- Update page copy/layout in `src/components/pages/*.jsx`
- Replace or add media in `public/` and reference via absolute paths like `/MM1.png`

# Amol Walia Portfolio

A React and Vite portfolio for Amol Walia, focused on visual design, digital marketing, case studies, photography, print work, and an interactive 3D brand experience.

The site uses a custom single-page app routing setup, animated page transitions, a scroll-responsive navigation logo, project case-study data, image galleries, and Three.js-powered visual elements.

## Overview

This portfolio is designed as both a body-of-work site and a proof of implementation skill. The experience combines:

- A responsive home hero with animated typography
- A scroll-aware navigation area with an embedded 3D AW logo
- Work cards and detailed case-study pages
- Fullscreen media viewing for case-study images
- Print design and photography galleries
- A persistent animated background scene
- Manual browser-history routing without `react-router`
- Vercel-ready SPA deployment configuration

## Tech Stack

- React 18
- Vite 6
- JavaScript and TypeScript components
- Motion via `motion/react`
- Three.js through `@react-three/fiber` and `@react-three/drei`
- Postprocessing support through `@react-three/postprocessing`
- Radix UI primitives in `src/components/ui`
- Custom CSS in `src/index.css`

## Routes

Routing is handled manually in [src/App.jsx](src/App.jsx) with the browser history API.

Available routes:

- `/` - Home
- `/work` - Work overview, case-study cards, print gallery, and photography gallery
- `/work/:slug` - Individual case studies
- `/about` - About page
- `/contact` - Contact page

Current case-study slugs are defined in [src/data/caseStudies.ts](src/data/caseStudies.ts).

## Project Structure

```text
.
├── public/                  Static assets served from the site root
├── src/
│   ├── App.jsx              App shell, route parsing, transitions, footer
│   ├── data/
│   │   └── caseStudies.ts   Case-study content and media references
│   ├── components/
│   │   ├── Navigation.jsx   Scroll-responsive navigation and 3D logo wrapper
│   │   ├── scene.jsx        React Three Fiber canvas for the nav logo
│   │   ├── Model.jsx        3D model loading/rendering
│   │   ├── Scene3D.jsx      Global animated visual background
│   │   ├── CaseStudyPage.tsx
│   │   └── pages/           Route-level pages
│   ├── hooks/
│   │   └── useViewportSize.js
│   ├── styles/
│   └── index.css            Main styling file
├── PUNCHUP.md               Concept brief for the 3D logo hero
├── vercel.json              SPA rewrite and output directory config
└── vite.config.js           Vite config and dev-server settings
```

## Key Files

### [src/App.jsx](src/App.jsx)

Owns the application shell:

- Normalizes browser paths
- Maps paths to pages
- Handles client-side navigation
- Runs animated page transitions
- Applies top spacing for fixed navigation
- Renders the shared background and footer

### [src/components/Navigation.jsx](src/components/Navigation.jsx)

Controls the fixed navigation:

- Home/work/about/contact links
- Active route styling
- Scroll-based logo resizing
- Responsive desktop and phone layouts
- 3D logo container sizing

The navigation wrapper controls the logo dimensions. The canvas inside fills that wrapper at `100%` width and height.

### [src/components/scene.jsx](src/components/scene.jsx)

Contains the React Three Fiber canvas used inside the navigation.

It sets:

- Camera configuration
- Transparent canvas rendering
- Logo lighting
- HDR environment reflections
- The loaded AW model

### [src/components/Scene3D.jsx](src/components/Scene3D.jsx)

Renders the global background layers:

- Animated gradient
- Glow layer
- Noise layer

This is separate from the interactive 3D logo in the navigation.

### [src/data/caseStudies.ts](src/data/caseStudies.ts)

Stores all case-study content:

- Slugs
- Titles
- Card descriptions
- Metadata
- Hero media
- Rich text sections
- Process sections
- Design sections
- Media galleries

Case-study media uses public-root paths such as `/SCAFF1.png`, `/DTR1.png`, and `/MM1.png`.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The Vite dev server runs on:

```text
http://localhost:3000
```

The browser opens automatically because `vite.config.js` sets `server.open` to `true`.

## Scripts

```bash
npm run dev
```

Starts the local Vite development server.

```bash
npm run build
```

Builds the production bundle into `dist/`.

```bash
npm run preview
```

Serves the production build locally for testing.

```bash
npm run vercel-build
```

Runs the same production build command used for Vercel.

## Editing Content

### Update Home Copy

Edit [src/components/pages/HomePage.jsx](src/components/pages/HomePage.jsx).

This controls:

- Intro line
- Main hero headline
- Supporting copy
- Resume and contact calls to action
- Home hero spacing behavior

### Update Navigation

Edit [src/components/Navigation.jsx](src/components/Navigation.jsx).

Navigation links are defined in the `NAV_ITEMS` array. Scroll and logo sizing behavior is handled in the helper functions near the top of the file.

### Update Case Studies

Edit [src/data/caseStudies.ts](src/data/caseStudies.ts).

Each case study includes:

- `slug` for the URL
- `title` and `cardTitle`
- `cardDescription`
- `meta`
- `heroMedia`
- `sections`

To add a new case study:

1. Add a new object to the `caseStudies` array.
2. Give it a unique `slug`.
3. Add hero and media assets to `public/`.
4. Reference assets with root-relative paths like `/example.png`.
5. Confirm the new route works at `/work/new-slug`.

### Update Work Galleries

Edit [src/components/pages/Work.tsx](src/components/pages/Work.tsx).

This file contains the print design and photography gallery image arrays.

### Update Assets

Add static assets to `public/`.

Examples:

- Case-study images: `public/SCAFF1.png`, `public/DTR1.png`, `public/MM1.png`
- Photography: `public/photography/`
- Print mockups: `public/mockup-designs/`
- 3D assets: `public/AW-glass.glb`, `public/AW-glass.fbx`
- HDR environment: `public/qwantani_dawn_puresky_2k.hdr`

Reference public assets from components with paths starting at `/`.

Example:

```tsx
src: "/SCAFF1.png"
```

## Styling Notes

Most site styling lives in [src/index.css](src/index.css).

Important style areas:

- App theme variables and base styles
- Navigation grid and canvas sizing
- Background scene layers
- Work cards and media galleries
- Case-study layout
- Case-study lightbox
- Responsive breakpoints

The project also uses utility classes in JSX for local layout and typography adjustments.

## 3D Logo Notes

The 3D logo is split across several files:

- [src/components/Navigation.jsx](src/components/Navigation.jsx) controls responsive wrapper size.
- [src/components/scene.jsx](src/components/scene.jsx) owns the Three canvas.
- [src/components/Model.jsx](src/components/Model.jsx) loads and renders the AW model.
- `public/AW-glass.glb` and related assets provide the model source.

Important sizing rule:

The wrapper changes size. The canvas fills the wrapper. The model renders inside the canvas.

This prevents layout instability while the nav collapses on scroll.

## Deployment

The project is configured for Vercel.

[vercel.json](vercel.json) sets:

- Output directory: `dist`
- SPA rewrites: all routes are served through `index.html`

This allows direct visits to routes like `/work/scaffold` without returning a 404.

## Build Notes

The production build currently completes successfully.

Vite may show a large chunk warning because the project includes Three.js, React Three Fiber, Drei, postprocessing, and a broad UI dependency set. This is a bundle-size warning, not a build failure.

Future optimization options:

- Lazy-load case-study pages
- Lazy-load the work gallery lightbox
- Split Three.js-related code into a separate chunk
- Remove unused UI primitives if they are not needed

## Related Documentation

- [PUNCHUP.md](PUNCHUP.md) - 3D logo hero concept, interaction goals, risks, and success criteria


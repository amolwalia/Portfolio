# PUNCHUP.md

# Prism Glass 3D Exploration ✨🧊

> A living project note for the 3D work currently in this portfolio.

---

## What this project is (currently true) ✅

This portfolio includes an interactive real-time 3D section built with Three.js via React Three Fiber.

- A prism-glass style logo model appears on the `/3d` page
- The model uses physically based glass-like materials
- HDR-style environment lighting/reflections are applied
- Users can click/drag to rotate and scroll to zoom
- Post-processing adds bloom + chromatic aberration polish
- A separate visual backdrop (`Scene3D`) is shown behind non-3D pages

---

## Where it lives in the site 🗺️

- Dedicated 3D experience route: `/3d`
- Not currently embedded as an interactive homepage hero canvas
- Homepage still has branded typography + CTA content

---

## What is implemented in code 🛠️

### Glass logo scene

- `MeshPhysicalMaterial` settings for glass realism:
  - transmission
  - ior
  - roughness
  - thickness
- Layered RGB-tinted passes for prism-like color separation
- EXR environment map processing for reflections
- ACES tone mapping + sRGB output setup

### Interaction model

- Drag rotation and zoom using `OrbitControls`
- Damped camera controls for smooth movement
- Full 360 style object inspection

### Render quality choices

- `dpr={[1, 2]}` to keep rendering practical on different displays
- Responsive canvas containers with large viewport-driven layout blocks
- Post effects: `Bloom` + `ChromaticAberration`

---

## Libraries currently used 📚

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`
- `FBXLoader` (logo mesh)
- `GLTFLoader` (secondary can model)
- `EXRLoader` (environment)
- `OrbitControls`

---

## Creative Direction 🎨

Design intent:

- Crystal / prism energy, not plastic gloss
- Controlled motion that feels premium
- Strong contrast between dark stage and glowing highlights
- Technical depth without visual clutter

Keywords:
`glass` `precision` `iridescence` `editorial` `interactive`

---

## Reality Check: What is *not* implemented yet 🚧

- Cursor-reactive light position
- Gyroscope-based mobile parallax
- Explicit low-power fallback mode switch
- Homepage-embedded interactive 3D hero

These are potential next upgrades, not current behavior.

---

## Why this strengthens the portfolio 💼

- Shows real-time 3D/WebGL capability in production UI context
- Demonstrates taste + engineering balance (visual quality vs performance)
- Turns static branding into an interactive technical artifact
- Adds depth beyond standard 2D portfolio layouts

---

## Mini Experience Map 🎮

`Enter /3d` -> `See refractive form` -> `Drag to inspect` -> `Zoom for detail` -> `Experience material realism`

# ✨ Interactive Prism-Glass 3D Logo Hero (Three.js)

---

## Description

I will create a real-time interactive 3D hero section where my “AW” logo exists as a solid prism-glass object instead of a flat image.

The logo behaves like physical glass: it bends light, distorts text behind it, and catches sharp highlights along its edges.  
The goal is to make the identity itself feel like a physical object living inside the page rather than decoration on it.

This will be rendered live using Three.js — not a video, not a GIF, not a fake shader trick.

🧊 The page doesn’t show a logo.  
It _hosts_ it.

---

## What is the work you’re taking on?

### Build a reusable portfolio hero component

A full-width landing section containing:

- A prism-glass 3D logo
- Large typography positioned behind the object
- Cursor-driven motion
- Subtle idle animation
- Responsive performance controls

---

### Core visual features

#### Glass material

- Physically-based transmission
- Strong rim highlights ✨
- Slight tint and depth
- Subtle chromatic edge splitting 🌈
- Internal reflections

#### Refraction interaction

- Background title text sits behind the logo
- Text warps and bends through the object
- Different distortion depending on camera angle

#### Lighting setup

- Dark studio environment 🌑
- Soft key light
- Edge/rim light accents
- HDR reflections for realism

---

### Motion behavior

- Cursor move → gentle tilt
- Idle → slow floating rotation 🫧
- Hover → highlight intensity increases slightly
- Reduced-motion preference → motion disabled
- Low-power device → simplified rendering ⚙️

---

## How does this enhance my body of work?

Instead of showing a project, the landing section becomes the project.

It demonstrates:

- Real-time rendering
- Material realism
- Interaction restraint
- Integration of design + development

The logo becomes proof of capability rather than branding decoration.

🧠 Viewer takeaway within 2 seconds:

> This person understands both visuals and implementation.

This will be an interaction embedded into my portfolio, not a standalone page.

---

## Lo-fi Mockups

### Layout

![Lo-fi layout prototype](./public/AW1.gif)

---

### Interaction

Move mouse → tilt
Stop moving → slow float
Hover → light intensifies
Scroll → depth shift (optional)

---

### Mobile

Touch drag → rotate
Low performance → simplified material

---

## Examples to help explain the concept

Concept inspiration:

- Product-style hero sections
- Real-time WebGL landing pages
- Typography interacting with objects

Creative intention:
The object should feel like it exists _between the viewer and the page_.  
Not on the page. Not behind it.  
Floating in UI space.

🪟 A window, not an image.

---

## Resources I plan on using

### Libraries

- Three.js
- GLTFLoader
- RGBELoader
- OrbitControls (restricted movement)

### Assets

- Logo modeled in Blender → exported as glTF
- HDR environment maps
- Tone mapping & exposure control

### Techniques

- MeshPhysicalMaterial transmission
- Environment reflections
- Refraction distortion
- Responsive renderer scaling
- requestAnimationFrame loop

---

## Fears, uncertainties, doubts

### Performance

Glass rendering is resource expensive 🐢  
Mobile devices may struggle

Possible solutions:

- Pixel ratio clamp
- Conditional effects
- Fallback material

---

### Realism tuning

Small parameter changes dramatically affect appearance:

- IOR
- thickness
- roughness
- environment intensity

Expect iteration cycles 🔁

---

### Interaction balance

Too much motion = distracting  
Too little motion = lifeless

Goal: noticeable but calm

---

### Geometry preparation

Incorrect normals or topology will break highlights  
Model cleanup may be required

---

## Success criteria

✔ Glass feels physical  
✔ Text visibly refracts through object  
✔ Motion is subtle and smooth  
✔ Runs across devices  
✔ Works as reusable component

---

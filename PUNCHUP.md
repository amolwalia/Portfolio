# Interactive Prism-Glass 3D Logo Hero

## Concept

Build a real-time interactive hero experience where the AW logo behaves like a physical glass object inside the page.

Instead of treating the logo as a flat image or decorative mark, the hero should make the identity feel dimensional, responsive, and material. The logo should catch light, show depth, and subtly react to the user without overwhelming the portfolio content.

The goal is simple: the first impression should communicate both visual design taste and technical implementation ability.

## Core Idea

The portfolio does not just display a logo. It hosts the logo as an object.

The AW mark should feel like it exists between the viewer and the interface:

- In front of the page, not pasted onto it
- Physical enough to feel crafted
- Calm enough to keep the portfolio usable
- Interactive enough to show technical skill

## Scope

Create a reusable hero/navigation scene component that includes:

- A live 3D AW logo
- Transparent prism-glass material
- Responsive sizing for desktop and mobile
- Scroll-aware scaling
- Cursor or pointer-based interaction
- Subtle idle motion
- Performance-conscious rendering settings
- Accessible fallbacks for reduced-motion users

## Visual Direction

The scene should feel like a dark studio product shot translated into an interface.

### Material

The logo should use a glass-like material with:

- Physical transmission
- Subtle tint
- Sharp rim highlights
- Realistic reflections
- Controlled roughness
- Enough thickness to feel solid

The material should avoid looking like chrome, plastic, or a simple transparent PNG.

### Lighting

Use restrained lighting so the logo has definition without becoming noisy:

- Soft ambient light for base visibility
- Directional or point lights for edge highlights
- HDR environment reflections for depth
- Dark background contrast to emphasize the glass

### Composition

The 3D logo should remain the visual anchor of the hero, but it should not block the user's path through the page.

On the home page, it can feel large and immersive. As the user scrolls, it should collapse into the navigation area and continue functioning as a compact brand mark.

## Interaction Behavior

Interaction should feel intentional and restrained.

### Desktop

- Pointer movement creates a gentle tilt or parallax response
- Idle state uses slow, subtle motion
- Hover can slightly increase highlight intensity or rotation response
- Scroll controls the transition from hero-scale logo to nav-scale logo

### Mobile

- Touch movement can create a small rotation response
- The logo should remain stable and readable
- Effects should be simplified if performance drops

### Reduced Motion

If the user prefers reduced motion:

- Disable idle animation
- Disable pointer-driven movement
- Keep the logo visible as a static 3D object or fallback image

## Technical Approach

Recommended stack:

- Three.js
- React Three Fiber
- Drei helpers for environment lighting and asset loading
- GLB or GLTF logo exported from Blender

Useful techniques:

- `MeshPhysicalMaterial` for glass-like behavior
- HDR environment maps for reflections
- Pixel ratio clamping for performance
- Responsive canvas wrapper sizing
- Conditional animation based on device capability and motion preferences

## Implementation Notes

The canvas should not own the responsive layout. A parent container should define the size, and the canvas should fill that box with `width: 100%` and `height: 100%`.

This keeps the rendering stable while the layout changes. It also makes scroll-based resizing easier to reason about:

- Wrapper changes dimensions
- Canvas fills wrapper
- 3D scene remains contained

The navigation should use grid or flexbox for layout instead of relying on absolute positioning. This keeps the logo and links responsive as the nav collapses.

## Why This Strengthens The Portfolio

This hero becomes more than a visual intro. It demonstrates:

- Visual taste
- Brand system thinking
- Real-time rendering
- Responsive interaction design
- Frontend implementation skill
- Ability to balance polish with usability

The interaction should help a viewer understand the portfolio's positioning within the first few seconds:

> Amol can design strong visuals and build them into functioning digital experiences.

## Risks

### Performance

Glass rendering can be expensive, especially on mobile.

Mitigation:

- Clamp device pixel ratio
- Reduce effects on small screens
- Use simpler materials when needed
- Avoid unnecessary post-processing

### Visual Tuning

Small material changes can drastically affect the final look.

Parameters that will require iteration:

- IOR
- Transmission
- Thickness
- Roughness
- Environment intensity
- Light placement

### Interaction Balance

The logo should not feel like a toy or distract from the portfolio content.

The goal is calm responsiveness, not constant motion.

### Model Quality

Glass materials expose geometry problems quickly.

The model may need cleanup for:

- Normals
- Beveled edges
- Topology
- Scale
- Origin placement

## Success Criteria

The final experience is successful if:

- The logo feels like a physical glass object
- The scene remains smooth on desktop and usable on mobile
- The animation is noticeable but restrained
- The nav collapse feels intentional and responsive
- The canvas fills its wrapper correctly at every size
- The experience supports the portfolio instead of distracting from it
- The component can be reused or adjusted without rewriting the whole scene

## Reference Asset

layout and interaction reference:

![layout prototype](./public/AW1.gif)

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model";

// Camera settings for the small 3D logo inside the navigation. The camera is
// close enough to make the model feel prominent, but far enough to avoid
// clipping as the wrapper shrinks during the scroll animation.
const CAMERA_CONFIG = {
  position: [0, 0, 3.2],
  fov: 35,
};

// Transparent rendering lets the 3D logo sit cleanly on top of the navigation
// and animated page background.
const CANVAS_GL_CONFIG = {
  alpha: true,
  antialias: true,
};

// The canvas must always fill the responsive wrapper controlled by Navigation.
// Navigation owns the dimensions; this component only fills the available box.
const CANVAS_STYLE = {
  background: "transparent",
  width: "100%",
  height: "100%",
  pointerEvents: "auto",
  touchAction: "none",
};

export default function Scene() {
  return (
    <Canvas
      className="nav-scene-canvas"
      camera={CAMERA_CONFIG}
      gl={CANVAS_GL_CONFIG}
      style={CANVAS_STYLE}
    >
      {/* Soft base light so the model is visible before stronger highlights are added. */}
      <ambientLight intensity={0.1} />

      {/* Main highlight that gives the glass logo a bright reflective edge. */}
      <pointLight intensity={1.4} position={[2, 2, 2]} />

      {/* The actual portfolio mark. Model.jsx owns loading and model-level animation. */}
      <Model />

      {/* Directional fill helps the front face keep definition as the model rotates. */}
      <directionalLight intensity={2} position={[0, 2, 3]} />

      {/* HDR lighting gives the transparent material believable reflections and refractions. */}
      <Environment files="/qwantani_dawn_puresky_2k.hdr" />
    </Canvas>
  );
}

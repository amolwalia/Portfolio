import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model";

const CAMERA_CONFIG = {
  position: [0, 0, 3.2],
  fov: 35,
};

const CANVAS_GL_CONFIG = {
  alpha: true,
  antialias: true,
};

const CANVAS_STYLE = {
  background: "transparent",
  pointerEvents: "auto",
  touchAction: "none",
};

export default function Scene() {
  return (
    <Canvas camera={CAMERA_CONFIG} gl={CANVAS_GL_CONFIG} style={CANVAS_STYLE}>
      {/* Keep the lighting minimal so the glass material and environment reflections do the work. */}
      <ambientLight intensity={0.1} />
      <pointLight intensity={1.4} position={[2, 2, 2]} />
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />

      {/* HDR lighting gives the transparent material believable reflections and refractions. */}
      <Environment files="/qwantani_dawn_puresky_2k.hdr" />
    </Canvas>
  );
}

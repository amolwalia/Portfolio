import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model";

export default function Index() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{
        background: "transparent",
        pointerEvents: "auto",
        touchAction: "none",
      }}
    >
      <ambientLight intensity={0.8} />
      <pointLight intensity={1.4} position={[2, 2, 2]} />
      <Model />
      <directionalLight intensity={1.8} position={[0, 2, 3]} />
      <Environment files="/qwantani_dawn_puresky_4k.exr" />
    </Canvas>
  );
}

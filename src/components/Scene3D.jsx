import SceneCanvas from "./scene";

function Scene3D() {
  return (
    <div className="scene-backdrop">
      <div className="scene-gradient" />
      <div className="scene-glow" />
      <div className="scene-noise" />
      <div className="scene-canvas">
        <SceneCanvas />
      </div>
      <div className="scene-hint">
        <img src="/3dhint.png" alt="Drag to interact with the 3D model" />
      </div>
    </div>
  );
}

export { Scene3D };

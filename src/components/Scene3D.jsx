// Scene3D is the global visual backdrop for the site. It does not contain the
// interactive 3D logo; that lives in scene.jsx inside the navigation.
function Scene3D() {
  return (
    <div className="scene-backdrop">
      {/* Large animated color field behind every page. */}
      <div className="scene-gradient" />

      {/* Subtle glow layer that adds depth without interfering with content. */}
      <div className="scene-glow" />

      {/* Texture layer to keep the dark background from feeling flat. */}
      <div className="scene-noise" />
    </div>
  );
}

export { Scene3D };

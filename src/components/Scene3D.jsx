import { jsx, jsxs } from "react/jsx-runtime";
function Scene3D() {
  return /* @__PURE__ */ jsxs("div", {
    className: "scene-backdrop",
    children: [
      /* @__PURE__ */ jsx("div", { className: "scene-gradient" }),
      /* @__PURE__ */ jsx("div", { className: "scene-glow" }),
      /* @__PURE__ */ jsx("div", { className: "scene-noise" })
    ]
  });
}
export {
  Scene3D
};

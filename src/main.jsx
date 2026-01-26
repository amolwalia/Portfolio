import { jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes@0.4.6";
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(ThemeProvider, { attribute: "class", defaultTheme: "dark", enableSystem: true, children: /* @__PURE__ */ jsx(App, {}) })
);

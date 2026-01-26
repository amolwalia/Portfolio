import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes@0.4.6";
import { Scene3D } from "./components/Scene3D";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/pages/HomePage";
import { WorkPage } from "./components/pages/WorkPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ThreeDPage } from "./components/pages/ThreeDPage";
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: "theme-toggle",
      "aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
      onClick: () => setTheme(isDark ? "light" : "dark"),
      children: [
        /* @__PURE__ */ jsx("span", { className: `theme-toggle-icon ${isDark ? "is-active" : ""}`, children: /* @__PURE__ */ jsx(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.6",
            children: /* @__PURE__ */ jsx("path", { d: "M21 12.8A8.5 8.5 0 1 1 11.2 3a6.2 6.2 0 0 0 9.8 9.8Z" })
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: `theme-toggle-icon ${!isDark ? "is-active" : ""}`, children: /* @__PURE__ */ jsxs(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.6",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4.5" }),
              /* @__PURE__ */ jsx("path", { d: "M12 3v2.2M12 18.8V21M4.4 4.4l1.6 1.6M18 18l1.6 1.6M3 12h2.2M18.8 12H21M4.4 19.6 6 18M18 6l1.6-1.6" })
            ]
          }
        ) })
      ]
    }
  );
}
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return /* @__PURE__ */ jsx(HomePage, {});
      case "work":
        return /* @__PURE__ */ jsx(WorkPage, {});
      case "3d":
        return /* @__PURE__ */ jsx(ThreeDPage, {});
      case "about":
        return /* @__PURE__ */ jsx(AboutPage, {});
      case "contact":
        return /* @__PURE__ */ jsx(ContactPage, {});
      default:
        return /* @__PURE__ */ jsx(HomePage, {});
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-hidden", style: { fontFamily: "Montserrat, sans-serif", backgroundColor: "var(--app-bg)", color: "var(--app-text)" }, children: [
    currentPage !== "3d" && /* @__PURE__ */ jsx(Scene3D, {}),
    /* @__PURE__ */ jsx(Navigation, { currentPage, onNavigate: handleNavigate }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 },
        children: renderPage()
      },
      currentPage
    ) }),
    /* @__PURE__ */ jsx("footer", { className: "py-8 px-8 border-t relative", style: { borderColor: "var(--app-border)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm gap-4", children: [
      /* @__PURE__ */ jsx("p", { style: { fontFamily: "Montserrat, sans-serif" }, children: "\xA9 2026 Amol Walia. All rights reserved." }),
      /* @__PURE__ */ jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsx("p", { style: { fontFamily: "Montserrat, sans-serif" }, children: "Designed & Developed with care" })
    ] }) })
  ] });
}
export {
  App as default
};

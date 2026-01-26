import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scene3D } from "./components/Scene3D";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/pages/HomePage";
import { WorkPage } from "./components/pages/WorkPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ThreeDPage } from "./components/pages/ThreeDPage";
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white overflow-x-hidden", style: { fontFamily: "Montserrat, sans-serif" }, children: [
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
    /* @__PURE__ */ jsx("footer", { className: "py-8 px-8 border-t border-neutral-900 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm gap-4", children: [
      /* @__PURE__ */ jsx("p", { style: { fontFamily: "Montserrat, sans-serif" }, children: "\xA9 2026 Amol Walia. All rights reserved." }),
      /* @__PURE__ */ jsx("p", { style: { fontFamily: "Montserrat, sans-serif" }, children: "Designed & Developed with care" })
    ] }) })
  ] });
}
export {
  App as default
};

import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
function HomePage() {
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight || 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const heroSpacer = Math.round(
    Math.max(viewportHeight * 1.15, viewportHeight + 160)
  );
  return /* @__PURE__ */ jsx("section", {
    className: "min-h-screen px-8 relative pb-24",
    style: { paddingTop: `${heroSpacer}px` },
    children: /* @__PURE__ */ jsx("div", {
      className: "max-w-6xl w-full mx-auto",
      children: /* @__PURE__ */ jsxs(motion.div, {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.2 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxs(motion.h1, {
            className:
              "text-6xl md:text-8xl tracking-wider leading-none uppercase",
            style: {
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
            },
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.3 },
            children: [
              "Visual Designer",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { children: "& Digital Marketer" }),
            ],
          }),
          /* @__PURE__ */ jsx(motion.p, {
            className: "text-xl max-w-2xl",
            style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.4 },
            children:
              "Minimal, premium design and marketing for brands that value clarity, restraint, and sharp execution.",
          }),
          /* @__PURE__ */ jsxs(motion.div, {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.5 },
            className: "flex gap-4 pt-8",
            children: [
              /* @__PURE__ */ jsx(motion.button, {
                className:
                  "px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300",
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                style: {
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                },
                children: "VIEW WORK",
              }),
              /* @__PURE__ */ jsx(motion.button, {
                className:
                  "px-8 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors duration-300",
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                style: {
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                },
                children: "GET IN TOUCH",
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
export { HomePage };

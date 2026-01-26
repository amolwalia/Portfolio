import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
function Navigation({ currentPage, onNavigate }) {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight || 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isHome = currentPage === "home";
  const maxScroll =
    typeof document !== "undefined"
      ? Math.max(0, document.documentElement.scrollHeight - viewportHeight)
      : viewportHeight;
  const collapseDistance = Math.max(
    1,
    Math.min(viewportHeight * 0.9, maxScroll || viewportHeight * 0.9),
  );
  const progress = isHome ? Math.min(scrollY / collapseDistance, 1) : 1;
  const navOpacity = isHome ? 1 - progress * 0.25 : 0.7;
  const logoScale = isHome ? Math.max(0.45, 1 - progress * 0.55) : 0.1;
  const minNavHeight = 72;
  const heroHeight = isHome
    ? Math.max(
        minNavHeight,
        viewportHeight - progress * (viewportHeight - minNavHeight),
      )
    : minNavHeight;
  const paddingY = isHome ? 28 - progress * 14 : 16;
  const isCollapsed = !isHome || progress >= 1;
  const logoHeight = isCollapsed ? 150 : null;
  const navItems = [
    { id: "work", label: "Work" },
    { id: "3d", label: "3D" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return /* @__PURE__ */ jsxs(motion.nav, {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    className:
      "fixed top-0 left-0 right-0 z-50 px-8 flex justify-between items-center backdrop-blur-sm",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
      height: `${heroHeight}px`,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
    },
    children: [
      /* @__PURE__ */ jsx(motion.button, {
        onClick: () => onNavigate("home"),
        className: "cursor-pointer flex items-center justify-start pl-0 pr-6",
        whileHover: { scale: logoScale + 0.05 },
        animate: { scale: logoScale },
        transition: { type: "spring", stiffness: 160, damping: 18 },
        style: {
          transformOrigin: "left center",
          alignSelf: isCollapsed ? "flex-start" : "center",
        },
        children: /* @__PURE__ */ jsx("img", {
          src: "/aw%20glass.png",
          alt: "AW Glass logo",
          className: "w-auto block drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]",
          style: logoHeight ? { height: `${logoHeight}px` } : void 0,
        }),
      }),
      /* @__PURE__ */ jsx("div", {
        className: "flex gap-8",
        children: navItems.map((item) =>
          /* @__PURE__ */ jsx(
            motion.button,
            {
              onClick: () => onNavigate(item.id),
              className: `uppercase transition-colors tracking-wider ${currentPage === item.id ? "text-white" : "text-neutral-400 hover:text-white"}`,
              style: { fontFamily: "Montserrat, sans-serif", fontWeight: 500 },
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              children: item.label,
            },
            item.id,
          ),
        ),
      }),
    ],
  });
}
export { Navigation };

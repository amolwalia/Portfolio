import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
("use client");

import Index from "./scene";

function shouldHandleClientNavigation(event) {
  return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function Navigation({ currentPath, onNavigate }) {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () =>
      setViewportSize({
        width: window.innerWidth || 1440,
        height: window.innerHeight || 800,
      });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHome = currentPath === "/";
  const viewportWidth = viewportSize.width;
  const viewportHeight = viewportSize.height;
  const maxScroll =
    typeof document !== "undefined"
      ? Math.max(0, document.documentElement.scrollHeight - viewportHeight)
      : viewportHeight;
  const collapseDistance = Math.max(
    1,
    Math.min(viewportHeight * 0.9, maxScroll || viewportHeight * 0.9),
  );
  const minNavHeight = 72;
  const expandedLogoHeight = Math.max(
    220,
    Math.min(viewportHeight * 0.62, viewportWidth * 0.34, 560),
  );
  const logoAspectRatio = 1.5;
  const collapsedLogoHeight = Math.max(
    44,
    Math.min(minNavHeight - 8, viewportWidth < 768 ? 52 : 60),
  );
  const targetProgress = useTransform(
    scrollY,
    [0, collapseDistance],
    isHome ? [0, 1] : [1, 1],
    { clamp: true },
  );
  const progress = targetProgress;
  const navOpacity = useTransform(
    progress,
    [0, 1],
    isHome ? [0.1, 0] : [0.25, 0.25],
  );
  const navBackground = useMotionTemplate`rgba(0, 0, 0, ${navOpacity})`;
  const heroHeight = useTransform(
    progress,
    [0, 1],
    isHome ? [viewportHeight, minNavHeight] : [minNavHeight, minNavHeight],
  );
  const paddingY = useTransform(progress, [0, 1], isHome ? [28, 14] : [16, 16]);
  const logoHeight = useTransform(
    progress,
    [0, 1],
    isHome
      ? [expandedLogoHeight, collapsedLogoHeight]
      : [collapsedLogoHeight, collapsedLogoHeight],
  );
  const logoWidth = useTransform(logoHeight, (value) => value * logoAspectRatio);
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Works" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActivePath = (itemPath) =>
    currentPath === itemPath ||
    (itemPath === "/work" && currentPath.startsWith("/work/"));

  const handleLinkClick = (event, path) => {
    if (!shouldHandleClientNavigation(event)) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-0 right-0 z-50 px-8 flex justify-between items-center backdrop-blur-sm"
      style={{
        backgroundColor: navBackground,
        height: heroHeight,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      <motion.div
        className="flex items-center justify-start pl-0 pr-6"
        style={{
          height: logoHeight,
          width: logoWidth,
          alignSelf: "center",
          flex: "0 0 auto",
        }}
      >
        <motion.div
          className="drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          style={{
            height: "100%",
            width: "100%",
            pointerEvents: "auto",
          }}
        >
          <Index />
        </motion.div>
      </motion.div>

      <div className="flex gap-8">
        {navItems.map((item) => (
          <motion.a
            key={item.path}
            href={item.path}
            onClick={(event) => handleLinkClick(event, item.path)}
            className={`uppercase transition-colors tracking-wider text-xs md:text-sm lg:text-base ${
              isActivePath(item.path)
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}

export { Navigation };

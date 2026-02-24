import { useEffect, useState } from "react";
import { motion } from "motion/react";
("use client");

import Index from "./scene";

function shouldHandleClientNavigation(event) {
  return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function Navigation({ currentPath, onNavigate }) {
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

  const isHome = currentPath === "/";
  const maxScroll =
    typeof document !== "undefined"
      ? Math.max(0, document.documentElement.scrollHeight - viewportHeight)
      : viewportHeight;
  const collapseDistance = Math.max(
    1,
    Math.min(viewportHeight * 0.9, maxScroll || viewportHeight * 0.9),
  );
  const progress = isHome ? Math.min(scrollY / collapseDistance, 1) : 1;
  const navOpacity = isHome ? 0.1 - progress * 1 : 0.25;
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
  const logoHeight = isCollapsed ? 280 : null;
  const logoOffsetY = isCollapsed ? -40 : 0;
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
        backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
        height: `${heroHeight}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
      }}
    >
      <motion.div
        className="flex items-center justify-start pl-0 pr-6"
        whileHover={{ scale: logoScale + 0.05 }}
        animate={{ scale: logoScale, y: logoOffsetY }}
        transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
        style={{
          transformOrigin: "left center",
          alignSelf: isCollapsed ? "flex-start" : "center",
        }}
      >
        <div
          className="drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          style={{
            height: `${logoHeight ?? 800}px`,
            width: `${(logoHeight ?? 700) * 1.5}px`,
            pointerEvents: "auto",
          }}
        >
          <Index />
        </div>
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

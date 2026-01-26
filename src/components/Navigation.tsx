import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
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
  const progress = isHome ? Math.min(scrollY / 360, 1) : 1;
  const navOpacity = isHome ? 0.35 + progress * 0.45 : 0.7;
  const logoScale = isHome ? 1 - progress * 0.6 : 0.1;
  const minNavHeight = 72;
  const heroHeight = isHome
    ? Math.max(
        minNavHeight,
        viewportHeight - progress * (viewportHeight - minNavHeight),
      )
    : minNavHeight;
  const paddingY = isHome ? 28 - progress * 14 : 16;

  const navItems = [
    { id: "work", label: "Work" },
    { id: "3d", label: "3D" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 flex justify-between items-center backdrop-blur-sm"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
        height: `${heroHeight}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
      }}
    >
      <motion.button
        onClick={() => onNavigate("home")}
        className="cursor-pointer"
        whileHover={{ scale: logoScale + 0.05 }}
        animate={{ scale: logoScale }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <img
          src="/aw%20glass.png"
          alt="AW Glass logo"
          className="h-16 md:h-20 w-auto drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
        />
      </motion.button>
      <div className="flex gap-8">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`uppercase transition-colors tracking-wider ${
              currentPage === item.id
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

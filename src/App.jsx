import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes@0.4.6";
import { Scene3D } from "./components/Scene3D";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { Work } from "./components/pages/Work.tsx";
import { CaseStudy } from "./components/pages/CaseStudy.tsx";
import { caseStudiesBySlug, caseStudies } from "./data/caseStudies.ts";
import { useViewportSize } from "./hooks/useViewportSize.js";

const BASE_ROUTES = {
  home: "/",
  work: "/work",
  about: "/about",
  contact: "/contact",
};

function normalizePath(pathname) {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getPathFromLocation() {
  if (typeof window === "undefined") return BASE_ROUTES.home;
  return normalizePath(window.location.pathname);
}

function getRouteState(pathname) {
  const path = normalizePath(pathname);

  if (path === BASE_ROUTES.home) return { page: "home", studySlug: null };
  if (path === BASE_ROUTES.work) return { page: "work", studySlug: null };
  if (path === BASE_ROUTES.about) return { page: "about", studySlug: null };
  if (path === BASE_ROUTES.contact) return { page: "contact", studySlug: null };

  if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "");
    if (caseStudiesBySlug.has(slug)) {
      return { page: "caseStudy", studySlug: slug };
    }
  }

  return { page: "home", studySlug: null };
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className={`theme-toggle-icon ${isDark ? "is-active" : ""}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.2 6.2 0 0 0 9.8 9.8Z" />
        </svg>
      </span>
      <span className={`theme-toggle-icon ${!isDark ? "is-active" : ""}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 3v2.2M12 18.8V21M4.4 4.4l1.6 1.6M18 18l1.6 1.6M3 12h2.2M18.8 12H21M4.4 19.6 6 18M18 6l1.6-1.6" />
        </svg>
      </span>
    </button>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(getPathFromLocation);
  const viewportSize = useViewportSize();
  const { page, studySlug } = getRouteState(currentPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPathFromLocation());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (path) => {
    const nextPath = normalizePath(path);
    if (typeof window === "undefined") return;
    if (nextPath === currentPath) return;

    window.history.pushState({}, "", nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isPhonePortrait =
    viewportSize.width < 768 && viewportSize.height > viewportSize.width;
  const navContentHeight = isPhonePortrait ? 132 : 72;
  const navTopOffset = 24;
  const pageTopInset = page === "home" ? 0 : navContentHeight + navTopOffset + 16;

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "work":
        return <Work studies={caseStudies} onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "caseStudy":
        return <CaseStudy slug={studySlug} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "Montserrat, sans-serif",
        backgroundColor: "var(--app-bg)",
        color: "var(--app-text)",
      }}
    >
      <Scene3D />
      <Navigation currentPath={currentPath} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ paddingTop: pageTopInset }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <footer
        className="py-8 px-8 border-t relative"
        style={{ borderColor: "var(--app-border)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm gap-4">
          <p style={{ fontFamily: "Montserrat, sans-serif" }}>
            &copy; 2026 Amol Walia. All rights reserved.
          </p>
          <ThemeToggle />
          <p style={{ fontFamily: "Montserrat, sans-serif" }}>
            Designed &amp; Developed with care
          </p>
        </div>
      </footer>
    </div>
  );
}

export { App as default };

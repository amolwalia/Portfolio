import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const pageTopInset =
    page === "home" ? 0 : navContentHeight + navTopOffset + 16;
  const footerPaddingClass = isPhonePortrait ? "py-5 px-4" : "py-8 px-8";
  const footerLayoutClass = isPhonePortrait
    ? "max-w-6xl mx-auto flex flex-col justify-between items-center text-neutral-500 text-[6px] gap-2"
    : "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm gap-4";

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
      className="dark min-h-screen overflow-x-hidden"
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
          style={{
            paddingTop: pageTopInset,
            paddingBottom: isPhonePortrait ? 32 : 48,
          }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <footer
        className={`${footerPaddingClass} border-t relative`}
        style={{ borderColor: "var(--app-border)" }}
      >
        <div className={footerLayoutClass}>
          <p style={{ fontFamily: "Montserrat, sans-serif" }}>
            &copy; 2026 Amol Walia. All rights reserved.
          </p>
          <p style={{ fontFamily: "Montserrat, sans-serif" }}>
            Designed &amp; Developed with care
          </p>
        </div>
      </footer>
    </div>
  );
}

export { App as default };

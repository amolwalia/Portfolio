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
import { CaseStudyPage } from "./components/pages/CaseStudyPage";

const CASE_STUDIES = {
  scaffold: {
    title: "Scaffold",
    role: "Product Designer, UI/UX Strategist, Experience Architect",
    tools: [
      {
        name: "React",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/react",
      },
      {
        name: "Figma",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/figma",
      },
      {
        name: "OpenAI API",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/openai",
      },
    ],
    summary:
      "Scaffold is an AI powered platform concept designed to help apprentices find grants, subsidies, and career opportunities that are usually fragmented across difficult systems. I contributed to product design, UI and UX strategy, and end to end experience architecture, including onboarding, profile setup, opportunity discovery, and progress tracking. Grounded in research on real friction points such as confusing eligibility language and time intensive processes, I translated insights into personas, journey maps, and modular interface systems that prioritized clarity and speed. The final prototype demonstrated a centralized, personalized experience that made complex institutional information more actionable and easier to navigate.",
    learnings:
      "This project reinforced how research driven interface decisions reduce cognitive load in information heavy products, and strengthened my ability to build scalable design systems around real user pain points.",
    images: ["/SCAFF1.png", "/SCAFF2.png"],
  },
  dtrmnd: {
    title: "DTRMND",
    role: "Product Designer, Interface Designer, Experience Architect",
    tools: [
      { name: "Vite", kind: "brand", icon: "https://cdn.simpleicons.org/vite" },
      {
        name: "React",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/react",
      },
      {
        name: "Figma",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/figma",
      },
      {
        name: "Adobe",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/adobe",
      },
      { name: "AI Image Generation", kind: "glyph", icon: "sparkles" },
    ],
    summary:
      "DTRMND is an experimental ecommerce concept centered on an AI powered virtual try-on workflow, built to reduce uncertainty in online clothing purchases. I led the end to end product design and implementation direction, defining feature architecture, storefront structure, and interaction logic across image upload, garment selection, previewing, and purchase flow. The concept rethought the traditional ecommerce funnel by making try-on the primary interaction rather than a hidden secondary tool. Through iterative prototyping, I refined feedback states, preview transitions, and interaction pacing while maintaining a minimal fashion retail visual language that kept attention on product and AI output.",
    learnings:
      "The project strengthened my ability to integrate emerging AI capabilities into familiar product patterns while preserving usability, and reinforced that trust building UX is essential in ecommerce decision making.",
    images: ["/DTR1.png", "/DTR2.png"],
  },
  moneymonsters: {
    title: "MoneyMonsters",
    role: "Lead UI/UX Designer",
    tools: [
      {
        name: "Figma",
        kind: "brand",
        icon: "https://cdn.simpleicons.org/figma",
      },
      { name: "UX Research", kind: "glyph", icon: "search" },
      { name: "Prototyping", kind: "glyph", icon: "pentool" },
    ],
    summary:
      "MoneyMonsters is a financial education app concept designed to help children build money management skills through interactive, gamified tasks tied to chores and allowance tracking. I led the UI and UX process across research synthesis, interface design, and prototyping, while balancing a dual audience experience for both children and parents. Research on child learning behavior and parental expectations informed a product structure focused on immediate feedback, simple navigation, and motivating reward loops. Through iterative wireframing and high fidelity prototyping, I developed a playful but clear visual language that translated educational goals into practical interface mechanics.",
    learnings:
      "This project improved my ability to design for multiple user groups in one system and reinforced the value of empathy driven, iterative design when turning abstract learning outcomes into engaging product experiences.",
    images: ["/MM1.png"],
  },
};

const BASE_ROUTES = {
  home: "/",
  work: "/work",
  threeD: "/3d",
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
  if (path === BASE_ROUTES.threeD) return { page: "threeD", studySlug: null };
  if (path === BASE_ROUTES.about) return { page: "about", studySlug: null };
  if (path === BASE_ROUTES.contact) return { page: "contact", studySlug: null };
  if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "");
    if (CASE_STUDIES[slug]) {
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
  const [showDevBanner, setShowDevBanner] = useState(true);
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

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "work":
        return <WorkPage onNavigate={handleNavigate} />;
      case "threeD":
        return <ThreeDPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "caseStudy":
        return (
          <CaseStudyPage
            study={CASE_STUDIES[studySlug]}
            onNavigate={handleNavigate}
          />
        );
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
      {showDevBanner && (
        <div
          className="fixed top-0 left-0 right-0 h-7 flex items-center justify-center text-[10px] font-semibold tracking-[0.12em] group cursor-pointer"
          onClick={() => setShowDevBanner(false)}
          title="Tap to close"
          style={{
            zIndex: 99999,
            backgroundColor: "rgba(18,18,18,0.92)",
            color: "#ffffff",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Website under development and testing
        </div>
      )}
      {page !== "threeD" && <Scene3D />}
      <Navigation currentPath={currentPath} onNavigate={handleNavigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
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

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
import { CaseStudyPage } from "./components/pages/CaseStudyPage";
const CASE_STUDIES = {
  scaffold: {
    title: "Scaffold",
    role: "Frontend Developer & AI Integration",
    tools: ["React", "Figma", "OpenAI API"],
    summary:
      "Scaffold is an AI-powered funding platform designed to help trades students discover and apply for relevant grants more efficiently. My role focused on building key frontend flows using React, with an emphasis on usability and accessibility. I implemented AI-powered grant matching based on user input and integrated the OpenAI API to allow users to complete application forms using natural language. I also designed dynamic, guided form experiences to reduce friction and improve completion rates. The final product demonstrated how AI-assisted workflows can significantly improve usability and confidence in complex financial processes.",
    learnings:
      "Designing AI-driven UX requires transparency and trust, and guided form experiences greatly improve user engagement and task completion.",
    images: [
      "https://images.unsplash.com/photo-1551281044-8a500a8d8b1e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  dtrmnd: {
    title: "DTRMND",
    role: "Frontend Developer & Brand Designer",
    tools: ["Vite", "React", "Figma", "Adobe", "AI Image Generation"],
    summary:
      "DTRMND is a digital streetwear brand experience focused on strong visual identity and enhanced product visualization. I designed the brand's visual system and UI, then built the full frontend using Vite and React with reusable, modular components. A key feature I implemented was an AI-powered virtual try-on, allowing users to upload a photo and preview how selected items would look when worn. I also explored AI image generation to improve product previews and reduce purchase uncertainty. The project combined branding, UI design, and emerging AI tools to create a more engaging and confident shopping experience.",
    learnings:
      "Visual consistency builds brand trust, and AI in e-commerce must feel realistic and intuitive to be effective.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  moneymonsters: {
    title: "MoneyMonsters",
    role: "UI/UX Designer",
    tools: ["Figma", "UX Research", "Prototyping"],
    summary:
      "MoneyMonsters is a gamified financial literacy app designed to teach children aged 6-16 money management through chores, rewards, and goal tracking. I led the UI/UX design for the project, creating user journeys, wireframes, and high-fidelity interfaces in Figma. I also developed a consistent design system and conducted usability testing to ensure the experience was intuitive for both children and parents. The focus was on translating complex financial concepts into fun, engaging, and age-appropriate interactions that encourage long-term learning.",
    learnings:
      "Designing for children requires extreme clarity and simplicity, and gamification is most effective when it directly supports educational outcomes.",
    images: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
    ]
  }
};
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
        return /* @__PURE__ */ jsx(WorkPage, { onNavigate: handleNavigate });
      case "3d":
        return /* @__PURE__ */ jsx(ThreeDPage, {});
      case "about":
        return /* @__PURE__ */ jsx(AboutPage, {});
      case "contact":
        return /* @__PURE__ */ jsx(ContactPage, {});
      case "scaffold":
        return /* @__PURE__ */ jsx(CaseStudyPage, { study: CASE_STUDIES.scaffold, onNavigate: handleNavigate });
      case "dtrmnd":
        return /* @__PURE__ */ jsx(CaseStudyPage, { study: CASE_STUDIES.dtrmnd, onNavigate: handleNavigate });
      case "moneymonsters":
        return /* @__PURE__ */ jsx(CaseStudyPage, { study: CASE_STUDIES.moneymonsters, onNavigate: handleNavigate });
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

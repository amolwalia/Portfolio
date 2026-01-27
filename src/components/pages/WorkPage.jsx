import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { ProjectCard } from "../ProjectCard";
function WorkPage({ onNavigate }) {
  const projects = [
    {
      id: "scaffold",
      title: "Scaffold",
      category: "Frontend Developer & AI Integration",
      year: "2025",
      image: "https://images.unsplash.com/photo-1665043548008-82dc5e992df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc2ODk0NDQ5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "dtrmnd",
      title: "DTRMND",
      category: "Frontend Developer & Brand Designer",
      year: "2025",
      image: "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGRlc2lnbnxlbnwxfHx8fDE3NjkwMDAzODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "moneymonsters",
      title: "MoneyMonsters",
      category: "UI/UX Designer",
      year: "2024",
      image: "https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg5NjUyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "min-h-screen py-32 px-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className: "mb-16",
        children: [
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: "text-5xl md:text-7xl mb-6 uppercase tracking-wider",
              style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 },
              children: "Selected Projects"
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-xl text-neutral-400 max-w-2xl",
              style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
              children: "A focused selection of visual and marketing work across brand systems, campaigns, and hospitality."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-16", children: projects.map((project, index) => /* @__PURE__ */ jsx(ProjectCard, { ...project, index, onClick: onNavigate ? () => onNavigate(project.id) : void 0 }, project.id)) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
        className: "mt-20 border border-neutral-800 rounded-2xl p-8 md:p-10 bg-black/30",
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "text-3xl uppercase tracking-wider",
                style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
                children: "Photography"
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-neutral-400 mt-3 max-w-2xl",
                style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
                children: "A quiet practice alongside design, focused on light, texture, and form."
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "text-sm uppercase tracking-wider text-neutral-500",
              style: { fontFamily: "Montserrat, sans-serif", fontWeight: 500 },
              children: "Available on request"
            }
          )
        ] })
      }
    )
  ] }) });
}
export {
  WorkPage
};

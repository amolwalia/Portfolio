import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
export function CaseStudyPage({ study, onNavigate }) {
  return /* @__PURE__ */ jsx("section", {
    className: "min-h-screen px-8 pt-40 pb-24 relative",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-5xl mx-auto space-y-16",
      children: [
        /* @__PURE__ */ jsxs(motion.div, {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onNavigate?.("work"),
                className: "uppercase text-xs tracking-[0.2em] text-neutral-400 hover:text-white transition-colors",
                style: { fontFamily: "Montserrat, sans-serif", fontWeight: 600 },
                children: "Back to work"
              }
            ),
            /* @__PURE__ */ jsx(
              "h1",
              {
                className: "text-5xl md:text-7xl uppercase tracking-wider",
                style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 },
                children: study.title
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-col md:flex-row md:items-center md:gap-10 gap-4 text-sm uppercase tracking-[0.18em] text-neutral-400",
                style: { fontFamily: "Montserrat, sans-serif", fontWeight: 600 },
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: "Role" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-white tracking-wide normal-case", children: study.role })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: "Tools" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-white tracking-wide normal-case", children: study.tools.join(", ") })
                  ] })
                ]
              }
            )
          ]
        }),
        /* @__PURE__ */ jsx(motion.div, {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          viewport: { once: true, amount: 0.35 },
          className: "grid md:grid-cols-3 gap-6",
          children: study.images.map((image, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 aspect-[4/3]",
              children: /* @__PURE__ */ jsx(
                motion.img,
                {
                  src: image,
                  alt: `${study.title} preview ${index + 1}`,
                  className: "w-full h-full object-cover",
                  whileHover: { scale: 1.04 },
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                }
              )
            },
            image
          ))
        }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12 items-start", children: [
          /* @__PURE__ */ jsxs(motion.article, {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            viewport: { once: true, amount: 0.3 },
            className: "space-y-6",
            children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  className: "text-2xl uppercase tracking-wider",
                  style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
                  children: "Case Study"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-lg leading-relaxed text-neutral-200",
                  style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
                  children: study.summary
                }
              )
            ]
          }),
          /* @__PURE__ */ jsxs(motion.aside, {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.05 },
            viewport: { once: true, amount: 0.3 },
            className: "rounded-2xl border border-white/10 bg-black/40 p-7 space-y-4",
            children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "text-sm uppercase tracking-[0.2em] text-neutral-400",
                  style: { fontFamily: "Montserrat, sans-serif", fontWeight: 700 },
                  children: "Key Learnings"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-base leading-relaxed text-white/90",
                  style: { fontFamily: "Montserrat, sans-serif", fontWeight: 400 },
                  children: study.learnings
                }
              )
            ]
          })
        ] })
      ]
    })
  });
}

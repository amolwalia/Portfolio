import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
function ProjectCard({ title, category, year, image, index }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
      viewport: { once: true },
      className: "group cursor-pointer",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[4/3] mb-4 bg-neutral-900", children: [
          /* @__PURE__ */ jsx(
            motion.img,
            {
              src: image,
              alt: title,
              className: "w-full h-full object-cover",
              whileHover: { scale: 1.05 },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100",
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-12 h-12 text-white" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl mb-1 uppercase tracking-wide", style: { fontFamily: "Akira Expanded, sans-serif" }, children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-neutral-500", style: { fontFamily: "Montserrat, sans-serif" }, children: category })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-neutral-500", style: { fontFamily: "Montserrat, sans-serif" }, children: year })
        ] })
      ]
    }
  );
}
export {
  ProjectCard
};

import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Award, Users, Briefcase, Sparkles } from "lucide-react";
function AboutPage() {
  const skills = [
    "Visual Identity",
    "Brand Systems",
    "Marketing Design",
    "Campaigns",
    "Content Design",
    "Typography",
    "Menu Design",
    "Art Direction"
  ];
  const experience = [
    {
      year: "2025",
      role: "Visual Designer & Marketer",
      company: "Scaffold",
      description: "Built a minimal identity and launch assets for a new studio."
    },
    {
      year: "2025",
      role: "Visual Designer",
      company: "DTRMND",
      description: "Developed a precise visual system and brand toolkit."
    },
    {
      year: "2024",
      role: "Marketing Designer",
      company: "Money Monsters",
      description: "Directed campaign visuals and content for growth."
    },
    {
      year: "2023",
      role: "Visual Designer",
      company: "Restaurant Menu Design",
      description: "Created menu systems and in-store layouts for hospitality brands."
    }
  ];
  const stats = [
    { icon: Briefcase, value: "Boutique", label: "Practice" },
    { icon: Users, value: "Collaborative", label: "Partners" },
    { icon: Award, value: "Premium", label: "Positioning" },
    { icon: Sparkles, value: "Detail-led", label: "Execution" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "min-h-screen py-32 px-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className: "mb-20",
        children: [
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: "text-5xl md:text-7xl mb-6 uppercase tracking-wider",
              style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 },
              children: "About Me"
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-xl text-neutral-400 max-w-2xl",
              style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
              children: "Visual designer and marketer based in Vancouver, BC."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.1 },
        className: "grid grid-cols-2 md:grid-cols-4 gap-8 mb-20",
        children: stats.map((stat, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4, delay: 0.1 + index * 0.1 },
            className: "text-center p-6 border border-neutral-800 rounded-lg",
            children: [
              /* @__PURE__ */ jsx(stat.icon, { className: "w-8 h-8 mx-auto mb-4 text-neutral-400" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-3xl mb-2",
                  style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
                  children: stat.value
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-neutral-500 text-sm",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  children: stat.label
                }
              )
            ]
          },
          index
        ))
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-16 mb-20", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "text-3xl mb-6 uppercase tracking-wide",
                style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
                children: "My Story"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "space-y-4 text-neutral-400 leading-relaxed",
                style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
                children: [
                  /* @__PURE__ */ jsx("p", { children: "I'm Amol Walia, a visual designer and marketer focused on minimal, premium brand systems. I build clear visual languages that make products feel composed, confident, and intentional." }),
                  /* @__PURE__ */ jsx("p", { children: "My work balances restraint with impact across identity, campaigns, and digital touchpoints. Every detail is shaped to support positioning, not noise." }),
                  /* @__PURE__ */ jsx("p", { children: "Recent collaborations include Scaffold, DTRMND, Money Monsters, and menu design programs for restaurants." })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "text-3xl mb-6 uppercase tracking-wide",
                style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
                children: "Skills & Expertise"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: skills.map((skill, index) => /* @__PURE__ */ jsx(
              motion.span,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.3, delay: 0.3 + index * 0.05 },
                className: "px-4 py-2 border border-neutral-700 rounded-full text-neutral-300",
                style: { fontFamily: "Montserrat, sans-serif" },
                children: skill
              },
              skill
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.4 },
        children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              className: "text-3xl mb-10 uppercase tracking-wide",
              style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
              children: "Experience"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: experience.map((exp, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -30 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.4 + index * 0.1 },
              className: "border-l-2 border-neutral-800 pl-6 py-2",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "text-sm text-neutral-500 mb-2",
                    style: { fontFamily: "Montserrat, sans-serif", fontWeight: 500 },
                    children: exp.year
                  }
                ),
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: "text-xl mb-1",
                    style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
                    children: exp.role
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "text-neutral-400 mb-2",
                    style: { fontFamily: "Montserrat, sans-serif", fontWeight: 500 },
                    children: exp.company
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "text-neutral-500",
                    style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
                    children: exp.description
                  }
                )
              ]
            },
            index
          )) })
        ]
      }
    )
  ] }) });
}
export {
  AboutPage
};

import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Mail, Instagram, Linkedin, MapPin } from "lucide-react";
function XIcon(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsx("path", { d: "M18.244 2H21l-6.514 7.447L22.14 22h-5.987l-4.69-6.13L6.09 22H3.33l6.966-7.96L1.86 2h6.14l4.24 5.587L18.244 2Zm-1.03 18.24h1.528L7.18 3.66H5.54L17.214 20.24Z" })
    }
  );
}
function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@amolwalia.com",
      href: "mailto:contact@amolwalia.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Vancouver, BC",
      href: "#"
    }
  ];
  const socials = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/amol_walia" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/manjot-walia/" },
    { icon: XIcon, label: "X", href: "https://x.com/badtameezfella" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-8 relative flex items-start md:items-center", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-10 md:gap-16", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 uppercase tracking-wider",
              style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 },
              children: [
                "Let's Collaborate",
                /* @__PURE__ */ jsx("br", {}),
                "On What's Next"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-base sm:text-lg md:text-xl text-neutral-400 mb-8 md:mb-12 leading-relaxed",
              style: { fontFamily: "Montserrat, sans-serif", fontWeight: 300 },
              children: "Available for select visual design and marketing projects. Share your goals, and I'll shape the system around them."
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-5 md:space-y-6 mb-8 md:mb-12", children: contactInfo.map((item, index) => /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: item.href,
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.1 + index * 0.1 },
              className: "flex items-center gap-3 md:gap-4 text-neutral-300 hover:text-white transition-colors group",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-12 md:h-12 border border-neutral-700 rounded-full flex items-center justify-center group-hover:border-white transition-colors", children: /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4 md:w-5 md:h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "text-sm text-neutral-500 mb-1",
                      style: { fontFamily: "Montserrat, sans-serif" },
                      children: item.label
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "text-base md:text-lg break-all sm:break-normal",
                      style: { fontFamily: "Montserrat, sans-serif", fontWeight: 500 },
                      children: item.value
                    }
                  )
                ] })
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "text-sm text-neutral-500 mb-4 uppercase tracking-wider",
                    style: { fontFamily: "Akira Expanded, sans-serif" },
                    children: "Elsewhere"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex gap-3 md:gap-4", children: socials.map((social, index) => /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    href: social.href,
                    className: "w-10 h-10 md:w-12 md:h-12 border border-neutral-700 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all",
                    whileHover: { scale: 1.1 },
                    whileTap: { scale: 0.9 },
                    "aria-label": social.label,
                    children: /* @__PURE__ */ jsx(social.icon, { className: "w-5 h-5" })
                  },
                  index
                )) })
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
        transition: { duration: 0.6, delay: 0.2 },
        className: "border border-neutral-800 rounded-2xl p-5 sm:p-6 md:p-8 bg-black/40 backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              className: "text-xl md:text-2xl mb-5 md:mb-6 uppercase tracking-wide",
              style: { fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 },
              children: "Send a Message"
            }
          ),
          /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block text-sm mb-2 text-neutral-400",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  children: "Name"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  placeholder: "Your name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block text-sm mb-2 text-neutral-400",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  children: "Email"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  className: "w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  placeholder: "your@email.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block text-sm mb-2 text-neutral-400",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  children: "Subject"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  placeholder: "Project inquiry"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block text-sm mb-2 text-neutral-400",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  children: "Message"
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 6,
                  className: "w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors resize-none",
                  style: { fontFamily: "Montserrat, sans-serif" },
                  placeholder: "Tell me about your project..."
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                type: "submit",
                className: "w-full px-8 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors duration-300",
                style: { fontFamily: "Montserrat, sans-serif", fontWeight: 600 },
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                children: "Send Message"
              }
            )
          ] })
        ]
      }
    )
  ] }) }) });
}
export {
  ContactPage
};

import { motion } from "motion/react";
import { PenTool, Search, Sparkles } from "lucide-react";

const TOOL_GLYPHS = {
  sparkles: Sparkles,
  search: Search,
  pentool: PenTool,
};

export function CaseStudyPage({ study, onNavigate }) {
  const heroImage = study.images?.[0];
  const galleryImages = study.images?.slice(1) ?? [];

  return (
    <section className="min-h-screen px-8 pt-36 pb-24 relative">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start"
        >
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => onNavigate?.("/work")}
              className="uppercase text-xs tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
            >
              Back to work
            </button>
            <p
              className="text-xs uppercase tracking-[0.28em] text-neutral-500"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
            >
              Case Study
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl uppercase tracking-wider leading-[0.95]"
              style={{ fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 }}
            >
              {study.title}
            </h1>
          </div>

          <aside className="rounded-2xl border border-white/12 bg-black/35 p-6 md:p-7 space-y-6">
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
              >
                Role
              </p>
              <p
                className="mt-2 text-white leading-relaxed"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
              >
                {study.role}
              </p>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
              >
                Tools
              </p>
              <div className="tool-icons mt-3">
                {study.tools.map((tool) => {
                  if (tool.kind === "glyph") {
                    const Icon = TOOL_GLYPHS[tool.icon];
                    return (
                      <span
                        key={tool.name}
                        className="tool-icon"
                        title={tool.name}
                        aria-label={tool.name}
                        role="img"
                      >
                        {Icon ? (
                          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                        ) : (
                          <span className="sr-only">{tool.name}</span>
                        )}
                      </span>
                    );
                  }

                  return (
                    <span
                      key={tool.name}
                      className="tool-icon"
                      title={tool.name}
                      aria-label={tool.name}
                      role="img"
                    >
                      <img src={tool.icon} alt={`${tool.name} logo`} loading="lazy" />
                    </span>
                  );
                })}
              </div>
            </div>
          </aside>
        </motion.header>

        {heroImage ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 aspect-[16/9]"
          >
            <motion.img
              src={heroImage}
              alt={`${study.title} featured preview`}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        ) : null}

        {galleryImages.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.35 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 aspect-[4/3]"
              >
                <motion.img
                  src={image}
                  alt={`${study.title} preview ${index + 2}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ))}
          </motion.div>
        ) : null}

        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <h2
              className="text-2xl uppercase tracking-wider"
              style={{ fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 }}
            >
              Project Overview
            </h2>
            <p
              className="text-lg leading-relaxed text-neutral-200"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
            >
              {study.summary}
            </p>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-white/10 bg-black/40 p-7 space-y-4 lg:sticky lg:top-28"
          >
            <h3
              className="text-sm uppercase tracking-[0.2em] text-neutral-400"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
            >
              Key Learnings
            </h3>
            <p
              className="text-base leading-relaxed text-white/90"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
            >
              {study.learnings}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

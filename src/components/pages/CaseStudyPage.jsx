import { motion } from "motion/react";
import { useState } from "react";
import { Atom, Bot, Figma, Palette, PenTool, Search, Sparkles, Zap } from "lucide-react";

const TOOL_GLYPHS = {
  react: Atom,
  vite: Zap,
  figma: Figma,
  adobe: Palette,
  openai: Bot,
  ai: Sparkles,
  sparkles: Sparkles,
  search: Search,
  pentool: PenTool,
};

function ToolIcon({ tool }) {
  const [hasError, setHasError] = useState(false);
  const Icon = tool.kind === "glyph" ? TOOL_GLYPHS[tool.icon] : null;
  const fallback = (tool.name || "?").charAt(0).toUpperCase();

  return (
    <span
      title={tool.name}
      aria-label={tool.name}
      className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.03] text-neutral-100"
      style={{ width: 52, height: 52 }}
    >
      {tool.kind === "glyph" ? (
        Icon ? (
          <span
            className="inline-flex items-center justify-center rounded-sm"
            style={{ width: 28, height: 28 }}
          >
            <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
          </span>
        ) : (
          <span className="text-xs font-semibold">{fallback}</span>
        )
      ) : hasError || !tool.icon ? (
        <span className="text-xs font-semibold">{fallback}</span>
      ) : (
        <span
          className="inline-flex items-center justify-center rounded-sm bg-white/95"
          style={{ width: 28, height: 28, padding: 2 }}
        >
          <img
            src={tool.icon}
            alt=""
            className="block object-contain"
            style={{ width: 24, height: 24 }}
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </span>
      )}
    </span>
  );
}

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function CaseStudyPage({ study, onNavigate }) {
  if (!study) return null;

  const images = study.images ?? [];
  const heroImage = images[0];
  const galleryImages = images.slice(1);
  const summaryParts = splitParagraphs(study.summary);
  const intro = summaryParts.slice(0, 2).join(" ");
  const body = summaryParts.slice(2);

  return (
    <section className="min-h-screen px-8 pt-36 pb-24 relative">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-8"
        >
          <button
            type="button"
            onClick={() => onNavigate?.("/work")}
            className="uppercase text-xs tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
          >
            Back to work
          </button>

          <div className="grid lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
            <div className="space-y-6">
              <p
                className="text-xs uppercase tracking-[0.24em] text-neutral-500"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
              >
                Case Study
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-7xl leading-[0.94]"
                style={{ fontFamily: "Akira Expanded, sans-serif", fontWeight: 800 }}
              >
                {study.title}
              </h1>
              {intro ? (
                <p
                  className="text-lg md:text-xl leading-relaxed text-neutral-200 max-w-3xl"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 350 }}
                >
                  {intro}
                </p>
              ) : null}
            </div>

            <aside className="space-y-7 rounded-2xl border border-white/12 bg-black/35 p-6 lg:sticky lg:top-28">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
                >
                  Role
                </p>
                <p
                  className="mt-2 leading-relaxed text-white"
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
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {study.tools.map((tool) => (
                    <ToolIcon key={tool.name} tool={tool} />
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
                >
                  Key Learning
                </p>
                <p
                  className="mt-2 leading-relaxed text-white/90"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
                >
                  {study.learnings}
                </p>
              </div>
            </aside>
          </div>
        </motion.header>

        {heroImage ? (
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.35 }}
            className="space-y-3"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 aspect-[16/9]">
              <img src={heroImage} alt={`${study.title} hero`} className="w-full h-full object-cover" />
            </div>
            <figcaption
              className="text-xs uppercase tracking-[0.18em] text-neutral-500"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
            >
              Featured Case Study Visual
            </figcaption>
          </motion.figure>
        ) : null}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] gap-10 lg:gap-16"
        >
          <article className="space-y-6">
            <h2
              className="text-2xl uppercase tracking-wider"
              style={{ fontFamily: "Akira Expanded, sans-serif", fontWeight: 700 }}
            >
              Overview
            </h2>
            {(body.length > 0 ? body : [study.summary]).map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-relaxed text-neutral-200"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 350 }}
              >
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="rounded-2xl border border-white/10 bg-black/30 p-6">
            <p
              className="text-xs uppercase tracking-[0.2em] text-neutral-500"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
            >
              Outcome
            </p>
            <p
              className="mt-3 text-base leading-relaxed text-white/90"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
            >
              {study.learnings}
            </p>
          </aside>
        </motion.section>

        {galleryImages.length > 0 ? (
          <div className="space-y-8">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={image}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-3"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 aspect-[16/10]">
                  <img src={image} alt={`${study.title} visual ${index + 2}`} className="w-full h-full object-cover" />
                </div>
                <figcaption
                  className="text-xs uppercase tracking-[0.18em] text-neutral-500"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
                >
                  Visual {String(index + 2).padStart(2, "0")}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

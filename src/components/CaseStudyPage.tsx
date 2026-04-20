import { useEffect, useState, type ReactNode } from "react";
import type {
  CaseStudy,
  CaseStudySection,
  DesignsSection,
  MediaItem,
  ProcessSection,
  RichTextSection,
} from "../data/caseStudies.ts";

interface CaseStudyPageProps {
  study: CaseStudy;
  allStudies: CaseStudy[];
  onNavigate: (path: string) => void;
}

const SECTION_ORDER = [
  "overview",
  "background",
  "problem",
  "scope",
  "process",
  "designs",
  "result",
  "post-launch",
  "media",
] as const;

function isPlaceholder(value?: string): boolean {
  if (!value) return true;
  return /^\(add .+\)$/i.test(value.trim());
}

function sectionTitle(section: CaseStudySection): string {
  return section.title || "Section";
}

function renderMedia(
  item: MediaItem,
  onOpenImage?: (item: MediaItem) => void,
): ReactNode {
  if (item.type === "video") {
    return (
      <video
        controls
        preload="metadata"
        className="case-media"
        aria-label={item.alt}
      >
        <source src={item.src} />
      </video>
    );
  }

  if (onOpenImage) {
    return (
      <button
        type="button"
        className="case-media-button"
        onClick={() => onOpenImage(item)}
        aria-label={`Open ${item.alt} enlarged`}
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="case-media"
        />
      </button>
    );
  }

  return (
    <img src={item.src} alt={item.alt} loading="lazy" className="case-media" />
  );
}

function RichTextBlock({ section }: { section: RichTextSection }) {
  const hasRealParagraphs = section.paragraphs.some(
    (paragraph) => !isPlaceholder(paragraph),
  );
  if (!hasRealParagraphs) return null;

  return (
    <section id={section.id} className="case-section">
      <h2 className="case-section-title">{section.title}</h2>
      <div className="case-paragraphs">
        {section.paragraphs.map((paragraph, index) => (
          <p key={`${section.id}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ProcessBlock({ section }: { section: ProcessSection }) {
  if (section.steps.length === 0) return null;

  return (
    <section id={section.id} className="case-section">
      <h2 className="case-section-title">{section.title}</h2>
      <div className="case-process-list">
        {section.steps.map((step, index) => (
          <article className="case-process-item" key={`${section.id}-${index}`}>
            <div className="case-process-number">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="case-process-body">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <p className="case-process-takeaway">
                → takeaway: {step.takeaway}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesignsBlock({
  section,
  onOpenImage,
}: {
  section: DesignsSection;
  onOpenImage: (item: MediaItem) => void;
}) {
  if (section.subsections.length === 0) return null;

  return (
    <section id={section.id} className="case-section">
      <h2 className="case-section-title">{section.title}</h2>
      <div className="case-designs-list">
        {section.subsections.map((subsection, index) => (
          <article className="case-design-item" key={`${section.id}-${index}`}>
            <h3>{subsection.title}</h3>
            <div className="case-design-copy-grid">
              <div>
                <p className="case-label">Before</p>
                <p>{subsection.before}</p>
              </div>
              <div>
                <p className="case-label">After</p>
                <p>{subsection.after}</p>
              </div>
            </div>
            {subsection.media.length > 0 ? (
              <div className="case-media-grid">
                {subsection.media.map((item, mediaIndex) => (
                  <figure
                    key={`${section.id}-${index}-${mediaIndex}`}
                    className="case-figure"
                  >
                    {renderMedia(item, onOpenImage)}
                    {item.caption ? (
                      <figcaption>{item.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function MediaBlock({
  section,
  onOpenImage,
}: {
  section: Extract<CaseStudySection, { type: "media" }>;
  onOpenImage: (item: MediaItem) => void;
}) {
  if (section.items.length === 0) return null;

  return (
    <section id={section.id} className="case-section">
      <h2 className="case-section-title">{section.title}</h2>
      <div className="case-media-grid case-media-grid-two">
        {section.items.map((item, index) => (
          <figure key={`${section.id}-${index}`} className="case-figure">
            {renderMedia(item, onOpenImage)}
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyPage({
  study,
  allStudies,
  onNavigate,
}: CaseStudyPageProps) {
  const [activeImage, setActiveImage] = useState<MediaItem | null>(null);
  const currentIndex = allStudies.findIndex((item) => item.slug === study.slug);
  const prevStudy = currentIndex > 0 ? allStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : null;
  const orderedSections = [...study.sections].sort((a, b) => {
    const aIndex = SECTION_ORDER.indexOf(
      a.id as (typeof SECTION_ORDER)[number],
    );
    const bIndex = SECTION_ORDER.indexOf(
      b.id as (typeof SECTION_ORDER)[number],
    );
    const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
    return safeA - safeB;
  });
  const overviewSection = orderedSections.find(
    (section): section is RichTextSection =>
      section.type === "richText" &&
      section.id === "overview" &&
      section.paragraphs.length > 0,
  );
  const summaryParagraph = overviewSection?.paragraphs.find(
    (paragraph) => !isPlaceholder(paragraph),
  );
  const metaItems = [
    { label: "Role", value: study.meta.role },
    { label: "Timeline", value: study.meta.timeline },
    { label: "Team", value: study.meta.team },
    { label: "Tools", value: study.meta.tools },
  ].filter((item) => !isPlaceholder(item.value));

  useEffect(() => {
    if (!activeImage) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <section className="case-study-shell">
      <div className="case-study-frame">
        <header className="case-hero">
          <h1>{study.title}</h1>

          {metaItems.length > 0 ? (
            <div className="case-meta-grid">
              {metaItems.map((item) => (
                <div className="case-meta-item" key={item.label}>
                  <p className="case-label">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {summaryParagraph ? (
            <div className="case-summary-card">
              <p className="case-label">Project Snapshot</p>
              <p>{summaryParagraph}</p>
            </div>
          ) : null}

          <figure className="case-hero-media">
            {renderMedia(study.heroMedia)}
            {study.heroMedia.caption ? (
              <figcaption>{study.heroMedia.caption}</figcaption>
            ) : null}
          </figure>
        </header>

        <div className="case-body-layout">
          <aside className="case-toc-wrap">
            <nav className="case-toc" aria-label="Contents">
              <p className="case-toc-title">Contents</p>
              <ul>
                {orderedSections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{sectionTitle(section)}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="case-content">
            {orderedSections.map((section) => {
              if (section.type === "richText") {
                return <RichTextBlock key={section.id} section={section} />;
              }

              if (section.type === "process") {
                return <ProcessBlock key={section.id} section={section} />;
              }

              if (section.type === "designs") {
                return (
                  <DesignsBlock
                    key={section.id}
                    section={section}
                    onOpenImage={setActiveImage}
                  />
                );
              }

              if (section.type === "media") {
                return (
                  <MediaBlock
                    key={section.id}
                    section={section}
                    onOpenImage={setActiveImage}
                  />
                );
              }

              return (
                <section
                  id={section.id}
                  className="case-section case-callout"
                  key={section.id}
                >
                  {section.title ? (
                    <h2 className="case-section-title">{section.title}</h2>
                  ) : null}
                  <p>{section.body}</p>
                </section>
              );
            })}

            <footer className="case-study-footer-nav">
              <button
                type="button"
                className="case-nav-link"
                onClick={() =>
                  prevStudy && onNavigate(`/work/${prevStudy.slug}`)
                }
                disabled={!prevStudy}
              >
                {prevStudy ? `← ${prevStudy.title}` : "← Start"}
              </button>
              <button
                type="button"
                className="case-nav-link"
                onClick={() => onNavigate("/work")}
              >
                All works
              </button>
              <button
                type="button"
                className="case-nav-link"
                onClick={() =>
                  nextStudy && onNavigate(`/work/${nextStudy.slug}`)
                }
                disabled={!nextStudy}
              >
                {nextStudy ? `${nextStudy.title} →` : "End →"}
              </button>
            </footer>
          </article>
        </div>
      </div>

      {activeImage ? (
        <div
          className="case-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="case-lightbox-close"
            onClick={() => setActiveImage(null)}
            aria-label="Close enlarged image"
          >
            X
          </button>
          <figure
            className="case-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeImage.src} alt={activeImage.alt} />
            {activeImage.caption ? (
              <figcaption>{activeImage.caption}</figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </section>
  );
}

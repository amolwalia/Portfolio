import type { CaseStudy } from "../../data/caseStudies.ts";

interface WorkPageProps {
  studies: CaseStudy[];
  onNavigate: (path: string) => void;
}

export function Work({ studies, onNavigate }: WorkPageProps) {
  return (
    <section className="work-index-shell">
      <div className="work-index-frame">
        <header className="work-index-header">
          <h1>Works</h1>
          <p>
            A selection of case studies focused on product design, interface
            systems, and AI-assisted digital experiences.
          </p>
        </header>

        <div className="work-grid">
          {studies.map((study) => (
            <article className="work-card" key={study.slug}>
              <button
                type="button"
                className="work-card-media"
                onClick={() => onNavigate(`/work/${study.slug}`)}
                aria-label={`Open ${study.title} case study`}
              >
                <img
                  src={study.heroMedia.src}
                  alt={study.heroMedia.alt}
                  loading="lazy"
                />
              </button>
              <div className="work-card-content">
                <p className="work-card-kicker">Case Study</p>
                <h2>{study.title}</h2>
                <p className="work-card-project">Project: {study.subtitle}</p>
                <p>{study.cardDescription}</p>
                <button
                  type="button"
                  className="work-card-link"
                  onClick={() => onNavigate(`/work/${study.slug}`)}
                >
                  Read case study →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CaseStudyPage } from "../CaseStudyPage.tsx";
import { caseStudies, caseStudiesBySlug } from "../../data/caseStudies.ts";

interface CaseStudyProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function CaseStudy({ slug, onNavigate }: CaseStudyProps) {
  const study = caseStudiesBySlug.get(slug);

  if (!study) {
    return (
      <section className="case-study-shell">
        <div className="case-study-frame">
          <div className="case-not-found">
            <h1>Case study not found</h1>
            <button
              type="button"
              className="case-nav-link"
              onClick={() => onNavigate("/work")}
            >
              Back to work
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <CaseStudyPage
      study={study}
      allStudies={caseStudies}
      onNavigate={onNavigate}
    />
  );
}

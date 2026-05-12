import { useEffect, useState } from "react";
import type { CaseStudy } from "../../data/caseStudies.ts";

interface WorkPageProps {
  studies: CaseStudy[];
  onNavigate: (path: string) => void;
}

interface WorkGalleryImage {
  src: string;
  alt: string;
}

interface ActiveGalleryState {
  images: WorkGalleryImage[];
  index: number;
}

const printDesignImages = [
  { src: "/mockup-designs/book.png", alt: "Print design book mockup" },
  { src: "/mockup-designs/can.png", alt: "Print design can label mockup" },
  { src: "/mockup-designs/invite.png", alt: "Print design invitation mockup" },
  {
    src: "/mockup-designs/menu-flyer.png",
    alt: "Print design menu flyer mockup",
  },
];

const photographyImages = [
  {
    src: "/photography/Copy of IMG_5353-Edit.jpg",
    alt: "Photography portrait composition",
  },
  {
    src: "/photography/IMG_0697.jpg",
    alt: "Photography scene capture",
  },
  {
    src: "/photography/IMG_0718.jpg",
    alt: "Photography portrait study",
  },
  {
    src: "/photography/IMG_0790.jpg",
    alt: "Photography outdoor composition",
  },
  {
    src: "/photography/IMG_0914.jpg",
    alt: "Photography portrait close-up",
  },
  {
    src: "/photography/IMG_1067.jpg",
    alt: "Photography fashion portrait",
  },
  {
    src: "/photography/IMG_1248.jpg",
    alt: "Photography editorial portrait",
  },
  {
    src: "/photography/IMG_2307.jpg",
    alt: "Photography natural light portrait",
  },
  {
    src: "/photography/IMG_2729.jpg",
    alt: "Photography detail composition",
  },
  {
    src: "/photography/IMG_2863.jpg",
    alt: "Photography landscape portrait",
  },
  {
    src: "/photography/IMG_3462.png",
    alt: "Photography stylized portrait",
  },
  {
    src: "/photography/IMG_6573.jpg",
    alt: "Photography editorial scene",
  },
  {
    src: "/photography/IMG_8617.jpg",
    alt: "Photography atmospheric portrait",
  },
  {
    src: "/photography/IMG_8729.jpg",
    alt: "Photography fashion composition",
  },
  {
    src: "/photography/J2-Edit.jpg",
    alt: "Photography studio portrait",
  },
  {
    src: "/photography/d574e5_2626b113bd774a1a8a94e81c198d878a~mv2.jpg.jpg",
    alt: "Photography editorial image",
  },
  {
    src: "/photography/d574e5_3f57f90b95a54f33afc51f6f8c3eaad8~mv2.jpg.jpg",
    alt: "Photography portrait image",
  },
  {
    src: "/photography/d574e5_8be887ecccc6477c806f0bf805da9857~mv2.jpg.jpg",
    alt: "Photography mood image",
  },
  {
    src: "/photography/d574e5_b17b76ad690442c39dfd0c35758017ed~mv2.jpg.jpg",
    alt: "Photography editorial portrait image",
  },
  {
    src: "/photography/d574e5_c16d5e0ce7fe42ecae404c57a82f2ff5~mv2.jpg.jpg",
    alt: "Photography styled image",
  },
];

export function Work({ studies, onNavigate }: WorkPageProps) {
  const [activeGallery, setActiveGallery] = useState<ActiveGalleryState | null>(
    null,
  );

  const openGallery = (images: WorkGalleryImage[], index: number) => {
    setActiveGallery({ images, index });
  };

  const closeGallery = () => {
    setActiveGallery(null);
  };

  const stepGallery = (direction: -1 | 1) => {
    setActiveGallery((current) => {
      if (!current) {
        return current;
      }

      const nextIndex =
        (current.index + direction + current.images.length) %
        current.images.length;

      return {
        ...current,
        index: nextIndex,
      };
    });
  };

  useEffect(() => {
    if (!activeGallery) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        stepGallery(-1);
      }

      if (event.key === "ArrowRight") {
        stepGallery(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeGallery]);

  const activeImage = activeGallery
    ? activeGallery.images[activeGallery.index]
    : null;

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

        <section
          className="work-media-section"
          aria-labelledby="print-design-heading"
        >
          <div className="work-section-header">
            <p className="work-section-kicker">Selected Visual Work</p>
            <h2 id="print-design-heading">Print Design</h2>
            <p>A compact selection of print and packaging mockups.</p>
          </div>

          <div className="work-media-grid work-media-grid-print">
            {printDesignImages.map((image, index) => (
              <figure className="work-media-card" key={image.src}>
                <button
                  type="button"
                  className="work-media-button"
                  onClick={() => openGallery(printDesignImages, index)}
                  aria-label={`Open ${image.alt} fullscreen`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </button>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="work-media-section"
          aria-labelledby="photography-heading"
        >
          <div className="work-section-header">
            <p className="work-section-kicker">Selected Visual Work</p>
            <h2 id="photography-heading">Photography</h2>
          </div>

          <div className="work-media-grid work-media-grid-photo">
            {photographyImages.map((image, index) => (
              <figure className="work-media-card" key={image.src}>
                <button
                  type="button"
                  className="work-media-button"
                  onClick={() => openGallery(photographyImages, index)}
                  aria-label={`Open ${image.alt} fullscreen`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </button>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {activeImage ? (
        <div
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded work image"
          onClick={closeGallery}
        >
          <button
            type="button"
            className="work-lightbox-close"
            onClick={closeGallery}
            aria-label="Close fullscreen image"
          >
            Close
          </button>
          <button
            type="button"
            className="work-lightbox-nav work-lightbox-nav-prev"
            onClick={(event) => {
              event.stopPropagation();
              stepGallery(-1);
            }}
            aria-label="View previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="work-lightbox-nav work-lightbox-nav-next"
            onClick={(event) => {
              event.stopPropagation();
              stepGallery(1);
            }}
            aria-label="View next image"
          >
            →
          </button>
          <div
            className="work-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeImage.src} alt={activeImage.alt} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

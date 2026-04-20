export type MediaType = "image" | "video";

export interface MediaItem {
  type: MediaType;
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudyMeta {
  role: string;
  timeline: string;
  team: string;
  tools: string;
}

export interface RichTextSection {
  id: string;
  type: "richText";
  title: string;
  paragraphs: string[];
}

export interface CalloutSection {
  id: string;
  type: "callout";
  title?: string;
  body: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  takeaway: string;
}

export interface ProcessSection {
  id: string;
  type: "process";
  title: string;
  steps: ProcessStep[];
}

export interface DesignSubsection {
  title: string;
  before: string;
  after: string;
  media: MediaItem[];
}

export interface DesignsSection {
  id: string;
  type: "designs";
  title: string;
  subsections: DesignSubsection[];
}

export interface MediaSection {
  id: string;
  type: "media";
  title: string;
  items: MediaItem[];
}

export type CaseStudySection =
  | RichTextSection
  | CalloutSection
  | ProcessSection
  | DesignsSection
  | MediaSection;

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  cardTitle: string;
  cardDescription: string;
  meta: CaseStudyMeta;
  heroMedia: MediaItem;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "scaffold",
    title: "Building a Digital Bridge Between Apprentices and Opportunity",
    subtitle: "Scaffold",
    cardTitle: "Building a Digital Bridge Between Apprentices and Opportunity",
    cardDescription:
      "Platform for trades apprentices that uses AI to assess grant eligibility and assist with applications.",
    meta: {
      role: "Lead developer for AI-driven system architecture and implementation",
      timeline: "September - December 2025",
      team: "(Add team)",
      tools: "(Add tools)",
    },
    heroMedia: {
      type: "image",
      src: "/SCAFF0.png",
      alt: "Scaffold hero",
      caption: "Scaffold hero visual",
    },
    sections: [
      {
        id: "overview",
        type: "richText",
        title: "Overview",
        paragraphs: [
          "Scaffold is a platform designed to help trades apprentices navigate complex grant systems. Instead of forcing users to manually interpret requirements across multiple websites, the application generates a structured profile using AI and then determines which grants the user is eligible for.",
          "The system also explains why the user qualifies or does not qualify and assists with applications by generating ready to use copy paste responses.",
        ],
      },
      {
        id: "background",
        type: "richText",
        title: "Background",
        paragraphs: [
          "The goal of the project was to reduce confusion, time spent researching, and application friction by turning a multi hour administrative process into a guided workflow.",
        ],
      },
      {
        id: "problem",
        type: "richText",
        title: "The Problem",
        paragraphs: [
          "Apprentices were required to manually interpret requirements across fragmented websites, creating confusion and slowing down applications.",
        ],
      },
      {
        id: "scope",
        type: "richText",
        title: "Scope / Ownership",
        paragraphs: [
          "I was the lead developer responsible for architecting and implementing the AI driven functionality. I designed the logic for profile generation, eligibility analysis, and template generation.",
          "My work involved structuring how user data is collected, processed, and translated into meaningful results, as well as ensuring outputs were clear and actionable. I focused on building a reliable pipeline from user input to AI processing to structured results that could directly assist the application process.",
        ],
      },
      {
        id: "process",
        type: "process",
        title: "Process",
        steps: [
          {
            title: "Profile structure design",
            description:
              "The first step was designing the user profile structure so information could be consistently interpreted by the system.",
            takeaway: "Consistent input structure is required for reliable AI analysis.",
          },
          {
            title: "Eligibility and explanation engine",
            description:
              "I implemented processing logic that takes profile data and evaluates it against grant criteria to determine eligibility, then generates explanations for why a grant matches or does not match.",
            takeaway: "Decision outputs must be understandable and directly useful.",
          },
          {
            title: "Application response generation",
            description:
              "I built a template generation feature that produces editable responses users can paste directly into applications, with predictable output formatting.",
            takeaway: "Useful automation depends on quality and consistency of generated results.",
          },
        ],
      },
      {
        id: "designs",
        type: "designs",
        title: "Designs",
        subsections: [
          {
            title: "Information architecture",
            before:
              "Users manually interpreted requirements across multiple websites and disconnected sources.",
            after:
              "A centralized flow generates a structured profile, evaluates grant eligibility, and explains match outcomes in one guided system.",
            media: [],
          },
          {
            title: "Application assistance output",
            before:
              "Even when users found relevant grants, drafting application responses added friction and inconsistency.",
            after:
              "Template generation produces editable copy paste responses so users can move from eligibility to application faster.",
            media: [],
          },
        ],
      },
      {
        id: "result",
        type: "richText",
        title: "Result / Outcome",
        paragraphs: [
          "The final product transformed a research heavy process into a guided experience where users receive personalized eligibility results and application assistance.",
          "(Add metric)",
        ],
      },
      {
        id: "post-launch",
        type: "callout",
        title: "Post-launch / Learnings",
        body: "The project strengthened my ability to design AI supported workflows, structure decision logic, and build systems that convert raw information into practical actions. It reinforced the importance of clarity in automated outputs and taught me how to engineer features where the usefulness of the product depends on the quality and reliability of generated results.",
      },
      {
        id: "media",
        type: "media",
        title: "Media",
        items: [
          {
            type: "image",
            src: "/SCAFF1.png",
            alt: "Scaffold screen",
            caption: "Scaffold product screen",
          },
          {
            type: "image",
            src: "/SCAFF2.png",
            alt: "Scaffold screen",
            caption: "Scaffold product screen",
          },
        ],
      },
    ],
  },
  {
    slug: "moneymonsters",
    title: "Turning Financial Literacy Into Play",
    subtitle: "MoneyMonsters",
    cardTitle: "Turning Financial Literacy Into Play",
    cardDescription:
      "Financial education app concept for children with dual-audience flows for kids and parents.",
    meta: {
      role: "Led UI and UX design process",
      timeline: "January - April 2025",
      team: "(Add team)",
      tools: "(Add tools)",
    },
    heroMedia: {
      type: "image",
      src: "/MM0.png",
      alt: "MoneyMonsters hero",
      caption: "MoneyMonsters hero visual",
    },
    sections: [
      {
        id: "overview",
        type: "richText",
        title: "Overview",
        paragraphs: [
          "MoneyMonsters is a financial education app concept aimed at helping children develop money management skills through interactive and gamified experiences.",
          "The project addressed a gap in early financial education by combining learning with everyday activities such as chores and allowance tracking.",
        ],
      },
      {
        id: "background",
        type: "richText",
        title: "Background",
        paragraphs: [
          "The goal was to design a dual audience product that simultaneously engages children and supports parents as facilitators.",
        ],
      },
      {
        id: "problem",
        type: "richText",
        title: "The Problem",
        paragraphs: [
          "Early financial education tools needed immediate feedback, simple navigation, and motivational reward systems to support sustained engagement.",
        ],
      },
      {
        id: "scope",
        type: "richText",
        title: "Scope / Ownership",
        paragraphs: [
          "I led the UI and UX design process, taking responsibility for research synthesis, interface design, and interactive prototyping.",
          "I developed personas for both children and parents, mapped cross user workflows, and created a unified design language that supported two distinct user experiences within one ecosystem.",
        ],
      },
      {
        id: "process",
        type: "process",
        title: "Process",
        steps: [
          {
            title: "Research and concept framing",
            description:
              "Studied child learning behaviors, gamification strategies, and parental expectations to define product principles.",
            takeaway: "Design for immediate feedback and motivation.",
          },
          {
            title: "Flow simplification",
            description:
              "Built wireframes that prioritized intuitive flows and minimized unnecessary complexity.",
            takeaway: "Clarity is essential for younger users and co-use with parents.",
          },
          {
            title: "Visual and interaction polish",
            description:
              "Refined screen layouts, interaction patterns, and visual identity through iterative design cycles and high-fidelity prototypes.",
            takeaway: "Playful visuals should reinforce, not compete with, usability.",
          },
        ],
      },
      {
        id: "designs",
        type: "designs",
        title: "Designs",
        subsections: [
          {
            title: "Dual-audience experience",
            before:
              "Financial tools often serve one audience at a time, creating mismatch between child engagement and parental oversight.",
            after:
              "A unified design language supported both child and parent workflows within one ecosystem.",
            media: [],
          },
          {
            title: "Reward and progress loops",
            before:
              "Abstract educational goals felt disconnected from daily behavior.",
            after:
              "Interactive tasks and visual progress indicators reinforced positive money habits.",
            media: [],
          },
        ],
      },
      {
        id: "result",
        type: "richText",
        title: "Result / Outcome",
        paragraphs: [
          "The resulting prototype presented a cohesive educational ecosystem that merged learning and play.",
          "(Add metric)",
        ],
      },
      {
        id: "post-launch",
        type: "callout",
        title: "Post-launch / Learnings",
        body: "MoneyMonsters enhanced my ability to design for diverse user groups and taught me how to translate abstract educational objectives into concrete interface mechanics.",
      },
      {
        id: "media",
        type: "media",
        title: "Media",
        items: [
          {
            type: "image",
            src: "/MM1.png",
            alt: "MoneyMonsters screen",
            caption: "MoneyMonsters product screen",
          },
        ],
      },
    ],
  },
  {
    slug: "dtrmnd",
    title: "Reinventing the Online Clothing Store With AI Try-On",
    subtitle: "DTRMND",
    cardTitle: "Reinventing the Online Clothing Store With AI Try-On",
    cardDescription:
      "Experimental ecommerce storefront centered on AI-powered virtual try-on.",
    meta: {
      role: "Led end to end product design and implementation",
      timeline: "September - December 2025",
      team: "(Add team)",
      tools: "(Add tools)",
    },
    heroMedia: {
      type: "image",
      src: "/DTR0.png",
      alt: "DTRMND hero",
      caption: "DTRMND hero visual",
    },
    sections: [
      {
        id: "overview",
        type: "richText",
        title: "Overview",
        paragraphs: [
          "DTRMND is an experimental ecommerce clothing store concept built around an AI powered virtual try-on experience.",
          "The project explored how emerging AI tools could reduce uncertainty in online apparel shopping by allowing users to preview clothing digitally before purchasing.",
        ],
      },
      {
        id: "background",
        type: "richText",
        title: "Background",
        paragraphs: [
          "The objective was to design and prototype a fashion storefront where the AI try-on feature was not an add-on, but the central interaction driving the shopping experience.",
          "Instead of browsing static product photos alone, users could upload an photo or select a model profile and instantly visualize how garments would appear when worn.",
        ],
      },
      {
        id: "problem",
        type: "richText",
        title: "The Problem",
        paragraphs: [
          "Online clothing purchases often suffer from sizing uncertainty and lack of physical context.",
          "Most try-on features are hidden behind extra steps, which discourages adoption.",
        ],
      },
      {
        id: "scope",
        type: "richText",
        title: "Scope / Ownership",
        paragraphs: [
          "My responsibilities included experience design, interface design, feature architecture, and integration planning for the AI try-on workflow.",
          "I designed reusable UI components, established visual hierarchy for product browsing, and ensured that the try-on feature felt seamlessly integrated into the shopping flow rather than isolated as a novelty feature.",
        ],
      },
      {
        id: "process",
        type: "process",
        title: "Process",
        steps: [
          {
            title: "Concept and research",
            description:
              "Reviewed virtual try-on technologies and ecommerce interaction patterns to identify where adoption breaks down.",
            takeaway: "Surface try-on early and prominently in the journey.",
          },
          {
            title: "Flow architecture",
            description:
              "Mapped user flows from item discovery through try-on preview to purchase.",
            takeaway: "Speed and clarity should define the default path.",
          },
          {
            title: "Prototype refinement",
            description:
              "Iterated upload, preview, garment switching, and feedback states with a restrained fashion-retail visual system.",
            takeaway: "Smooth feedback and transitions build trust around AI output.",
          },
        ],
      },
      {
        id: "designs",
        type: "designs",
        title: "Designs",
        subsections: [
          {
            title: "Try-on discoverability",
            before:
              "Traditional ecommerce journeys treat virtual try-on as a hidden secondary feature.",
            after:
              "DTRMND made try-on the central interaction, connected directly to browsing and purchase decisions.",
            media: [],
          },
          {
            title: "Feedback and preview states",
            before:
              "AI interactions can feel opaque and disconnected from shopping flow.",
            after:
              "Consistent spacing, restrained palettes, loading indicators, and preview transitions made the process transparent and intuitive.",
            media: [],
          },
        ],
      },
      {
        id: "result",
        type: "richText",
        title: "Result / Outcome",
        paragraphs: [
          "The final prototype demonstrated a cohesive ecommerce environment centered around interactive garment visualization.",
          "(Add metric)",
        ],
      },
      {
        id: "post-launch",
        type: "callout",
        title: "Post-launch / Learnings",
        body: "The project strengthened my skills in experience architecture, interaction design, and balancing innovation with usability, while reinforcing the importance of trust in ecommerce contexts.",
      },
      {
        id: "media",
        type: "media",
        title: "Media",
        items: [
          {
            type: "image",
            src: "/DTR1.png",
            alt: "DTRMND screen",
            caption: "DTRMND product screen",
          },
          {
            type: "image",
            src: "/DTR2.png",
            alt: "DTRMND screen",
            caption: "DTRMND product screen",
          },
        ],
      },
    ],
  },
];

export const caseStudiesBySlug = new Map(caseStudies.map((study) => [study.slug, study]));

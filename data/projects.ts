/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ALL PROJECT CONTENT LIVES IN THIS ONE FILE.
 *
 *  To add a project: copy one of the objects below, give it a unique
 *  `slug` (that becomes its web address: /projects/<slug>), and fill in
 *  the fields. The home-page seed packet and the case-study page are
 *  generated automatically — you never need to touch the components.
 *
 *  Images go in /public/images and are referenced like "/images/name.webp".
 *  Everything currently here is a clearly labelled PLACEHOLDER — replace
 *  it with your real case studies whenever you're ready.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type CaseStudySection =
  /** A block of editorial text. `heading` is optional; `body` is a list of paragraphs. */
  | { type: "text"; heading?: string; body: string[] }
  /** A screenshot or photo with an optional handwritten caption. */
  | { type: "image"; src: string; alt: string; caption?: string }
  /** A side-by-side before / after comparison, each with its own caption. */
  | {
      type: "beforeAfter";
      before: { src: string; alt: string; caption?: string };
      after: { src: string; alt: string; caption?: string };
      caption?: string;
    }
  /** An optional video walkthrough. Leave `src` empty ("") to show a labelled placeholder box. */
  | { type: "video"; src: string; caption?: string; poster?: string }
  /** A button linking out to a live prototype (Figma, etc.). */
  | { type: "prototype"; url: string; label?: string };

export interface Project {
  /** URL of the case study: /projects/<slug> — lowercase, words separated by hyphens. */
  slug: string;
  /** Shown on the seed packet and as the case-study page title. */
  title: string;
  /** One or two sentences. Shown on the packet, on the slip card, and as the page lede. */
  summary: string;
  /** Your role, e.g. "Lead UI/UX designer". */
  role: string;
  /** e.g. "Spring 2026". */
  date: string;
  /** Image shown on the slip card that slides out of the packet. Path under /public. */
  thumbnail: string;
  /** Optional: link to a live prototype, also offered at the top of the case study. */
  prototypeUrl?: string;
  /** The case study itself, as an ordered list of reusable sections. */
  sections: CaseStudySection[];
}

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "[Placeholder] Project One",
    summary:
      "[Placeholder summary] Problem → process → solution → result. Replace this with two sentences about what the project was and what changed for users.",
    role: "[Placeholder role] Lead UI/UX designer",
    date: "[Placeholder date] 2026",
    thumbnail: "/images/project-1.webp",
    prototypeUrl: "https://example.com/prototype-placeholder",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "[Placeholder] Use this space for the story of the project: the context, your role on the team, and the outcome in one short paragraph.",
          "[Placeholder] A second paragraph works well for constraints — timeline, platform, team size — and what success looked like.",
        ],
      },
      {
        type: "image",
        src: "/images/project-1.webp",
        alt: "[Placeholder screenshot] The project's main screen",
        caption: "[Placeholder caption] The main screen, after redesign.",
      },
      {
        type: "text",
        heading: "The problem",
        body: [
          "[Placeholder] What was broken, confusing, or missing? Add the research or feedback that proved it — a quote, a metric, a usability finding.",
        ],
      },
      {
        type: "beforeAfter",
        before: {
          src: "/images/project-1.webp",
          alt: "[Placeholder] The original design",
          caption: "Before — [placeholder]",
        },
        after: {
          src: "/images/field-alt.webp",
          alt: "[Placeholder] The redesigned version",
          caption: "After — [placeholder]",
        },
        caption: "[Placeholder caption] Drag your real before/after screenshots into /public/images and point the paths here.",
      },
      {
        type: "video",
        src: "",
        caption: "[Placeholder] Optional walkthrough video — set `src` in data/projects.ts to an .mp4 in /public/images (or remove this section).",
      },
      {
        type: "prototype",
        url: "https://example.com/prototype-placeholder",
        label: "[Placeholder] View interactive prototype",
      },
    ],
  },
  {
    slug: "project-two",
    title: "[Placeholder] Project Two",
    summary:
      "[Placeholder summary] Problem → process → solution → result. Replace this with two sentences about what the project was and what changed for users.",
    role: "[Placeholder role] UI/UX designer",
    date: "[Placeholder date] 2025",
    thumbnail: "/images/hero.webp",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "[Placeholder] The story of this project: context, your role, and the outcome.",
        ],
      },
      {
        type: "image",
        src: "/images/hero.webp",
        alt: "[Placeholder screenshot] A key screen from project two",
        caption: "[Placeholder caption] A key screen from the project.",
      },
      {
        type: "text",
        heading: "What I learned",
        body: [
          "[Placeholder] Every case study lands better with one honest reflection — what surprised you, what you'd do differently.",
        ],
      },
    ],
  },
  {
    slug: "project-three",
    title: "[Placeholder] Project Three",
    summary:
      "[Placeholder summary] Problem → process → solution → result. Replace this with two sentences about what the project was and what changed for users.",
    role: "[Placeholder role] UI/UX designer",
    date: "[Placeholder date] 2025",
    thumbnail: "/images/field-alt.webp",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "[Placeholder] The story of this project: context, your role, and the outcome.",
        ],
      },
      {
        type: "image",
        src: "/images/field-alt.webp",
        alt: "[Placeholder screenshot] A key screen from project three",
        caption: "[Placeholder caption] A key screen from the project.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

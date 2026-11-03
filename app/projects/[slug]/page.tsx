import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import SectionList from "@/components/case-study/Sections";

/**
 * The case-study template. One page is generated per project in
 * data/projects.ts (direct links like /projects/project-one work out of
 * the box). Editorial layout: clean reading column, scrapbook type,
 * small botanical details.
 */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found — Iris" };
  return { title: `${project.title} — Iris`, description: project.summary };
}

function IrisDivider() {
  return (
    <svg
      viewBox="0 0 124 132"
      aria-hidden="true"
      focusable="false"
      style={{ width: 44, height: "auto", display: "block", margin: "4px 0 10px", opacity: 0.75 }}
    >
      <g fill="none" stroke="#54401f" strokeWidth="2.6" strokeLinecap="round">
        <path d="M62,120 C60,100 61,82 63,62" />
        <path d="M61,106 C45,99 36,86 34,70 C49,77 58,90 61,106" />
        <path d="M63,98 C78,90 86,78 87,64 C75,71 67,83 63,98" />
        <path d="M63,58 C55,42 56,27 63,15 C70,27 71,42 63,58" />
        <path d="M59,55 C47,46 44,33 48,21 C57,29 61,42 59,55" />
        <path d="M67,55 C79,46 82,33 78,21 C69,29 65,42 67,55" />
        <path d="M30,124 C48,120 78,120 96,124" strokeWidth="2" opacity="0.55" />
      </g>
    </svg>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="cs">
      <Link className="cs-back" href="/#work">
        ← Back to projects
      </Link>

      <IrisDivider />
      <p className="cs-kicker">Case study {String(index + 1).padStart(2, "0")}</p>
      <h1 className="cs-title">{project.title}</h1>

      <div className="cs-meta">
        <span>
          <b>Role</b>
          {project.role}
        </span>
        <span>
          <b>Date</b>
          {project.date}
        </span>
      </div>

      <p className="cs-lede">{project.summary}</p>

      {project.prototypeUrl ? (
        <a className="cs-proto" href={project.prototypeUrl} target="_blank" rel="noreferrer">
          View live prototype →
        </a>
      ) : null}

      <hr className="cs-rule" />

      <SectionList sections={project.sections} />

      <div className="cs-foot">
        <Link className="cs-back" href="/#work" style={{ marginBottom: 0 }}>
          ← Back to projects
        </Link>
        {projects.length > 1 ? (
          <Link className="cs-next" href={`/projects/${next.slug}`}>
            next seed: {next.title} →
          </Link>
        ) : null}
      </div>
    </article>
  );
}

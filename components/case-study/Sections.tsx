import type { CaseStudySection } from "@/data/projects";

/**
 * Reusable case-study section components. The case-study template renders
 * whatever sections a project lists in data/projects.ts, in order — add a
 * section object there and it appears here, no component changes needed.
 */

function TextSection({ section }: { section: Extract<CaseStudySection, { type: "text" }> }) {
  return (
    <div className="cs-sec">
      {section.heading ? <h3>{section.heading}</h3> : null}
      {section.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

function ImageSection({ section }: { section: Extract<CaseStudySection, { type: "image" }> }) {
  return (
    <figure className="cs-fig">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={section.src} alt={section.alt} />
      {section.caption ? <figcaption className="cs-cap">{section.caption}</figcaption> : null}
    </figure>
  );
}

function BeforeAfterSection({
  section,
}: {
  section: Extract<CaseStudySection, { type: "beforeAfter" }>;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="cs-ba">
        <figure>
          <span className="ba-tag">Before</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.before.src}
            alt={section.before.alt}
            style={{ width: "100%", display: "block", borderRadius: 14, border: "1.5px solid #ddd2b8" }}
          />
          {section.before.caption ? (
            <figcaption className="cs-cap">{section.before.caption}</figcaption>
          ) : null}
        </figure>
        <figure>
          <span className="ba-tag">After</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.after.src}
            alt={section.after.alt}
            style={{ width: "100%", display: "block", borderRadius: 14, border: "1.5px solid #ddd2b8" }}
          />
          {section.after.caption ? (
            <figcaption className="cs-cap">{section.after.caption}</figcaption>
          ) : null}
        </figure>
      </div>
      {section.caption ? <figcaption className="cs-cap">{section.caption}</figcaption> : null}
    </figure>
  );
}

function VideoSection({ section }: { section: Extract<CaseStudySection, { type: "video" }> }) {
  return (
    <figure className="cs-video" style={{ margin: "42px 0" }}>
      {section.src ? (
        <video controls preload="metadata" poster={section.poster}>
          <source src={section.src} />
        </video>
      ) : (
        <div className="cs-video-ph">▷ Video placeholder — add a walkthrough here</div>
      )}
      {section.caption ? <figcaption className="cs-cap">{section.caption}</figcaption> : null}
    </figure>
  );
}

function PrototypeSection({
  section,
}: {
  section: Extract<CaseStudySection, { type: "prototype" }>;
}) {
  return (
    <div className="cs-sec">
      <a className="cs-proto" href={section.url} target="_blank" rel="noreferrer">
        {section.label ?? "View interactive prototype"} →
      </a>
    </div>
  );
}

export default function SectionList({ sections }: { sections: CaseStudySection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case "text":
            return <TextSection key={i} section={section} />;
          case "image":
            return <ImageSection key={i} section={section} />;
          case "beforeAfter":
            return <BeforeAfterSection key={i} section={section} />;
          case "video":
            return <VideoSection key={i} section={section} />;
          case "prototype":
            return <PrototypeSection key={i} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

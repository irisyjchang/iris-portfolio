# Iris — UI/UX Portfolio

A scrapbook-style portfolio: an iris field in gentle rain, a hand-written
title on a strip of tape, falling petals for navigation, and seed packets
tied with twine as project previews. Each packet opens a dedicated,
editorial case-study page.

Built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**,
with GSAP (twine untie animation), Vivus (pen-stroke title writing) and
Rough Notation (pencil accents).

## Run it locally

You'll need Node.js 18+ (20+ recommended).

```bash
npm install     # install dependencies
npm run dev     # develop at http://localhost:3000
```

For a production build:

```bash
npm run build   # build the site
npm run start   # serve the build at http://localhost:3000
```

## Where things live

| Path | What it is |
| --- | --- |
| `data/projects.ts` | **All project content.** One editable file — titles, summaries, roles, dates, thumbnails, case-study sections. |
| `app/page.tsx` | The home page (hero, work, about, say hello). |
| `app/projects/[slug]/page.tsx` | The case-study template — one page is generated per project. |
| `components/Hero.tsx` | The animated garden hero (rain, swaying field, write-on title, petal navigation). |
| `components/SeedPacket.tsx` | The twine-tied seed packet preview + its untie animation. |
| `components/case-study/Sections.tsx` | Reusable case-study sections: text, image + caption, before/after, video, prototype link. |
| `components/packet.css` | The seed packet's material styling (kraft paper, twine). |
| `app/globals.css` | Site-wide scrapbook styling and fonts. |
| `public/images/` | Painting, petals, tape, kraft texture, project images. |
| `public/fonts/` | Self-hosted Reenie Beanie + Caveat typefaces. |

## Adding or editing a project

Open `data/projects.ts` and copy any project object. Give it a unique
`slug` — that becomes its address (`/projects/<slug>`). Fill in `title`,
`summary`, `role`, `date`, `thumbnail`, an optional `prototypeUrl`, and
the `sections` list. Section types:

- `{ type: "text", heading?, body: [...] }` — paragraphs
- `{ type: "image", src, alt, caption? }` — screenshot with caption
- `{ type: "beforeAfter", before: {...}, after: {...}, caption? }`
- `{ type: "video", src, caption?, poster? }` — leave `src` empty for a placeholder box
- `{ type: "prototype", url, label? }` — a button to a live prototype

Drop images into `public/images/` and reference them as `/images/name.webp`.
The home-page packet and the case-study page update automatically.

The current content is **placeholder** copy, clearly labelled — replace it
with real case studies whenever you're ready. The contact form does not
send yet; wire it to your email (or a form service) before publishing.

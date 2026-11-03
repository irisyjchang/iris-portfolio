"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import type { Project } from "@/data/projects";
import "./packet.css";

/**
 * The seed packet — a project preview tied with a jute twine bow.
 * Clicking the flap unties the bow (GSAP morphs each string piece through
 * tied → loosened → exit shapes), lifts the flap, and slides a slip card
 * out with the thumbnail, summary and a "View project" link to the
 * case-study page. Clicking the flap again reverses the whole sequence.
 * Ported from the approved demo-61 build; the twine layer sits above the
 * flap (z-index 7) so the full bow stays visible in both settled states.
 */

const S = {
  loopL: {
    tied: "M160,60 C128,26 84,22 78,44 C73,64 108,78 160,60",
    loose: "M160,60 C134,32 96,28 90,46 C85,63 112,74 160,60",
    exit: "M150,120 C110,180 92,250 96,330 C98,366 84,404 60,428",
  },
  loopR: {
    tied: "M160,60 C190,30 228,28 234,46 C238,62 204,74 160,60",
    loose: "M160,60 C182,36 214,34 219,48 C222,60 196,70 160,60",
    gone: "M160,60 C169,52 181,51 185,57 C188,62 173,67 160,60",
    exit: "M196,110 C232,170 248,240 244,322 C242,358 256,396 280,420",
  },
  tailR: {
    tied: "M163,63 C184,82 192,102 188,124 C187,131 190,138 196,142",
    loose: "M163,63 C202,76 234,94 250,124 C236,108 222,99 205,95 C224,106 240,114 256,118",
    exit: "M206,120 C238,180 252,250 248,330 C246,364 260,400 282,424",
  },
  tailL: {
    tied: "M157,63 C134,86 126,110 129,136 C130,143 127,149 121,153",
    loose: "M157,63 C136,84 129,106 131,130 C132,137 129,143 124,147",
    exit: "M150,130 C118,190 104,260 108,338 C110,372 96,408 74,430",
  },
} as const;

type PieceId = keyof typeof S;

const FRAY_L = ["M121,153 l-5,5", "M121,153 l-1,7", "M121,153 l4,6"];
const FRAY_R = ["M196,142 l6,4", "M196,142 l2,7", "M196,142 l-3,6"];
const FIBRES = [
  "M96,20 q-6,-3 -9,-8", "M64,54 q-8,0 -12,3", "M238,30 q6,-4 8,-9", "M252,58 q8,1 12,4",
  "M150,86 q-2,6 -5,10", "M176,88 q3,6 7,9", "M120,88 q-5,4 -10,5", "M206,90 q5,5 11,6",
  "M158,44 q0,-6 2,-11", "M44,80 q-7,2 -11,6",
];

function StrGroup({ id, frays }: { id: PieceId; frays?: string[] }) {
  const d = S[id].tied;
  return (
    <g className="str" data-str={id}>
      <path className="u" d={d} />
      <path className="m" d={d} />
      <path className="t" d={d} />
      {frays?.map((f) => (
        <path key={f} className="fray" d={f} />
      ))}
    </g>
  );
}

function Twine() {
  return (
    <svg className="pk-twine" viewBox="0 0 320 170" aria-hidden="true" focusable="false">
      <g className="strw">
        <path className="u" d="M155,57 C149,38 147,18 148,-4" />
        <path className="m" d="M155,57 C149,38 147,18 148,-4" />
      </g>
      <g className="strw">
        <path className="u" d="M165,57 C171,38 174,18 172,-4" />
        <path className="m" d="M165,57 C171,38 174,18 172,-4" />
      </g>
      <StrGroup id="tailL" frays={FRAY_L} />
      <StrGroup id="loopL" />
      <StrGroup id="loopR" />
      <StrGroup id="tailR" frays={FRAY_R} />
      <g className="knotG">
        <ellipse className="knotCore" cx="160" cy="62" rx="8" ry="4.5" />
        <g className="strk">
          <path className="u" d="M145,51 C153,58 167,63 177,69" />
          <path className="m" d="M145,51 C153,58 167,63 177,69" />
        </g>
        <g className="strk">
          <path className="u" d="M175,49 C167,58 153,64 143,67" />
          <path className="m" d="M175,49 C167,58 153,64 143,67" />
          <path className="t" d="M175,49 C167,58 153,64 143,67" />
        </g>
      </g>
      {FIBRES.map((f) => (
        <path key={f} className="fibre" d={f} />
      ))}
    </svg>
  );
}

function IrisMark() {
  return (
    <svg className="pk-iris" viewBox="0 0 124 132" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#54401f" strokeWidth="2.1" strokeLinecap="round" opacity="0.82">
        <path d="M62,120 C60,100 61,82 63,62" />
        <path d="M61,106 C45,99 36,86 34,70 C49,77 58,90 61,106" />
        <path d="M63,98 C78,90 86,78 87,64 C75,71 67,83 63,98" />
        <path d="M63,58 C55,42 56,27 63,15 C70,27 71,42 63,58" />
        <path d="M59,55 C47,46 44,33 48,21 C57,29 61,42 59,55" />
        <path d="M67,55 C79,46 82,33 78,21 C69,29 65,42 67,55" />
        <path d="M57,50 C44,49 35,57 32,70 C43,71 52,62 57,50" />
        <path d="M69,50 C82,49 91,57 94,70 C83,71 74,62 69,50" />
        <path d="M63,52 C63,64 59,72 52,77 C61,80 68,72 63,52" />
        <path d="M30,124 C48,120 78,120 96,124" strokeWidth="1.5" opacity="0.55" />
      </g>
    </svg>
  );
}

const ROTATIONS = [-1.2, 0.9, -0.6, 1.4, -1.6, 0.5];

export default function SeedPacket({ project, index }: { project: Project; index: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const slipId = useId();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const btn = root.querySelector<HTMLButtonElement>(".pk-flap");
    const packet = root.querySelector<HTMLElement>(".pk-packet");
    const slip = root.querySelector<HTMLElement>(".pk-slip");
    const link = slip?.querySelector<HTMLElement>(".pk-link");
    if (!btn || !packet || !slip || !link) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(root);
    const M = (id: PieceId) =>
      q(`[data-str="${id}"] path.m, [data-str="${id}"] path.u, [data-str="${id}"] path.t`);

    let isOpen = false;
    let busy = false;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          busy = false;
          isOpen = true;
          packet.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          btn.setAttribute("aria-label", "Close project packet");
          slip.setAttribute("aria-hidden", "false");
          link.removeAttribute("tabindex");
        },
        onReverseComplete: () => {
          busy = false;
          isOpen = false;
          packet.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          btn.setAttribute("aria-label", "Open project packet");
          slip.setAttribute("aria-hidden", "true");
          link.setAttribute("tabindex", "-1");
        },
      });
      tl.to(".fray", { opacity: 0, duration: 0.25 }, 0.05)
        .to(".pk-twine", { scale: 0.97, transformOrigin: "160px 60px", duration: 0.35, ease: "power2.out" }, 0)
        .to(M("tailR"), { attr: { d: S.tailR.loose }, duration: 0.5, ease: "power2.out" }, 0)
        .to(M("loopR"), { attr: { d: S.loopR.loose }, duration: 0.5 }, 0.05)
        .to(".pk-twine", { scale: 1, duration: 0.3 }, 0.4)
        .to(M("loopR"), { attr: { d: S.loopR.gone }, duration: 0.55 }, 0.55)
        .to(".knotG", { scale: 1.07, transformOrigin: "160px 60px", duration: 0.4 }, 1.05)
        .to(M("loopL"), { attr: { d: S.loopL.loose }, duration: 0.35 }, 1.05)
        .to(".fibre", { opacity: 0, duration: 0.3 }, 1.1)
        .to(M("loopL"), { attr: { d: S.loopL.exit }, duration: 0.65, ease: "power1.inOut" }, 1.45)
        .to(M("loopR"), { attr: { d: S.loopR.exit }, duration: 0.65 }, 1.5)
        .to(M("tailR"), { attr: { d: S.tailR.exit }, duration: 0.65 }, 1.55)
        .to(M("tailL"), { attr: { d: S.tailL.exit }, duration: 0.65 }, 1.6)
        .to(".strw", { y: -7, opacity: 0, duration: 0.5 }, 1.6)
        .to(".knotG", { x: 52, y: 64, scale: 0.8, transformOrigin: "160px 60px", duration: 0.6 }, 1.65)
        .to(".pk-twine", { y: 46, opacity: 0, duration: 0.5, ease: "power1.in" }, 2.25)
        .to(".pk-flap", { rotationX: -165, filter: "brightness(.86)", duration: 0.75 }, 2.8)
        .to(".pk-slip", { y: -184, rotation: -2, duration: 0.7, ease: "power2.out" }, 3.45)
        .to(".pk-close-cue", { opacity: 0.9, duration: 0.4 }, 3.95);

      const onClick = () => {
        if (busy) return;
        if (reduced) {
          if (isOpen) tl.progress(0);
          else tl.progress(1);
          return;
        }
        busy = true;
        if (isOpen) tl.timeScale(1.35).reverse();
        else tl.timeScale(1).play();
      };
      btn.addEventListener("click", onClick);
      return () => btn.removeEventListener("click", onClick);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pk-stage" ref={rootRef}>
      <div className="pk-wrap">
        <div className="pk-slip" id={slipId} aria-hidden="true">
          <span className="pk-slip-tape" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pk-thumb" src={project.thumbnail} alt="" />
          <p className="pk-sum">{project.summary}</p>
          <Link className="pk-link" href={`/projects/${project.slug}`} tabIndex={-1}>
            View project →
          </Link>
        </div>
        <div
          className="pk-packet"
          style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)` }}
        >
          <button
            className="pk-flap"
            type="button"
            aria-expanded="false"
            aria-controls={slipId}
            aria-label="Open project packet"
          />
          <p className="pk-brand">IRIS SEED CO.</p>
          <IrisMark />
          <h3 className="pk-title">{project.title}</h3>
          <p className="pk-tag">
            Case study {String(index + 1).padStart(2, "0")} · {project.date}
          </p>
          <p className="pk-desc">{project.summary}</p>
          <p className="pk-foot">SOWN WITH CARE · EST. 2026</p>
          <Twine />
          <span className="pk-close-cue" aria-hidden="true">
            Close packet
          </span>
          <div className="pk-grain" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

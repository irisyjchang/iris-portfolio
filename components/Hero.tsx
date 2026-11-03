"use client";

import { useEffect, useRef } from "react";
import Vivus from "vivus";

/**
 * The garden hero — ported from the approved prototype:
 * the iris-field painting with individually swaying foreground slices,
 * thin ink-stroke rain on canvas, the name hand-written across a photo
 * tape strip (Vivus pen-stroke mask, Reenie Beanie), three painted
 * petals that flutter down and settle as the navigation, and a scatter
 * of smaller decorative petals that land once in the grass.
 */

const HERO_SRC = "/images/hero.webp";
const PETALS = ["/images/petal-1.png", "/images/petal-2.png", "/images/petal-3.png"];
const NAV = [
  { href: "#about", label: "about me", target: "about" },
  { href: "#work", label: "my work", target: "work" },
  { href: "#hello", label: "say hello", target: "hello" },
];

/** Foreground slices cloned from the painting itself, each swaying on its own timing. */
const SLICES = [
  { l: 0, r: 96, t: 34, o: 2, d: 6.8, dl: -1.2 },
  { l: 4, r: 84, t: 30, o: 10, d: 5.6, dl: -3.4 },
  { l: 16, r: 69, t: 38, o: 26, d: 7.4, dl: -0.7 },
  { l: 31, r: 61.5, t: 24, o: 37, d: 6.1, dl: -2.6 },
  { l: 38.5, r: 53.5, t: 36, o: 41, d: 8.2, dl: -4.1 },
  { l: 46.5, r: 41, t: 28, o: 52, d: 5.9, dl: -1.8 },
  { l: 59, r: 31, t: 34, o: 66, d: 7.0, dl: -3.0 },
  { l: 69, r: 21, t: 38, o: 71, d: 6.4, dl: -0.4 },
  { l: 79, r: 9, t: 32, o: 87, d: 7.7, dl: -2.2 },
  { l: 91, r: 0, t: 36, o: 95, d: 5.4, dl: -4.6 },
];

/** Hand-authored pen centrelines that reveal the lettering stroke by stroke. */
const STROKES: Array<[string, number, number]> = [
  ["M23,28 L22,86", 8, 10],
  ["M22,58 C23,42 42,40 43,56 L44,86", 21, 9],
  ["M65,48 L64,85", 34, 6],
  ["M66,30 L66,33", 44, 4],
  ["M85,74 C86,82 82,90 76,93", 52, 4],
  ["M115,48 L114,85", 60, 6],
  ["M116,30 L116,33", 70, 4],
  ["M135,28 L131,44", 79, 4],
  ["M155,86 L155,50 C156,40 172,38 173,52 L173,85", 86, 15],
  ["M173,58 C174,42 190,40 191,54 L191,85", 105, 9],
  ["M213,48 L212,85", 118, 6],
  ["M214,30 L214,33", 128, 4],
  ["M233,85 L233,50 C234,40 247,38 252,45", 136, 9],
  ["M263,48 L262,85", 149, 6],
  ["M264,30 L264,33", 159, 4],
  ["M293,50 C285,39 267,43 269,57 C271,71 291,67 290,80 C288,91 271,91 265,83", 168, 16],
  ["M311,83 L311,86", 188, 4],
];

const LETTERS: Array<[string, number, number]> = [
  ["h", 16, 82], ["i", 58, 80], [",", 74, 82], ["i", 108, 81], ["’", 128, 80],
  ["m", 148, 82], ["i", 206, 80], ["r", 226, 82], ["i", 256, 81], ["s", 274, 82], [".", 304, 82],
];

const DECO_SLOTS = [
  { l: 3, b: 9 }, { l: 33, b: 6 }, { l: 61, b: 11 }, { l: 90, b: 7 },
  { l: 8, b: 17 }, { l: 38, b: 15 }, { l: 66, b: 16 },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    let raf = 0;
    let vivus: Vivus | null = null;
    const observers: IntersectionObserver[] = [];

    if (reduced) document.body.classList.add("reduced", "revealed");
    else {
      const t = setTimeout(() => document.body.classList.add("revealed"), 500);
      observers.push({ disconnect: () => clearTimeout(t) } as unknown as IntersectionObserver);
    }

    /* — Ink-stroke rain — */
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      let W = 0;
      let H = 0;
      const drops = Array.from({ length: 42 }, () => ({
        x: Math.random(),
        y: Math.random(),
        l: 7 + Math.random() * 7,
        s: 0.55 + Math.random() * 0.7,
      }));
      const resize = () => {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      const frame = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = "rgba(66,60,50,.46)";
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        ctx.beginPath();
        for (const d of drops) {
          const x = d.x * W;
          const y = d.y * H;
          ctx.moveTo(x, y);
          ctx.lineTo(x - 1.5, y + d.l);
          d.y += (d.s / H) * 1.35;
          d.x -= 0.00025;
          if (d.y > 1) {
            d.y = -0.03;
            d.x = Math.random();
          }
        }
        ctx.stroke();
        raf = requestAnimationFrame(frame);
      };
      if (!reduced) raf = requestAnimationFrame(frame);
      observers.push({ disconnect: () => window.removeEventListener("resize", resize) } as unknown as IntersectionObserver);
    }

    /* — Nav petals: sequenced after the writing, randomised landings — */
    const heroImg = hero.querySelector<HTMLImageElement>(".hero-img");
    const W = heroImg ? heroImg.clientWidth : 1000;
    const delays = [3.5, 4.6, 5.7];
    const baseL = [15, 44, 72];
    const baseB = [3, 1.8, 3];
    const heads = [0.1, 0.45, 0.685];
    const centres = [0.21, 0.5, 0.78];
    hero.querySelectorAll<HTMLElement>(".petal-fall").forEach((a, i) => {
      a.style.animationDelay = delays[i].toFixed(2) + "s";
      a.style.animationDuration = rnd(2.3, 3.3).toFixed(2) + "s";
      a.style.left = (baseL[i] + rnd(-4, 4)).toFixed(1) + "%";
      a.style.bottom = (baseB[i] + rnd(-1.5, 2.6)).toFixed(1) + "%";
      const x0 = (heads[i] - centres[i]) * W + rnd(-16, 16);
      a.style.setProperty("--x0", x0.toFixed(0) + "px");
      a.style.setProperty("--x1", (x0 * 0.55 + rnd(-22, 22)).toFixed(0) + "px");
      a.style.setProperty("--x2", (x0 * 0.25 + rnd(-16, 16)).toFixed(0) + "px");
      a.style.setProperty("--r0", rnd(-235, -105).toFixed(0) + "deg");
      a.style.setProperty("--tilt", rnd(-21, 25).toFixed(0) + "deg");
      if (reduced) a.classList.add("settled");
      else a.addEventListener("animationend", () => a.classList.add("settled"), { once: true });
    });

    /* — Decorative petals: fall once, land scattered in the grass — */
    const deco = decoRef.current;
    if (deco) {
      const n = window.innerWidth < 760 ? 3 : 7;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        s.className = "deco-petal" + (reduced ? " rest" : "");
        const slot = DECO_SLOTS[i % DECO_SLOTS.length];
        s.style.left = slot.l + "%";
        s.style.bottom = slot.b + "%";
        s.style.width = Math.round(rnd(52, 86)) + "px";
        s.style.setProperty("--drop", Math.round(rnd(52, 72)) + "vh");
        s.style.setProperty("--sway", Math.round(rnd(14, 34)) + "px");
        s.style.setProperty("--r0", Math.round(rnd(-120, -40)) + "deg");
        s.style.setProperty("--r1", Math.round(rnd(-50, 30)) + "deg");
        s.style.setProperty("--r2", Math.round(rnd(-25, 25)) + "deg");
        s.style.setProperty("--tilt", Math.round(rnd(-13, 13)) + "deg");
        s.style.setProperty("--op", rnd(0.78, 0.9).toFixed(2));
        if (!reduced) {
          s.style.animationDuration = rnd(4.6, 8.6).toFixed(2) + "s";
          s.style.animationDelay = rnd(1.1, 6.8).toFixed(2) + "s";
        }
        const im = document.createElement("img");
        im.alt = "";
        im.src = PETALS[i % PETALS.length];
        s.appendChild(im);
        deco.appendChild(s);
      }
    }

    /* — Write-on heading (Vivus pen-stroke mask) — */
    const svg = svgRef.current;
    const g = svg?.querySelector("g");
    const finish = () => {
      if (g) g.removeAttribute("mask");
    };
    if (svg) {
      if (reduced) finish();
      else {
        svg.querySelectorAll(".wstroke").forEach((p) => p.removeAttribute("pathLength"));
        vivus = new Vivus(svg, { type: "scenario", duration: 192, start: "manual" }, finish);
        const heroObs = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                vivus?.play();
                heroObs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );
        heroObs.observe(hero);
        observers.push(heroObs);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      observers.forEach((o) => o.disconnect());
      vivus?.destroy();
      if (deco) deco.replaceChildren();
    };
  }, []);

  return (
    <div className="hero" id="garden" ref={heroRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-img"
        src={HERO_SRC}
        alt="Loose ink and watercolor sketch of a purple iris field on warm cream notebook paper"
      />
      {SLICES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          className="fg-layer"
          src={HERO_SRC}
          alt=""
          aria-hidden="true"
          style={{
            clipPath: `inset(${s.t}% ${s.r}% 0 ${s.l}%)`,
            transformOrigin: `${s.o}% 100%`,
            animationDuration: `${s.d}s`,
            animationDelay: `${s.dl}s`,
          }}
        />
      ))}
      <nav className="petal-fall-nav" aria-label="Portfolio">
        {NAV.map((item, i) => (
          <a key={item.target} className="petal-fall" href={item.href} data-target={item.target}>
            <span className="big-petal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="petal-photo" src={PETALS[i]} alt="" />
              <span className="petal-label hand">{item.label}</span>
            </span>
          </a>
        ))}
      </nav>
      <canvas id="rain" aria-hidden="true" ref={canvasRef} />
      <div className="deco-petals" aria-hidden="true" ref={decoRef} />
      <div className="intro">
        <h1 id="nameTitle" aria-label="hi, i’m iris.">
          <span className="size-ghost" aria-hidden="true">
            hi, i’m iris.
          </span>
          <svg id="writeSvg" viewBox="0 0 330 112" role="img" aria-hidden="true" ref={svgRef}>
            <defs>
              <mask id="wm" maskUnits="userSpaceOnUse" x="0" y="0" width="330" height="112">
                {STROKES.map(([d, start, duration]) => (
                  <path
                    key={d}
                    className="wstroke"
                    d={d}
                    pathLength={1}
                    data-start={start}
                    data-duration={duration}
                  />
                ))}
              </mask>
            </defs>
            <g mask="url(#wm)">
              {LETTERS.map(([ch, x, y]) => (
                <text key={x} x={x} y={y}>
                  {ch}
                </text>
              ))}
            </g>
          </svg>
        </h1>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { annotate } from "rough-notation";

/**
 * Rough Notation pencil accents, drawn when their section scrolls into
 * view: a grey circle around "curiosity" (About) and a soft grey
 * highlight on "work together" (Say Hello). All in pencil grey #7d7b73.
 */
export default function Accents() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 1 : 900;
    const circleEl = document.querySelector(".rn-circle");
    const highlightEl = document.querySelector(".rn-highlight");
    if (!circleEl || !highlightEl) return;
    const aAbout = annotate(circleEl as HTMLElement, {
      type: "circle",
      color: "#7d7b73",
      strokeWidth: 2,
      padding: 6,
      animationDuration: dur,
    });
    const aHello = annotate(highlightEl as HTMLElement, {
      type: "highlight",
      color: "rgba(125,123,115,.30)",
      animationDuration: dur,
    });
    const secObs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target.id === "about") aAbout.show();
          if (e.target.id === "hello") aHello.show();
          secObs.unobserve(e.target);
        });
      },
      { threshold: 0.35 }
    );
    ["about", "hello"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) secObs.observe(s);
    });
    return () => secObs.disconnect();
  }, []);
  return null;
}

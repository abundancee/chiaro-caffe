"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";

// The name climbs up out of the footer, letter by letter.
export function FooterWord() {
  const root = useRef<HTMLDivElement>(null);
  useScene(root, ({ gsap }, el) => {
    gsap.from(el.querySelectorAll("span"), { yPercent: 95, stagger: 0.05, ease: "none", scrollTrigger: { trigger: el, start: "top 100%", end: "bottom 98%", scrub: 0.8 } });
  });
  return (
    <div ref={root} aria-hidden className="flex select-none justify-center overflow-hidden">
      {"Chiaro".split("").map((l, i) => (
        <span key={i} className="display inline-block text-[31vw] leading-[1.02] text-cream">
          {l}
        </span>
      ))}
    </div>
  );
}

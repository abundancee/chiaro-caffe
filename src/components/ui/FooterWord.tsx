"use client";

import { useRef } from "react";
import { useScene } from "@/lib/use-scene";

// The wordmark climbs up out of the footer, letter by letter.
export function FooterWord() {
  const root = useRef<HTMLDivElement>(null);
  useScene(root, ({ gsap }, el) => {
    gsap.from(el.querySelectorAll("span"), { yPercent: 95, fontStretch: "50%", stagger: 0.06, ease: "none", scrollTrigger: { trigger: el, start: "top 100%", end: "bottom 98%", scrub: 0.6 } });
  });
  return (
    <div ref={root} aria-hidden className="flex select-none justify-center overflow-hidden leading-none">
      {"CHIARO".split("").map((l, i) => (
        <span key={i} className="display inline-block text-[30.5vw] leading-[0.82] text-marmalade 3xl:text-[27vw]">
          {l}
        </span>
      ))}
    </div>
  );
}

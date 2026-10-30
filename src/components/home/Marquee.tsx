"use client";

import { useRef } from "react";
import { menu } from "@/data/menu";
import { useScene } from "@/lib/use-scene";

const sections = menu.flatMap((c) => c.sections);

// A slow ribbon of menu sections that picks up speed as you scroll.
export function Marquee() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap, ScrollTrigger }, el) => {
    const row = el.querySelector<HTMLElement>("[data-row]")!;
    const width = row.scrollWidth / 2;
    let x = 0;
    const st = ScrollTrigger.create({ trigger: el });
    const tick = () => {
      const v = ScrollTrigger.isInViewport(el) ? st.getVelocity() : 0;
      x -= 0.5 + Math.abs(v) / 900;
      if (x <= -width) x += width;
      gsap.set(row, { x });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  });
  return (
    <section ref={root} aria-hidden className="on-dark overflow-hidden border-y border-line-dark bg-ink py-5 text-cream md:py-7">
      <div data-row className="flex w-max items-center">
        {[0, 1].map((n) => (
          <div key={n} className="flex items-center">
            {sections.map((s, i) => (
              <span key={s.id} className="flex items-center gap-8 pr-8 capitalize">
                <span className={`text-[2.125rem] md:text-[3.5rem] ${i % 2 ? "accent" : "display"}`}>{s.name}</span>
                <span className="size-1 rotate-45 bg-brass" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

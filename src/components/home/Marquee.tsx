"use client";

import { useRef } from "react";
import { menu } from "@/data/menu";
import { useScene } from "@/lib/use-scene";

const sections = menu.flatMap((c) => c.sections);

// A ribbon of menu sections that picks up speed and leans gently as you scroll.
export function Marquee() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap, ScrollTrigger }, el) => {
    const row = el.querySelector<HTMLElement>("[data-row]")!;
    const width = row.scrollWidth / 2;
    let x = 0;
    const st = ScrollTrigger.create({ trigger: el });
    const skew = gsap.quickTo(row, "skewX", { duration: 0.8, ease: "power3" });
    const tick = () => {
      const v = ScrollTrigger.isInViewport(el) ? st.getVelocity() : 0;
      skew(gsap.utils.clamp(-6, 6, v / -400));
      x -= 0.7 + Math.abs(v) / 700;
      if (x <= -width) x += width;
      gsap.set(row, { x });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  });
  return (
    <section ref={root} aria-hidden className="overflow-hidden border-y border-line bg-sand py-5 md:py-7">
      <div data-row className="flex w-max items-baseline">
        {[0, 1].map((n) => (
          <div key={n} className="flex items-baseline">
            {sections.map((s) => (
              <span key={s.id} className="flex items-baseline gap-6 pr-6 capitalize">
                <span className="display text-[2.75rem] md:text-[4.5rem]">{s.name}</span>
                <span className="accent text-[1.5rem] text-roast md:text-[2.25rem]">&amp;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

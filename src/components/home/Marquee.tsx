"use client";

import { useRef } from "react";
import { menu } from "@/data/menu";
import { SectionSticker } from "@/components/ui/SectionIcon";
import { useScene } from "@/lib/use-scene";

const sections = menu.flatMap((c) => c.sections);

function Row({ reverse, offset }: { reverse?: boolean; offset: number }) {
  const list = [...sections.slice(offset), ...sections.slice(0, offset)];
  return (
    <div data-row data-dir={reverse ? -1 : 1} className="flex w-max items-center">
      {[0, 1].map((n) => (
        <div key={n} className="flex items-center" aria-hidden={n === 1}>
          {list.map((s) => (
            <span key={s.id} className="display flex items-center gap-4 pr-8 text-[2.75rem] capitalize md:text-[5rem]">
              <SectionSticker id={s.id} size={30} className="size-12 md:size-16" />
              {s.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Two ribbons of menu sections that speed up and lean with your scrolling.
export function Marquee() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap, ScrollTrigger }, el) => {
    const rows = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-row]"));
    const state = rows.map((row) => ({ row, x: 0, dir: Number(row.dataset.dir), width: row.scrollWidth / 2 }));
    const st = ScrollTrigger.create({ trigger: el });
    const skew = gsap.quickTo(rows, "skewX", { duration: 0.5, ease: "power3" });
    const tick = () => {
      const v = ScrollTrigger.isInViewport(el) ? st.getVelocity() : 0;
      skew(gsap.utils.clamp(-12, 12, v / -220));
      state.forEach((s) => {
        s.x -= s.dir * (1.1 + Math.abs(v) / 420);
        if (s.x <= -s.width) s.x += s.width;
        if (s.x > 0) s.x -= s.width;
        gsap.set(s.row, { x: s.x });
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  });
  return (
    <section ref={root} aria-hidden className="overflow-hidden border-y-2 border-ink bg-cream py-6 md:py-10">
      <div className="-rotate-1 space-y-3">
        <Row offset={0} />
        <Row reverse offset={9} />
      </div>
    </section>
  );
}

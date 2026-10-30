"use client";

import { useRef } from "react";
import { allItems, menu } from "@/data/menu";
import { useScene } from "@/lib/use-scene";

const size = (id: string) => menu.flatMap((c) => c.sections).find((s) => s.id === id)?.items.length ?? 0;

const cards = [
  { n: allItems.length, label: "things to try", line: "Every one of them is on the menu.", bg: "bg-cream", rot: -2 },
  { n: size("breakfast"), label: "ways to start", line: "Croissants, manakish, pancakes and a full English.", bg: "bg-clay", rot: 1.5 },
  { n: size("tea-garden"), label: "organic teas", line: "From Moroccan mint to Ceylon Secret Garden.", bg: "bg-sage", rot: -1 },
  { n: size("espresso") + size("warm-up-your-heart"), label: "hot coffees & lattes", line: "Espresso to Pistachio Dream.", bg: "bg-taupe", rot: 2 },
];

// A deck of numbers, dealt onto the table one card at a time as you scroll.
export function Deck() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=240%", scrub: 0.7, pin: true, anticipatePin: 1 } });
    q<HTMLElement>("[data-card]").forEach((c, i) => {
      if (i === 0) return;
      const sign = i % 2 ? 1 : -1;
      const at = (i - 1) * 1.1;
      tl.from(c, { y: () => window.innerHeight * 1.05, rotate: sign * 9, ease: "power3.out", duration: 1 }, at);
      tl.to(q("[data-card]").slice(0, i), { scale: "-=0.035", y: "-=12", ease: "none", duration: 1 }, at);
      const num = c.querySelector<HTMLElement>("[data-num]")!;
      const end = Number(num.dataset.num);
      const o = { v: 0 };
      tl.to(o, { v: end, duration: 0.9, ease: "power1.out", onUpdate: () => { num.textContent = String(Math.round(o.v)); } }, at);
    });
  });

  return (
    <section ref={root} aria-labelledby="deck-title" className="on-dark relative flex h-[100svh] min-h-[36rem] flex-col items-center justify-center overflow-hidden bg-ink text-cream">
      <h2 id="deck-title" className="display absolute top-20 w-full text-center text-[3.25rem] md:top-24 md:text-[5.5rem]">
        Bring <span className="accent text-[0.9em] text-clay">an appetite</span>
      </h2>
      <ul className="relative mt-16 h-[24rem] w-[min(80vw,24rem)] md:h-[26rem]">
        {cards.map((c, i) => (
          <li key={c.label} data-card style={{ zIndex: i, rotate: `${c.rot}deg` }} className={`absolute inset-0 flex flex-col justify-between rounded-tile p-6 text-ink shadow-float ${c.bg}`}>
            <p className="eyebrow">Chiaro by numbers</p>
            <div>
              <p data-num={c.n} className="display text-[9rem] leading-[0.9] tabular-nums md:text-[11rem]">
                {c.n}
              </p>
              <p className="accent mt-2 text-[2rem] leading-tight">{c.label}</p>
              <p className="mt-2 text-[0.9375rem]">{c.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

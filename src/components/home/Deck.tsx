"use client";

import { useRef } from "react";
import { CoffeeBeanIcon, EggCrackIcon, ForkKnifeIcon, TeaBagIcon } from "@phosphor-icons/react/dist/ssr";
import { allItems, menu } from "@/data/menu";
import { useScene } from "@/lib/use-scene";

const sectionSize = (id: string) => menu.flatMap((c) => c.sections).find((s) => s.id === id)?.items.length ?? 0;

const cards = [
  { n: allItems.length, label: "things to try", line: "Yes, we counted. All of them are on the menu.", Icon: ForkKnifeIcon, bg: "bg-marmalade", rot: -5 },
  { n: sectionSize("breakfast"), label: "ways to start", line: "Croissants, manakish, pancakes and a full English.", Icon: EggCrackIcon, bg: "bg-pistachio", rot: 4 },
  { n: sectionSize("tea-garden"), label: "organic teas", line: "From Moroccan mint to Ceylon Secret Garden.", Icon: TeaBagIcon, bg: "bg-blush", rot: -3 },
  { n: sectionSize("espresso") + sectionSize("warm-up-your-heart"), label: "hot coffees & lattes", line: "Espresso to Pistachio Dream.", Icon: CoffeeBeanIcon, bg: "bg-butter", rot: 6 },
];

// A deck of numbers that deals itself onto the table as you scroll.
export function Deck() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=240%", scrub: 0.5, pin: true, anticipatePin: 1 } });
    q<HTMLElement>("[data-card]").forEach((c, i) => {
      if (i === 0) return;
      const sign = i % 2 ? 1 : -1;
      tl.from(c, { y: () => window.innerHeight * 1.1, x: sign * 200, rotate: sign * 38, ease: "power2.out", duration: 1 }, (i - 1) * 1.1);
      tl.to(q("[data-card]").slice(0, i), { scale: `-=0.05`, y: "-=16", ease: "none", duration: 1 }, (i - 1) * 1.1);
    });
    q<HTMLElement>("[data-num]").forEach((n, i) => {
      const end = Number(n.dataset.num);
      const o = { v: i === 0 ? end : 0 };
      if (i > 0) {
        tl.to(o, { v: end, duration: 0.9, ease: "power1.out", onUpdate: () => { n.textContent = String(Math.round(o.v)); } }, (i - 1) * 1.1);
      }
    });
  });

  return (
    <section ref={root} aria-labelledby="deck-title" className="relative flex h-[100svh] min-h-[36rem] flex-col items-center justify-center overflow-hidden bg-ink text-cream">
      <h2 id="deck-title" className="display absolute top-20 w-full text-center text-[2.5rem] md:top-24 md:text-[4.5rem]">
        Bring <span className="accent text-butter">an appetite.</span>
      </h2>
      <ul className="relative mt-16 h-[24rem] w-[min(82vw,26rem)] md:h-[27rem]">
        {cards.map((c, i) => (
          <li
            key={c.label}
            data-card
            style={{ zIndex: i, rotate: `${c.rot}deg` }}
            className={`absolute inset-0 flex flex-col justify-between rounded-[28px] border-2 border-ink p-6 text-ink shadow-[8px_8px_0_#00000055] ${c.bg}`}
          >
            <c.Icon size={52} weight="duotone" aria-hidden />
            <div>
              <p data-num={c.n} className="display text-[6.5rem] leading-[0.9] tabular-nums md:text-[8rem]">
                {c.n}
              </p>
              <p className="accent text-[2.25rem] leading-tight">{c.label}</p>
              <p className="mt-2 font-medium">{c.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

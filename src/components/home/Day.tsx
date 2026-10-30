"use client";

import { useRef } from "react";
import { itemBySlug, type MenuItem } from "@/data/menu";
import { useScene } from "@/lib/use-scene";
import { ItemTile } from "./ItemTile";

interface Panel {
  word: string;
  line: string;
  bg: string;
  fg: string;
  dark?: boolean;
  slugs: string[];
}

const panels: Panel[] = [
  { word: "Rise", line: "Something warm, something flaky.", bg: "bg-sand", fg: "text-ink", slugs: ["croissant-almond", "english-breakfast", "pancake-cloud", "cappuccino"] },
  { word: "Graze", line: "Salads, pizza and a long lunch.", bg: "bg-olive", fg: "text-cream", dark: true, slugs: ["mediterranean-bliss-salad", "margherita-perfection", "seafood-pasta", "mango-smoothie"] },
  { word: "Clink", line: "The glasses come out.", bg: "bg-cognac", fg: "text-cream", dark: true, slugs: ["strawberry-margarita", "dynamite-shrimps", "chiaro-martini", "tokara-wine-shiraz"] },
  { word: "Linger", line: "One more, and maybe dessert.", bg: "bg-wine", fg: "text-cream", dark: true, slugs: ["double-apple", "classic-mojito", "nutella-strawberry-croissant", "cheesecake"] },
];

// A day at Chiaro. Vertical scrolling drives the panels sideways from morning to night.
export function Day() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const track = q<HTMLElement>("[data-track]")[0];
    // With the scroller's own scrolling off, vertical scrolling takes over the sideways movement.
    el.style.overflow = "hidden";
    const distance = () => track.scrollWidth - el.offsetWidth;
    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.7, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
    });
    gsap.fromTo(q("[data-sun-marker]"), { left: "0%" }, { left: "100%", ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.7 } });
    q<HTMLElement>("[data-panel]").forEach((p) => {
      const pq = gsap.utils.selector(p);
      gsap.from(pq("[data-word]"), { xPercent: 22, ease: "none", scrollTrigger: { trigger: p, containerAnimation: slide, start: "left 95%", end: "left 15%", scrub: true } });
      pq<HTMLElement>("[data-tile]").forEach((t, i) => {
        gsap.from(t, { y: (i % 2 ? -1 : 1) * 70, opacity: 0.3, ease: "none", scrollTrigger: { trigger: p, containerAnimation: slide, start: "left 95%", end: "left 30%", scrub: true } });
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="day-title" className="no-scrollbar relative snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
      <h2 id="day-title" className="sr-only">
        A day at Chiaro
      </h2>
      <div aria-hidden className="pointer-events-none absolute inset-x-4 top-[5rem] z-20 h-px bg-brass/50 md:inset-x-16 md:top-24">
        <span data-sun-marker className="absolute -top-[3px] left-0 size-[7px] -translate-x-1/2 rotate-45 bg-brass" />
      </div>
      <div data-track className="flex w-max">
        {panels.map((p, n) => (
          <article key={p.word} data-panel className={`${p.bg} ${p.fg} ${p.dark ? "on-dark" : ""} flex h-[100svh] min-h-[38rem] w-screen shrink-0 snap-start flex-col justify-center px-4 pb-20 pt-24 md:px-16 md:pb-8`}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow opacity-80">0{n + 1} / 04</p>
                <p data-word className="display mt-2 origin-left text-[27vw] leading-[1] md:text-[15vw]">
                  {p.word}
                </p>
              </div>
              <p className="accent hidden max-w-[16ch] pb-3 text-right text-[2.5rem] leading-[1.1] md:block">{p.line}</p>
            </div>
            <p className="accent mt-2 text-[1.625rem] leading-tight md:hidden">{p.line}</p>
            <ul className="mt-5 grid grid-cols-4 gap-2 md:mt-8 md:max-w-4xl md:gap-6">
              {(p.slugs.map(itemBySlug).filter(Boolean) as MenuItem[]).map((item) => (
                <li key={item.id} data-tile>
                  <ItemTile item={item} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

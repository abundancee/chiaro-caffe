"use client";

import { useRef } from "react";
import { MoonStarsIcon, SunHorizonIcon, SunIcon, type Icon } from "@phosphor-icons/react";
import { itemBySlug, type MenuItem } from "@/data/menu";
import { useScene } from "@/lib/use-scene";
import { ItemTile } from "./ItemTile";

interface Panel {
  word: string;
  line: string;
  Icon: Icon;
  bg: string;
  fg: string;
  dark?: boolean;
  slugs: string[];
}

const panels: Panel[] = [
  { word: "Rise", line: "Something warm, something flaky.", Icon: SunHorizonIcon, bg: "bg-cream", fg: "text-ink", slugs: ["croissant-almond", "english-breakfast", "pancake-cloud", "cappuccino"] },
  { word: "Graze", line: "Salads, pizza and a long lunch.", Icon: SunIcon, bg: "bg-pistachio", fg: "text-ink", slugs: ["mediterranean-bliss-salad", "margherita-perfection", "seafood-pasta", "mango-smoothie"] },
  { word: "Clink", line: "The glasses come out.", Icon: SunHorizonIcon, bg: "bg-marmalade", fg: "text-ink", slugs: ["strawberry-margarita", "dynamite-shrimps", "chiaro-martini", "tokara-wine-shiraz"] },
  { word: "Linger", line: "One more, and maybe dessert.", Icon: MoonStarsIcon, bg: "bg-wine", fg: "text-cream", dark: true, slugs: ["double-apple", "classic-mojito", "nutella-strawberry-croissant", "cheesecake"] },
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
      scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.5, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
    });
    // The sun crosses the top of the screen and rolls as it goes.
    gsap.fromTo(q("[data-sun-marker]"), { left: "0%" }, { left: "100%", rotate: 720, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.5 } });
    q<HTMLElement>("[data-panel]").forEach((p) => {
      const pq = gsap.utils.selector(p);
      gsap.from(pq("[data-word]"), { xPercent: 28, fontStretch: "50%", ease: "none", scrollTrigger: { trigger: p, containerAnimation: slide, start: "left 90%", end: "left 15%", scrub: true } });
      pq<HTMLElement>("[data-tile]").forEach((t, i) => {
        gsap.from(t, { y: (i % 2 ? -1 : 1) * 130, rotate: (i % 2 ? -1 : 1) * 16, scale: 0.75, ease: "none", scrollTrigger: { trigger: p, containerAnimation: slide, start: "left 95%", end: "left 25%", scrub: true } });
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="day-title" className="relative snap-x snap-mandatory overflow-x-auto overflow-y-hidden no-scrollbar">
      <h2 id="day-title" className="sr-only">
        A day at Chiaro
      </h2>
      <div aria-hidden className="pointer-events-none absolute inset-x-6 top-[4.75rem] z-20 h-0.5 bg-current text-ink/30 md:inset-x-16 md:top-24">
        <span data-sun-marker className="absolute -top-[15px] left-0 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-ink bg-butter text-ink">
          <SunIcon size={20} weight="fill" />
        </span>
      </div>
      <div data-track className="flex w-max">
        {panels.map((p) => (
          <article key={p.word} data-panel className={`${p.bg} ${p.fg} ${p.dark ? "on-dark" : ""} flex h-[100svh] min-h-[38rem] w-screen shrink-0 snap-start flex-col justify-center px-4 pb-20 pt-24 md:px-16 md:pb-8`}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p data-word className="display origin-left text-[25vw] md:text-[13vw]">
                  {p.word}
                </p>
                <p className="accent mt-1 text-[1.75rem] leading-tight md:text-[2.5rem]">{p.line}</p>
              </div>
              <p.Icon size={72} weight="duotone" aria-hidden className="mb-2 hidden shrink-0 md:block" />
            </div>
            <ul className="mt-5 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-3 md:mt-10 md:grid-cols-4 md:gap-8">
              {(p.slugs.map(itemBySlug).filter(Boolean) as MenuItem[]).map((item, i) => (
                <li key={item.id} data-tile className="mx-auto w-[34vw] md:w-full md:max-w-[13rem]">
                  <ItemTile item={item} rot={i % 2 ? 3 : -3} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

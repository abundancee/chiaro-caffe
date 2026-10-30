"use client";

import { useRef } from "react";
import { allItems, menu } from "@/data/menu";
import { Photo } from "@/components/ui/Photo";
import { useScene } from "@/lib/use-scene";

const size = (id: string) => menu.flatMap((c) => c.sections).find((s) => s.id === id)?.items.length ?? 0;

const chapters = [
  { n: allItems.length, label: "things to try", line: "Every one of them is on the menu.", src: "/images/site/number-all.webp", alt: "A single cocktail on a dark pedestal table" },
  { n: size("breakfast"), label: "ways to start", line: "Croissants, manakish, pancakes and a full English.", src: "/images/site/number-start.webp", alt: "Two golden croissants on black glass" },
  { n: size("tea-garden"), label: "organic teas", line: "From Moroccan mint to Ceylon Secret Garden.", src: "/images/site/number-tea.webp", alt: "Steaming tea in a traditional glass" },
  { n: size("espresso") + size("warm-up-your-heart"), label: "coffees and lattes", line: "From Espresso to Pistachio Dream.", src: "/images/site/number-coffee.webp", alt: "A cup of coffee on a dark saucer in side light" },
];

// Chapters of a day's appetite: photos wipe up over one another while the numbers roll.
export function Deck() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const items = q<HTMLElement>("[data-chapter]");
    el.style.height = "100svh";
    q<HTMLElement>("[data-stage]")[0].classList.add("is-stacked");
    gsap.set(items, { position: "absolute", inset: 0 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=300%", scrub: 0.9, pin: true, anticipatePin: 1 } });
    gsap.from(q("[data-title]"), { yPercent: 105, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 70%" } });
    gsap.from(q("[data-chapter]:first-child [data-photo-inner]"), { scale: 1.3, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true } });
    items.forEach((c, i) => {
      const parts = gsap.utils.selector(c);
      const at = -1 + i * 1.3;
      if (i === 0) {
        tl.fromTo(parts("[data-tick]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
        return;
      }
      const prev = gsap.utils.selector(items[i - 1]);
      tl.to(prev("[data-num]"), { yPercent: -105, ease: "power2.in", duration: 0.4 }, at - 0.1)
        .to(prev("[data-copy]"), { y: -24, autoAlpha: 0, duration: 0.3 }, at - 0.1);
      tl.fromTo(parts("[data-photo]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut", duration: 1 }, at - 0.1)
        .fromTo(parts("[data-photo-inner]"), { scale: 1.35 }, { scale: 1, ease: "power3.out", duration: 1.5 }, at - 0.1)
        .fromTo(parts("[data-num]"), { yPercent: 105 }, { yPercent: 0, ease: "power3.out", duration: 0.65 }, at + 0.2)
        .fromTo(parts("[data-copy]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: 0.5 }, at + 0.35)
        .fromTo(parts("[data-tick]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1.2 }, at);
      const num = parts<HTMLElement>("[data-num]")[0];
      const end = Number(num.dataset.num);
      const o = { v: 0 };
      tl.to(o, { v: end, ease: "power2.out", duration: 0.75, onUpdate: () => { num.textContent = String(Math.round(o.v)); } }, at + 0.15);
    });
    tl.to({}, { duration: 0.4 });
  });

  return (
    <section ref={root} aria-labelledby="deck-title" className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
      <div className="relative z-10 shrink-0 px-4 pt-22 text-center md:pt-24">
        <h2 id="deck-title" className="overflow-hidden text-[2.625rem] leading-[1.1] md:text-[4.25rem]">
          <span data-title className="inline-block">
            Bring <em className="accent text-brass">an appetite.</em>
          </span>
        </h2>
      </div>
      <ul data-stage className="relative flex-1 [&:not(.is-stacked)]:space-y-14 [&:not(.is-stacked)]:py-12">
        {chapters.map((c, i) => (
          <li key={c.label} data-chapter style={{ zIndex: i }} className="grid content-center justify-items-center gap-y-0 px-4 pb-16 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-14 md:px-8 md:pb-8">
            <div className="order-2 -mt-14 overflow-hidden md:order-1 md:mt-0 md:justify-self-end">
              <p data-num={c.n} className="display relative z-10 text-[7.5rem] leading-[1.02] tabular-nums md:text-[clamp(9rem,17vw,19rem)]">
                {c.n}
              </p>
            </div>
            <div data-photo className="order-1 relative z-0 aspect-[4/5] w-[58vw] max-w-[22rem] overflow-hidden rounded-tile bg-ink-2 md:order-2 md:w-[min(25vw,52vh)] md:max-w-none">
              <div data-photo-inner className="absolute inset-0">
                <Photo src={c.src} alt={c.alt} fill sizes="(min-width: 768px) 26vw, 58vw" className="object-cover" />
              </div>
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/70 to-transparent md:hidden" />
            </div>
            <div data-copy className="order-3 max-w-[18rem] text-center md:justify-self-start md:text-left">
              <p className="accent text-[2rem] leading-tight md:text-[3rem]">{c.label}</p>
              <p className="mt-1.5 text-[0.9375rem] text-cream/75 md:mt-3 md:text-[1.0625rem]">{c.line}</p>
              <p className="eyebrow mt-4 flex items-center justify-center gap-3 text-cream/70 md:justify-start">
                0{i + 1}
                <span className="relative block h-px w-16 bg-cream/25">
                  <span data-tick className="absolute inset-0 origin-left bg-brass" />
                </span>
                04
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { Placeholder } from "@/components/ui/Placeholder";
import { useScene } from "@/lib/use-scene";

type Part = string | { src: string; alt: string };

const parts: Part[] = [
  "Chiaro is Italian for light.",
  { src: "/images/menu/croissant-almond.webp", alt: "Almond croissants" },
  "Flaky croissants sit next to zaatar manakish.",
  { src: "/images/menu/zaatar-manakish.webp", alt: "Zaatar manakish" },
  "Espresso shares a page with cocktails.",
  { src: "/images/menu/chiaro-martini.webp", alt: "A martini" },
  "Pull up a chair and take your time.",
];

// Each word lights up as you scroll, while tiny photos open up inside the sentence.
export function Statement() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=170%", scrub: 0.4, pin: true, anticipatePin: 1 } });
    q("[data-piece]").forEach((p: HTMLElement, i: number) => {
      if (p.dataset.piece === "img") tl.from(p, { width: 0, scale: 0, rotate: -30, ease: "back.out(2)", duration: 3 }, i * 0.45);
      else tl.fromTo(p, { opacity: 0.14 }, { opacity: 1, ease: "none", duration: 1 }, i * 0.45);
    });
    tl.to(q("[data-spinner]"), { rotate: 360, ease: "none", duration: tl.duration() }, 0);
  });

  return (
    <section ref={root} id="about" aria-label="About Chiaro" className="relative flex min-h-[100svh] items-center overflow-hidden bg-butter px-4 py-24 md:px-8">
      <svg data-spinner aria-hidden viewBox="0 0 200 200" className="absolute -right-16 -top-16 w-52 text-marmalade md:-right-14 md:-top-14 md:w-64">
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="94" y="6" width="12" height="44" rx="6" fill="currentColor" transform={`rotate(${i * 30} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="40" fill="currentColor" />
      </svg>
      <div className="relative mx-auto max-w-[76rem]">
        <p className="eyebrow mb-5">About</p>
        <h2 className="display text-[clamp(2.5rem,6.6vw,6.5rem)] leading-[1.02]">
          {parts.map((p, i) =>
            typeof p === "string" ? (
              p.split(" ").map((w, j) => (
                <span key={`${i}-${j}`} data-piece="word" className="inline-block whitespace-pre">
                  {w}{" "}
                </span>
              ))
            ) : (
              <span key={p.src} data-piece="img" className="sticker relative mx-1 inline-block h-[0.82em] w-[1.15em] rotate-[-5deg] align-[-0.08em] [border-width:3px]">
                <Photo src={p.src} alt={p.alt} fill sizes="130px" className="object-cover" />
              </span>
            ),
          )}
        </h2>
        <p className="mt-8">
          <Placeholder>[BRAND STORY: founders and history, from the café]</Placeholder>
        </p>
      </div>
    </section>
  );
}

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

// Each word lights up as you scroll, while small photos open inside the sentence.
export function Statement() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=170%", scrub: 0.6, pin: true, anticipatePin: 1 } });
    q("[data-piece]").forEach((p: HTMLElement, i: number) => {
      if (p.dataset.piece === "img") tl.from(p, { width: 0, opacity: 0, ease: "power3.out", duration: 3 }, i * 0.45);
      else tl.fromTo(p, { opacity: 0.16 }, { opacity: 1, ease: "none", duration: 1 }, i * 0.45);
    });
  });

  return (
    <section ref={root} id="about" aria-label="About Chiaro" className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream px-4 py-24 md:px-8">
      <div className="relative mx-auto w-full max-w-[76rem]">
        <p className="eyebrow mb-6 text-roast">About</p>
        <h2 className="serif text-[clamp(2.375rem,6vw,5.75rem)] font-normal leading-[1.1] tracking-[-0.01em]">
          {parts.map((p, i) =>
            typeof p === "string" ? (
              p.split(" ").map((w, j) => (
                <span key={`${i}-${j}`} data-piece="word" className="inline-block whitespace-pre">
                  {w}{" "}
                </span>
              ))
            ) : (
              <span key={p.src} data-piece="img" className="sticker relative mx-1 inline-block h-[0.74em] w-[1.2em] align-[-0.04em]">
                <Photo src={p.src} alt={p.alt} fill sizes="120px" className="object-cover" />
              </span>
            ),
          )}
        </h2>
        <p className="mt-8 text-roast">
          <Placeholder>[BRAND STORY: founders and history, from the café]</Placeholder>
        </p>
      </div>
    </section>
  );
}

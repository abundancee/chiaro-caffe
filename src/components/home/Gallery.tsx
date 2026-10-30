"use client";

import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { Placeholder } from "@/components/ui/Placeholder";
import { useScene } from "@/lib/use-scene";

const tiles = [
  { src: "/images/site/gallery-pour.webp", alt: "Espresso running from a machine into a cup", x: -60, y: 50, r: -14 },
  { src: "/images/site/gallery-mojito.webp", alt: "A mojito with mint and dried orange", x: 0, y: 60, r: 9 },
  { src: null, alt: "", x: 60, y: 40, r: 12 },
  { src: "/images/site/gallery-cup.webp", alt: "A black cup of coffee with latte art", x: -70, y: -30, r: 10 },
  { src: "/images/site/gallery-prawns.webp", alt: "Sautéed prawns in a dark bowl", x: 0, y: -40, r: -8 },
  { src: "/images/site/gallery-hookah.webp", alt: "A row of hookahs on a warmly lit bar", x: 70, y: -50, r: -12 },
];

// Tiles start scattered and tilted, then click together into a tidy wall as you scroll.
export function Gallery() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", end: "center 55%", scrub: 0.6 } });
    el.querySelectorAll<HTMLElement>("[data-tile]").forEach((t, i) => {
      const c = tiles[i];
      tl.from(t, { xPercent: c.x * 1.6, yPercent: c.y * 1.6, rotate: c.r * 2, scale: 0.45, ease: "power2.out" }, 0);
    });
    gsap.from(el.querySelector("[data-big]"), { fontStretch: "50%", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 25%", scrub: true } });
  });
  return (
    <section ref={root} aria-labelledby="gallery-title" className="overflow-hidden bg-blush px-4 py-20 md:px-8 md:py-28">
      <h2 id="gallery-title" data-big className="display text-center text-[17vw] md:text-[10vw]">
        The mood
      </h2>
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-2 md:mt-14 md:gap-4">
        {tiles.map((t) => (
          <div key={t.src ?? "space"} data-tile className="relative aspect-square overflow-hidden rounded-tile border-2 border-ink bg-butter">
            {t.src ? (
              <Photo src={t.src} alt={t.alt} fill sizes="(min-width: 768px) 260px, 32vw" className="object-cover transition-transform duration-500 hover:scale-110" />
            ) : (
              <div className="flex h-full items-center justify-center p-2 text-center">
                <Placeholder className="!text-[0.6875rem] md:!text-[0.8125rem]">[PHOTOS OF THE SPACE]</Placeholder>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

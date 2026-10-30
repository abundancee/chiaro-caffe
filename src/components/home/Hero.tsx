"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/ui/Photo";
import { useScene } from "@/lib/use-scene";
import { site } from "@/data/site";

const letters = "CHIARO".split("");

const photos = [
  { src: "/images/menu/croissant-plain.webp", alt: "Two golden croissants", pos: "left-[4%] top-[15%] w-[24vw] md:left-[6%] md:top-[17%] md:w-[10vw]", depth: 1.2 },
  { src: "/images/menu/cappuccino.webp", alt: "A cappuccino", pos: "right-[4%] top-[20%] w-[20vw] md:right-[8%] md:top-[15%] md:w-[8vw]", depth: 0.8 },
  { src: "/images/menu/chiaro-martini.webp", alt: "A martini", pos: "left-[34%] top-[33%] w-[17vw] md:left-[30%] md:top-[11%] md:w-[7vw]", depth: 1.4 },
];

// The sun sets behind the name, the letters part, and the page falls into the day.
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=85%", scrub: 0.7, pin: true, anticipatePin: 1 } });
    tl.to(q("[data-sun]"), { yPercent: 60, scale: 1.25, ease: "none" }, 0).to(q("[data-copy]"), { y: -40, autoAlpha: 0, ease: "none", duration: 0.4 }, 0);
    q<HTMLElement>("[data-letter]").forEach((l, i) => {
      const fromCentre = i - 2.5;
      tl.to(l, { xPercent: fromCentre * 26, yPercent: -Math.abs(fromCentre) * 8, fontStretch: "92%", ease: "none" }, 0);
    });
    q<HTMLElement>("[data-photo]").forEach((p) => {
      tl.to(p, { y: -360 * Number(p.dataset.depth), ease: "none" }, 0);
    });
  });

  return (
    <section ref={root} aria-label="Welcome" className="on-dark relative flex h-[100svh] min-h-[36rem] flex-col justify-end overflow-hidden bg-ink pb-20 text-cream md:pb-10">
      <div data-sun aria-hidden className="absolute left-[9vw] top-[16%] size-[82vw] md:left-[31vw] md:top-[9%] md:size-[38vw]">
        <div className="sun-up size-full rounded-full bg-terracotta" />
      </div>

      {photos.map((p, i) => (
        <div key={p.src} data-photo data-depth={p.depth} className={`absolute z-20 ${p.pos}`}>
          <div className="pop sticker aspect-[4/5]" style={{ ["--d" as string]: `${0.3 + i * 0.1}s` }}>
            <Photo src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 12vw, 24vw" className="object-cover" />
          </div>
        </div>
      ))}

      <h1 aria-label={`${site.name}. ${site.tagline}`} className="relative z-10 flex w-full justify-center overflow-hidden">
        {letters.map((l, i) => (
          <span key={i} aria-hidden data-letter className="display inline-block text-[37vw] leading-[0.98] md:text-[29vw]">
            <span className="rise" style={{ ["--d" as string]: `${i * 0.05}s` }}>
              {l}
            </span>
          </span>
        ))}
      </h1>

      <div data-copy className="relative z-30 mx-auto mt-5 flex w-full max-w-[110rem] flex-col gap-5 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <p className="serif text-[2.125rem] leading-[1.08] md:text-[clamp(2.25rem,3.4vw,3.5rem)]">
          From first <span className="italic">croissant</span>
          <br />
          to last <span className="italic">cocktail.</span>
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/menu" className="btn bg-cream text-ink">
            View menu <ArrowRightIcon size={18} aria-hidden />
          </Link>
          <Link href="/#visit" className="border-b border-cream/60 pb-0.5 transition-colors hover:border-cream">
            Find us
          </Link>
        </div>
      </div>
    </section>
  );
}

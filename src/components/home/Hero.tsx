"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getImageProps } from "next/image";
import blurMap from "@/data/image-blur.json";
import { useScene } from "@/lib/use-scene";
import { site } from "@/data/site";

const lines = [
  <>From first <em className="accent">croissant</em>{" "}</>,
  <>to last <em className="accent">cocktail.</em></>,
];

const alt = "A glass of espresso caught in low golden light on a dark table";
const { props: wideProps } = getImageProps({ src: "/images/site/hero.webp", alt, width: 2400, height: 1600, sizes: "100vw" });
const { props: tallProps } = getImageProps({ src: "/images/site/hero-mobile.webp", alt, width: 1000, height: 1600, sizes: "100vw" });
const blur = (blurMap as Record<string, string>)["/images/site/hero-mobile.webp"];

// Full-bleed at first. On scroll the photo draws back into a framed picture while the name rises beneath it.
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=110%", scrub: 0.9, pin: true, anticipatePin: 1 } });
    tl.fromTo(
      q("[data-frame]"),
      { clipPath: "inset(0% 0% 0% 0%)" },
      { clipPath: wide ? "inset(13% 33% 25% 33%)" : "inset(13% 17% 33% 17%)", ease: "power2.inOut", duration: 1 },
      0,
    )
      .fromTo(q("[data-image]"), { scale: 1.14, xPercent: 0 }, { scale: 1, xPercent: wide ? -12 : 0, ease: "power2.inOut", duration: 1 }, 0)
      .to(q("[data-scrim]"), { opacity: 0, ease: "none", duration: 0.5 }, 0.1)
      .to(q("[data-copy]"), { y: -50, autoAlpha: 0, ease: "power1.in", duration: 0.32 }, 0)
      .fromTo(q("[data-word]"), { yPercent: 105 }, { yPercent: 0, ease: "power3.out", duration: 0.6, stagger: 0.035 }, 0.42)
      .fromTo(q("[data-caption]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.72);
  });

  return (
    <section ref={root} aria-label="Welcome" className="on-dark relative h-[100svh] min-h-[36rem] overflow-hidden bg-ink text-cream">
      {/* Revealed behind the shrinking frame */}
      <div className="absolute inset-x-0 bottom-[9%] flex flex-col items-center md:bottom-[3%]">
        <p aria-hidden data-caption className="eyebrow invisible mb-2 text-brass md:mb-1">
          {site.address.area}, {site.address.city}
        </p>
        <p aria-hidden className="flex overflow-hidden">
          {"Chiaro".split("").map((l, i) => (
            <span key={i} data-word className="display inline-block text-[27vw] leading-[1.08] md:text-[17vw]">
              {l}
            </span>
          ))}
        </p>
      </div>

      <div data-frame className="absolute inset-0 overflow-hidden">
        <div data-image className="absolute inset-0">
          <div className="drift absolute inset-0">
            <picture>
              <source media="(min-width: 768px)" srcSet={wideProps.srcSet} sizes="100vw" />
              <source srcSet={tallProps.srcSet} sizes="100vw" />
              <img src={tallProps.src} alt={alt} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" style={{ backgroundImage: `url(${blur})`, backgroundSize: "cover" }} />
            </picture>
          </div>
        </div>
        <div data-scrim aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/15 to-ink/45" />
      </div>

      <div data-copy className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[110rem] flex-col gap-7 px-4 pb-22 md:flex-row md:items-end md:justify-between md:px-8 md:pb-12">
        <div>
          <p className="pop eyebrow mb-5 text-cream/85" style={{ ["--d" as string]: "0.1s" }}>
            {site.address.area}, {site.address.city}
          </p>
          <h1 className="display text-[3.25rem] leading-[1.04] md:text-[clamp(4rem,7.4vw,8.5rem)]">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span className="rise" style={{ ["--d" as string]: `${0.15 + i * 0.12}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>
        <div className="pop flex shrink-0 flex-wrap items-center gap-7 md:pb-3" style={{ ["--d" as string]: "0.55s" }}>
          <Link href="/menu" className="btn bg-cream text-ink">
            View menu <ArrowRightIcon size={16} aria-hidden />
          </Link>
          <Link href="/#visit" className="border-b border-cream/50 pb-1 text-[0.8125rem] uppercase tracking-[0.18em] transition-colors hover:border-cream">
            Find us
          </Link>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 right-8 hidden h-14 w-px overflow-hidden bg-cream/20 md:block">
        <span className="scroll-cue block size-full bg-cream" />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/data/site";

// The photo starts full-bleed, then settles into the arch from the logo as you scroll.
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=70%", scrub: 0.4, pin: true, anticipatePin: 1 },
        });
        tl.to(copy.current, { autoAlpha: 0, y: -28, duration: 0.45, ease: "none" }, 0).fromTo(
          frame.current,
          { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)" },
          { clipPath: "inset(14% 14% 12% 14% round 400px 400px 8px 8px)", duration: 1, ease: "none" },
          0,
        );
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <section ref={root} aria-label="Welcome" className="on-dark relative h-[100svh] min-h-[34rem] overflow-hidden bg-espresso text-oat">
      <div ref={frame} className="absolute inset-0">
        <Photo
          src="/images/site/hero.webp"
          alt="Coffee pouring into a dark cup, lit against a black background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_60%] md:object-[50%_52%]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-espresso/90 via-espresso/45 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-espresso/60 to-transparent" />
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-espresso/80 via-espresso/45 to-transparent md:block" />
      </div>
      <div ref={copy} className="relative mx-auto flex h-full max-w-[110rem] flex-col justify-end px-4 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-8 md:pb-14">
        <h1 className="max-w-[13ch] text-display md:text-[clamp(3.5rem,6.6vw,7.5rem)]">{site.tagline}</h1>
        <p className="mt-4 text-[0.9375rem] text-oat/85 md:text-lg">
          {site.address.street}, {site.address.area}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6 md:mt-8">
          <Link
            href="/menu"
            className="inline-flex h-13 items-center gap-3 rounded-card bg-oat px-6 font-medium text-espresso transition-colors hover:bg-white"
          >
            View menu <ArrowRightIcon size={18} aria-hidden />
          </Link>
          <Link href="/#visit" className="border-b border-oat/70 pb-0.5 transition-colors hover:border-oat">
            Find us
          </Link>
        </div>
      </div>
    </section>
  );
}

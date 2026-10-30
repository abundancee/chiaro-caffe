"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/ui/Photo";
import { Mascot } from "@/components/ui/Mascot";
import { useScene } from "@/lib/use-scene";
import { site } from "@/data/site";

const letters = "CHIARO".split("");

const stickers = [
  { src: "/images/menu/croissant-plain.webp", alt: "Two golden croissants", pos: "left-[3%] top-[14%] w-[23vw] md:left-[5%] md:top-[17%] md:w-[10vw]", rot: -9, depth: 1.3 },
  { src: "/images/menu/cappuccino.webp", alt: "A cappuccino", pos: "right-[4%] top-[12%] w-[21vw] md:right-[7%] md:top-[15%] md:w-[9vw]", rot: 8, depth: 0.8 },
  { src: "/images/menu/strawberry-margarita.webp", alt: "A strawberry margarita", pos: "left-[6%] top-[34%] w-[21vw] md:left-auto md:right-[2.5%] md:top-[38%] md:w-[9vw]", rot: -7, depth: 1.5 },
  { src: "/images/menu/margherita-perfection.webp", alt: "A margherita pizza", pos: "left-[42%] top-[11%] hidden w-[8vw] md:left-[20%] md:top-[12%] md:block", rot: 6, depth: 1 },
  { src: "/images/menu/zaatar-manakish.webp", alt: "Zaatar manakish", pos: "left-[2.5%] top-[42%] hidden w-[8vw] md:block", rot: 11, depth: 1.1 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top top", end: "+=75%", scrub: 0.5, pin: true, anticipatePin: 1 },
    });
    // The sun sinks, letters burst apart at different speeds and stretch, stickers fly off.
    tl.to(q("[data-sun]"), { yPercent: 75, scale: 1.5, ease: "none" }, 0)
      .to(el, { backgroundColor: "#f8d778", ease: "none" }, 0)
      .to(q("[data-copy]"), { y: -60, autoAlpha: 0, ease: "none", duration: 0.45 }, 0);
    q<HTMLElement>("[data-letter]").forEach((l, i) => {
      tl.to(l, { yPercent: (i % 2 ? -1 : 1) * (70 + i * 16), rotate: (i - 2.5) * 7, fontStretch: "125%", ease: "none" }, 0);
    });
    q<HTMLElement>("[data-sticker]").forEach((s, i) => {
      const d = Number(s.dataset.depth);
      tl.to(s, { x: (i % 2 ? 1 : -1) * 220 * d, y: -240 * d, rotate: (i % 2 ? 40 : -40), ease: "none" }, 0);
    });

    // Stickers lean toward the pointer on desktop.
    if (window.matchMedia("(pointer: fine)").matches) {
      const setters = q<HTMLElement>("[data-sticker-inner]").map((s) => ({
        x: gsap.quickTo(s, "x", { duration: 0.8, ease: "power3" }),
        y: gsap.quickTo(s, "y", { duration: 0.8, ease: "power3" }),
        d: Number(s.dataset.depth),
      }));
      const move = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(px * 46 * s.d);
          s.y(py * 46 * s.d);
        });
      };
      el.addEventListener("pointermove", move);
    }
  });

  return (
    <section ref={root} aria-label="Welcome" className="relative flex h-[100svh] min-h-[38rem] flex-col justify-end overflow-hidden bg-cream pb-24 md:pb-10">
      <div data-sun aria-hidden className="absolute left-[4vw] top-[9%] size-[92vw] md:left-[27vw] md:top-[6%] md:size-[46vw]">
        <div className="sun-up size-full rounded-full bg-marmalade" />
      </div>

      {stickers.map((s, i) => (
        <div key={s.src} data-sticker data-depth={s.depth} className={`absolute z-20 ${s.pos}`}>
          <div data-sticker-inner data-depth={s.depth}>
            <div className="pop sticker aspect-square" style={{ rotate: `${s.rot}deg`, ["--d" as string]: `${0.25 + i * 0.09}s` }}>
              <Photo src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 12vw, 24vw" className="object-cover" />
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-20 mx-auto -mb-[3vw] w-fit translate-x-[24vw] md:-mb-[2vw] md:translate-x-[20vw]">
        <div className="pop" style={{ ["--d" as string]: "0.55s" }}>
          <Mascot className="bob w-[21vw] md:w-[8vw]" />
        </div>
      </div>

      <h1 aria-label={`${site.name}. ${site.tagline}`} className="relative z-10 flex w-full justify-center overflow-hidden pb-[1vw] pt-2">
        {letters.map((l, i) => (
          <span key={i} aria-hidden data-letter className="display inline-block cursor-default text-[28.5vw] leading-[0.95] transition-[font-stretch] duration-300 hover:[font-stretch:92%] md:text-[25.5vw]">
            <span className="rise" style={{ ["--d" as string]: `${i * 0.055}s` }}>
              {l}
            </span>
          </span>
        ))}
      </h1>

      <div data-copy className="relative z-30 mx-auto mt-4 flex w-full max-w-[100rem] flex-col gap-5 px-4 md:mt-2 md:flex-row md:items-end md:justify-between md:px-8">
        <p className="display max-w-[15ch] text-[2.5rem] md:max-w-none md:text-[clamp(2.25rem,4vw,4rem)]">
          From first <span className="accent text-[1.15em]">croissant</span>
          <br />
          to last <span className="accent text-[1.15em]">cocktail.</span>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/menu" className="btn bg-ink text-cream">
            View menu <ArrowRightIcon size={18} weight="bold" aria-hidden />
          </Link>
          <Link href="/#visit" className="btn bg-butter text-ink">
            Find us
          </Link>
        </div>
      </div>

      

      <p aria-hidden className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 text-[0.8125rem] font-semibold md:flex">
        Scroll for the day <ArrowDownIcon size={14} weight="bold" />
      </p>
    </section>
  );
}

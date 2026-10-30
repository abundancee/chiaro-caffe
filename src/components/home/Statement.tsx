"use client";

import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { Placeholder } from "@/components/ui/Placeholder";
import { useScene } from "@/lib/use-scene";

const story = "On Victoria Arobieke Street in Lekki Phase 1, flaky croissants sit next to zaatar manakish, and espresso shares a page with cocktails. Pull up a chair and take your time.";

function Layout({ dark = false }: { dark?: boolean }) {
  const hide = dark ? "invisible" : "";
  return (
    <div className="mx-auto grid h-full max-w-[110rem] content-center gap-y-7 px-4 pb-16 pt-20 md:grid-cols-12 md:gap-x-8 md:px-8 md:pb-10 md:pt-24">
      <div className="md:col-span-6 md:self-center">
        <p className={`eyebrow mb-5 ${dark ? "text-brass" : "text-roast"} ${hide}`}>About</p>
        <h2 aria-hidden={dark} className="display text-[3.875rem] leading-[1.02] md:text-[clamp(4.25rem,7.2vw,8.5rem)]">
          Chiaro is Italian for <em data-light={dark ? undefined : ""} className="accent">light.</em>
        </h2>
        <span data-rule className={`mt-6 block h-px w-full origin-left bg-brass md:mt-9 ${hide}`} />
        <p className={`mt-5 max-w-xl text-[1.0625rem] leading-relaxed md:mt-7 md:text-[1.25rem] ${hide}`}>
          {story.split(" ").map((w, i) => (
            <span key={i} data-story={dark ? undefined : ""} className="inline-block whitespace-pre">
              {w}{" "}
            </span>
          ))}
        </p>
        <p className={`mt-4 text-roast ${hide}`}>
          <Placeholder>[BRAND STORY: founders and history, from the café]</Placeholder>
        </p>
      </div>
      <div className={`grid grid-cols-[1.15fr_1fr] items-start gap-3 md:col-span-5 md:col-start-8 md:gap-6 ${hide}`}>
        {[
          { src: "/images/site/about-first.webp", alt: "A golden croissant on a black plate", cap: "First croissant" },
          { src: "/images/site/about-last.webp", alt: "A cocktail wrapped in smoke, in low light", cap: "Last cocktail", offset: "mt-8 md:mt-20" },
        ].map((p) => (
          <figure key={p.src} className={p.offset}>
            <div data-photo={dark ? undefined : ""} className="sticker aspect-[4/5]">
              {!dark && (
                <div data-photo-inner className="absolute inset-0">
                  <Photo src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 22vw, 44vw" className="object-cover" />
                </div>
              )}
            </div>
            <figcaption className="accent mt-1.5 text-[1.0625rem] text-roast md:text-[1.25rem]">{p.cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

// The room starts dark. Light spreads out from the word "light", then the story and photos appear.
export function Statement() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    const dark = q<HTMLElement>("[data-dark-layer]")[0];
    const lit = q<HTMLElement>("[data-lit-layer]")[0];
    const word = q<HTMLElement>("[data-light]")[0];
    dark.style.visibility = "visible";
    const origin = () => {
      const a = word.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      return `${a.left - b.left + a.width / 2}px ${a.top - b.top + a.height / 2}px`;
    };
    const at = origin();
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=190%", scrub: 0.8, pin: true, anticipatePin: 1 } });
    tl.fromTo(lit, { clipPath: `circle(0px at ${at})` }, { clipPath: `circle(${Math.hypot(window.innerWidth, window.innerHeight) * 1.05}px at ${at})`, ease: "power2.in", duration: 1.5 }, 0.15)
      .fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "power2.inOut", duration: 0.8 }, 1.5);
    q<HTMLElement>("[data-photo]").forEach((p, i) => {
      tl.fromTo(p, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.out", duration: 1 }, 1.65 + i * 0.25);
      tl.fromTo(p.querySelector("[data-photo-inner]"), { scale: 1.3 }, { scale: 1, ease: "power3.out", duration: 1.25 }, 1.65 + i * 0.25);
    });
    q<HTMLElement>("[data-story]").forEach((w, i) => {
      tl.fromTo(w, { opacity: 0.12 }, { opacity: 1, ease: "none", duration: 0.25 }, 1.75 + i * 0.04);
    });
  });

  return (
    <section ref={root} id="about" aria-label="About Chiaro" className="relative min-h-[100svh] overflow-hidden bg-ink">
      <div data-dark-layer aria-hidden className="invisible absolute inset-0 bg-ink text-cream">
        <Layout dark />
      </div>
      <div data-lit-layer className="relative min-h-[100svh] bg-cream text-ink">
        <Layout />
      </div>
    </section>
  );
}

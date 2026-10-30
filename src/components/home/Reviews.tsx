"use client";

import { useRef } from "react";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { Mascot } from "@/components/ui/Mascot";
import { useScene } from "@/lib/use-scene";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} size={18} weight={n <= Math.round(rating) ? "fill" : "duotone"} aria-hidden />
      ))}
    </span>
  );
}

const notes = ["bg-butter -rotate-3", "bg-blush rotate-2", "bg-pistachio -rotate-1", "bg-paper rotate-3"];

export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const reviews = site.reviews;
  const average = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : null;
  useScene(root, ({ gsap }, el) => {
    gsap.from(el.querySelectorAll("[data-note]"), { y: 120, rotate: 12, opacity: 0, stagger: 0.12, ease: "back.out(1.6)", duration: 0.9, scrollTrigger: { trigger: el, start: "top 70%" } });
  });
  return (
    <section ref={root} id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-cream px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="reviews-title" className="display text-[3.25rem] md:text-[6rem]">
            Kind <span className="accent">words</span>
          </h2>
          {average !== null && (
            <p className="flex items-center gap-3">
              <span className="display text-[3rem]">{average.toFixed(1)}</span>
              <span>
                <Stars rating={average} />
                <span className="text-[0.875rem] font-medium">{reviews.length} reviews</span>
              </span>
            </p>
          )}
        </div>
        {reviews.length > 0 ? (
          <ul className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
            {reviews.map((r, i) => (
              <li key={`${r.name}-${i}`} data-note className={`mb-6 break-inside-avoid rounded-tile border-2 border-ink p-6 shadow-hard ${notes[i % notes.length]}`}>
                <Stars rating={r.rating} />
                <p className="mt-3 font-serif text-[1.5rem] italic leading-snug">“{r.text}”</p>
                <p className="mt-3 font-bold">{r.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div data-note className="mt-10 flex max-w-2xl -rotate-1 items-center gap-5 rounded-tile border-2 border-dashed border-ink bg-butter p-5 md:p-8">
            <Mascot mood="wow" steam={false} className="w-20 shrink-0 md:w-28" />
            <div>
              <Placeholder>[CUSTOMER REVIEWS]</Placeholder>
              <p className="mt-3 font-medium">Real guest reviews and an overall rating go here. The current menu site doesn’t publish any.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

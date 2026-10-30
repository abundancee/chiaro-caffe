"use client";

import { useRef } from "react";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { useScene } from "@/lib/use-scene";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} size={16} weight={n <= Math.round(rating) ? "fill" : "light"} aria-hidden />
      ))}
    </span>
  );
}

export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const reviews = site.reviews;
  const average = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : null;
  useScene(root, ({ gsap }, el) => {
    gsap.from(el.querySelectorAll("[data-note]"), { y: 50, opacity: 0, stagger: 0.1, ease: "power3.out", duration: 1.1, scrollTrigger: { trigger: el, start: "top 70%" } });
  });
  return (
    <section ref={root} id="reviews" aria-labelledby="reviews-title" className="bg-cream px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[76rem]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <h2 id="reviews-title" className="display text-[4.5rem] md:text-[8rem]">
            Kind <span className="accent text-[0.85em]">words</span>
          </h2>
          {average !== null && (
            <p className="flex items-center gap-3">
              <span className="display text-[4rem]">{average.toFixed(1)}</span>
              <span>
                <Stars rating={average} />
                <span className="text-[0.875rem]">{reviews.length} reviews</span>
              </span>
            </p>
          )}
        </div>
        {reviews.length > 0 ? (
          <ul className="mt-10 columns-1 gap-8 md:columns-2 lg:columns-3">
            {reviews.map((r, i) => (
              <li key={`${r.name}-${i}`} data-note className="mb-8 break-inside-avoid border-t border-line pt-5">
                <Stars rating={r.rating} />
                <p className="serif mt-3 text-[1.5rem] italic leading-snug">“{r.text}”</p>
                <p className="mt-3 text-[0.9375rem]">{r.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div data-note className="mt-8 max-w-xl">
            <Placeholder>[CUSTOMER REVIEWS]</Placeholder>
            <p className="mt-3 text-roast">Real guest reviews and an overall rating go here. The current menu site doesn’t publish any.</p>
          </div>
        )}
      </div>
    </section>
  );
}

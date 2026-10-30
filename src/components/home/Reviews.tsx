import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} size={16} weight={n <= Math.round(rating) ? "fill" : "regular"} aria-hidden />
      ))}
    </span>
  );
}

export function Reviews() {
  const reviews = site.reviews;
  const average = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : null;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="mx-auto max-w-[110rem] px-4 py-20 md:px-8 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow text-roast">Reviews</p>
          <h2 id="reviews-title" className="mt-3 text-title">
            What guests say.
          </h2>
        </div>
        {average !== null && (
          <div className="flex items-center gap-3">
            <span className="font-display text-title leading-none">{average.toFixed(1)}</span>
            <span>
              <Stars rating={average} />
              <span className="mt-1 block text-[0.875rem] text-roast">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>
            </span>
          </div>
        )}
      </Reveal>
      {reviews.length > 0 ? (
        <ul className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <li key={`${r.name}-${r.text.slice(0, 20)}`} className="mb-6 break-inside-avoid rounded-card bg-paper p-6 shadow-card">
              <Stars rating={r.rating} />
              <p className="mt-4 font-display text-[1.375rem] leading-snug">“{r.text}”</p>
              <p className="mt-4 text-[0.9375rem] text-roast">{r.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <Reveal className="mt-10 rounded-card border border-dashed border-taupe p-6 md:p-10">
          <Placeholder>[CUSTOMER REVIEWS]</Placeholder>
          <p className="mt-4 max-w-prose text-roast">
            Real guest reviews and an overall rating will appear here once they are added. The current menu site does not publish any.
          </p>
        </Reveal>
      )}
    </section>
  );
}

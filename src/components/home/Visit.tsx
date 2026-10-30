"use client";

import { useRef } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { dayLabels, directionsUrl, fullAddress, mapEmbedUrl, site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { useScene } from "@/lib/use-scene";

export function Visit() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    gsap.from(q("[data-map]"), { y: 80, scale: 0.92, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "center 60%", scrub: 0.7 } });
    gsap.from(q("[data-row]"), { y: 16, opacity: 0, stagger: 0.05, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: q("table")[0], start: "top 85%" } });
  });
  return (
    <section ref={root} id="visit" aria-labelledby="visit-title" className="on-dark relative overflow-hidden bg-wine px-4 py-20 text-cream md:px-8 md:py-32">
      <div className="relative mx-auto grid max-w-[76rem] gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <h2 id="visit-title" className="display text-[4.25rem] md:text-[7.5rem]">
            Find <span className="accent text-brass">us</span>
          </h2>
          <address className="mt-5 not-italic">
            <p className="serif text-[1.625rem] leading-snug">{fullAddress}</p>
            <a href={`tel:${site.phoneInternational}`} className="mt-3 inline-block border-b border-cream/50 pb-0.5 hover:border-cream">
              {site.phone}
            </a>
          </address>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn mt-6 bg-cream text-ink">
            Get directions <ArrowUpRightIcon size={18} aria-hidden />
            <span className="sr-only">(opens Google Maps)</span>
          </a>
          <table className="mt-10 w-full max-w-md text-left">
            <caption className="eyebrow mb-3 text-left text-brass">Opening hours</caption>
            <tbody>
              {dayLabels.map(({ key, label }) => {
                const h = site.hours?.[key];
                return (
                  <tr key={key} data-row className="border-t border-line-dark">
                    <th scope="row" className="py-2 font-normal">
                      {label}
                    </th>
                    <td className="py-2 text-right tabular-nums">{site.hours ? (h ? `${h.open} to ${h.close}` : "Closed") : <Placeholder>[HOURS]</Placeholder>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div data-map className="relative aspect-square max-h-[32rem] w-full overflow-hidden rounded-tile">
          <iframe title={`Map showing ${site.name} at ${fullAddress}`} src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
        </div>
      </div>
    </section>
  );
}

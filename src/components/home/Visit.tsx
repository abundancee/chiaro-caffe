"use client";

import { useRef } from "react";
import { ArrowUpRightIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import { dayLabels, directionsUrl, fullAddress, mapEmbedUrl, site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { useScene } from "@/lib/use-scene";

const stars = [[6, 12], [14, 58], [22, 30], [33, 8], [41, 72], [52, 22], [63, 84], [72, 14], [83, 46], [93, 26], [88, 78], [27, 88]];

export function Visit() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ gsap }, el) => {
    const q = gsap.utils.selector(el);
    gsap.from(q("[data-map]"), { rotate: 8, y: 90, scale: 0.86, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "center 60%", scrub: 0.5 } });
    gsap.from(q("[data-row]"), { x: -40, opacity: 0, stagger: 0.05, duration: 0.5, scrollTrigger: { trigger: q("table")[0], start: "top 85%" } });
  });
  return (
    <section ref={root} id="visit" aria-labelledby="visit-title" className="on-dark relative overflow-hidden bg-wine px-4 py-20 text-cream md:px-8 md:py-28">
      {stars.map(([x, y], i) => (
        <span key={i} aria-hidden className="twinkle absolute size-1.5 rounded-full bg-butter" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.27}s` }} />
      ))}
      <div className="relative mx-auto grid max-w-[80rem] gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <h2 id="visit-title" className="display text-[3.75rem] md:text-[6.5rem]">
            Come <span className="accent text-butter">find us</span>
          </h2>
          <address className="mt-6 not-italic">
            <p className="text-xl font-medium">{fullAddress}</p>
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn bg-butter text-ink">
              Get directions <ArrowUpRightIcon size={18} weight="bold" aria-hidden />
              <span className="sr-only">(opens Google Maps)</span>
            </a>
            <a href={`tel:${site.phoneInternational}`} className="btn bg-cream text-ink">
              <PhoneCallIcon size={20} weight="duotone" aria-hidden /> {site.phone}
            </a>
          </div>
          <table className="mt-10 w-full max-w-md text-left">
            <caption className="eyebrow mb-3 text-left">Opening hours</caption>
            <tbody>
              {dayLabels.map(({ key, label }) => {
                const h = site.hours?.[key];
                return (
                  <tr key={key} data-row className="border-t border-cream/25">
                    <th scope="row" className="py-2 font-medium">
                      {label}
                    </th>
                    <td className="py-2 text-right tabular-nums">{site.hours ? (h ? `${h.open} to ${h.close}` : "Closed") : <Placeholder>[HOURS]</Placeholder>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div data-map className="relative aspect-square max-h-[32rem] w-full overflow-hidden rounded-tile border-[6px] border-paper shadow-[10px_10px_0_#00000066] md:-rotate-2">
          <iframe title={`Map showing ${site.name} at ${fullAddress}`} src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
        </div>
      </div>
    </section>
  );
}

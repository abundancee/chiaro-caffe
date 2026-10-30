import { ArrowUpRightIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import { dayLabels, directionsUrl, fullAddress, mapEmbedUrl, site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="mx-auto grid max-w-[110rem] gap-10 px-4 py-20 md:grid-cols-12 md:gap-8 md:px-8 md:py-32">
      <div className="md:col-span-5">
        <Reveal>
          <p className="text-eyebrow text-roast">Visit</p>
          <h2 id="visit-title" className="mt-3 text-title">
            Find us in Lekki.
          </h2>
          <address className="mt-8 space-y-4 not-italic">
            <p className="flex gap-3 text-lg">
              <MapPinIcon size={22} className="mt-1 shrink-0 text-roast" aria-hidden />
              {fullAddress}
            </p>
            <p className="flex gap-3 text-lg">
              <PhoneIcon size={22} className="mt-1 shrink-0 text-roast" aria-hidden />
              <a href={`tel:${site.phoneInternational}`} className="underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </p>
          </address>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex h-13 items-center gap-3 rounded-card bg-espresso px-6 text-oat transition-colors hover:bg-espresso-2">
            Get directions <ArrowUpRightIcon size={18} aria-hidden />
            <span className="sr-only">(opens Google Maps)</span>
          </a>
        </Reveal>
        <Reveal className="mt-12">
          <h3 className="font-sans text-eyebrow text-roast">Opening hours</h3>
          <table className="mt-3 w-full border-t border-line text-left">
            <caption className="sr-only">Opening hours by day</caption>
            <tbody>
              {dayLabels.map(({ key, label }) => {
                const h = site.hours?.[key];
                return (
                  <tr key={key} className="border-b border-line">
                    <th scope="row" className="py-2.5 font-normal">
                      {label}
                    </th>
                    <td className="py-2.5 text-right tabular-nums">
                      {site.hours ? (h ? `${h.open} to ${h.close}` : "Closed") : <Placeholder>[HOURS]</Placeholder>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
      <Reveal className="md:col-span-7 md:col-start-6">
        <div className="relative aspect-square overflow-hidden rounded-card bg-oat-2 md:aspect-auto md:h-full md:min-h-[32rem]">
          <iframe
            title={`Map showing ${site.name} at ${fullAddress}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </Reveal>
    </section>
  );
}

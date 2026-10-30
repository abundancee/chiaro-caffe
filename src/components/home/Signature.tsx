"use client";

import { m } from "motion/react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice, itemBySlug, signatureSlugs, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

const layout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-32",
  "md:col-span-5",
  "md:col-span-7 md:mt-24",
  "md:col-span-6",
  "md:col-span-6 md:mt-20",
];

export function Signature() {
  const items = signatureSlugs.map(itemBySlug).filter(Boolean) as MenuItem[];
  const { open } = useItemSheet();
  return (
    <section aria-labelledby="signature-title" className="on-dark bg-espresso text-oat">
      <div className="mx-auto max-w-[110rem] px-4 py-20 md:px-8 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-eyebrow text-taupe-light">Signatures</p>
            <h2 id="signature-title" className="mt-3 max-w-[14ch] text-title">
              A few to start with.
            </h2>
          </div>
          <Link href="/menu" className="inline-flex items-center gap-2 border-b border-oat/60 pb-0.5 transition-colors hover:border-oat">
            See the full menu <ArrowRightIcon size={16} aria-hidden />
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {items.map((item, i) => (
            <li key={item.id} className={layout[i]}>
              <Reveal>
                <m.button type="button" onClick={() => open(item)} whileTap={{ scale: 0.99 }} className="group block w-full text-left">
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-card bg-espresso-2">
                    <Photo
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-subtitle">{item.name}</span>
                    <span className="shrink-0 tabular-nums text-oat/85">{formatPrice(item.price)}</span>
                  </span>
                  {item.description && <span className="mt-2 block max-w-prose text-oat/75">{item.description}</span>}
                </m.button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

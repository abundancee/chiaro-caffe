"use client";

import { m } from "motion/react";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { Photo } from "@/components/ui/Photo";

export function ItemCard({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  const { open } = useItemSheet();
  return (
    <m.button
      type="button"
      onClick={() => open(item)}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="group block w-full text-left"
    >
      <span className="relative block aspect-[4/5] overflow-hidden rounded-card bg-oat-2">
        <Photo
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes="(min-width: 1792px) 16vw, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 46vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {item.popular && <span className="absolute left-2 top-2 rounded-[3px] bg-oat px-2 py-0.5 text-[0.75rem] text-espresso">Popular</span>}
      </span>
      <span className="mt-2.5 block font-medium leading-snug underline-offset-4 group-hover:underline">{item.name}</span>
      {item.description && <span className="mt-1 line-clamp-2 block text-[0.875rem] leading-snug text-roast">{item.description}</span>}
      <span className="mt-1.5 block text-[0.9375rem] tabular-nums">{formatPrice(item.price)}</span>
    </m.button>
  );
}

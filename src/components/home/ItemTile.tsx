"use client";

import { m } from "motion/react";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { Photo } from "@/components/ui/Photo";

// Small tilted photo card used on the home page. Tapping opens the item sheet.
export function ItemTile({ item, rot = 0 }: { item: MenuItem; rot?: number }) {
  const { open } = useItemSheet();
  return (
    <m.button
      type="button"
      onClick={() => open(item)}
      style={{ rotate: rot }}
      whileHover={{ rotate: 0, scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 16 }}
      className="block w-full text-left"
    >
      <span className="sticker block aspect-square">
        <Photo src={item.image} alt={item.name} fill sizes="(min-width: 768px) 15vw, 40vw" className="object-cover" />
      </span>
      <span className="mt-2 block text-[0.9375rem] font-bold leading-tight">{item.name}</span>
      <span className="block text-[0.8125rem] font-medium tabular-nums opacity-85">{formatPrice(item.price)}</span>
    </m.button>
  );
}

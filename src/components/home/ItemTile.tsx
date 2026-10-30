"use client";

import { formatPrice, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { Photo } from "@/components/ui/Photo";

// Small photo card used on the home page. Tapping opens the item sheet.
export function ItemTile({ item }: { item: MenuItem }) {
  const { open } = useItemSheet();
  return (
    <button type="button" onClick={() => open(item)} className="group block w-full text-left">
      <span className="sticker block aspect-[4/5]">
        <Photo src={item.image} alt={item.name} fill sizes="(min-width: 768px) 14vw, 38vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
      </span>
      <span className="mt-2 block text-[0.9375rem] font-medium leading-tight underline-offset-4 group-hover:underline">{item.name}</span>
      <span className="block text-[0.8125rem] tabular-nums opacity-85">{formatPrice(item.price)}</span>
    </button>
  );
}

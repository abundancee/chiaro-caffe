"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { usePicks } from "@/lib/picks";
import { flyToBag } from "@/lib/fly";
import { Photo } from "@/components/ui/Photo";

// Tap the row for details, or tap + to add straight away and watch the photo fly into the list.
export function ItemRow({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  const { open } = useItemSheet();
  const { add, picks } = usePicks();
  const photo = useRef<HTMLSpanElement>(null);
  const inList = picks.filter((p) => p.itemId === item.id).reduce((n, p) => n + p.quantity, 0);
  const needsChoice = item.options?.some((o) => o.required);

  return (
    <m.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className="group relative flex h-full rounded-tile border-2 border-ink bg-paper shadow-hard-sm"
    >
      <button type="button" onClick={() => open(item)} className="flex min-w-0 flex-1 gap-3 rounded-[12px] p-2 pr-3 text-left">
        <span ref={photo} className="relative size-24 shrink-0 overflow-hidden rounded-[10px] bg-butter md:size-28">
          <Photo src={item.image} alt="" fill priority={priority} sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2" />
          {item.popular && <span className="absolute left-1 top-1 rounded-full border border-ink bg-butter px-1.5 text-[0.6875rem] font-bold">Popular</span>}
        </span>
        <span className="flex min-w-0 flex-1 flex-col py-0.5 pr-8">
          <span className="font-bold leading-tight">{item.name}</span>
          {item.description && <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-roast">{item.description}</span>}
          <span className="mt-auto pt-1 text-[0.9375rem] font-semibold tabular-nums">{formatPrice(item.price)}</span>
        </span>
      </button>
      <m.button
        type="button"
        whileTap={{ scale: 0.8, rotate: -20 }}
        aria-label={needsChoice ? `Choose options for ${item.name}` : `Add ${item.name} to my list`}
        onClick={() => {
          if (needsChoice) return open(item);
          flyToBag(photo.current);
          add(item, 1, {});
        }}
        className={`absolute bottom-2 right-2 flex size-11 items-center justify-center rounded-full border-2 border-ink font-bold transition-colors ${inList ? "bg-pistachio" : "bg-marmalade hover:bg-butter"}`}
      >
        {inList ? <span className="flex items-center text-[0.9375rem] tabular-nums"><CheckIcon size={13} weight="bold" aria-hidden />{inList}</span> : <PlusIcon size={20} weight="bold" aria-hidden />}
      </m.button>
    </m.div>
  );
}

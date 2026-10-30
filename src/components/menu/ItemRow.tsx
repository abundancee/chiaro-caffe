"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { usePicks } from "@/lib/picks";
import { flyToBag } from "@/lib/fly";
import { Photo } from "@/components/ui/Photo";

// Tap the row for details, or tap + to add straight away and watch the photo drift into the list.
export function ItemRow({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  const { open } = useItemSheet();
  const { add, picks } = usePicks();
  const photo = useRef<HTMLSpanElement>(null);
  const inList = picks.filter((p) => p.itemId === item.id).reduce((n, p) => n + p.quantity, 0);
  const needsChoice = item.options?.some((o) => o.required);

  return (
    <div className="group relative flex h-full border-b border-line">
      <button type="button" onClick={() => open(item)} className="flex min-w-0 flex-1 gap-3.5 py-3 text-left">
        <span ref={photo} className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-tile bg-sand md:size-28">
          <Photo src={item.image} alt="" fill priority={priority} sizes="112px" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col pr-12">
          <span className="text-[1.0625rem] font-medium leading-snug underline-offset-4 group-hover:underline">
            {item.name}
            {item.popular && <span className="accent ml-2 text-[0.9375rem] font-normal text-roast">Popular</span>}
          </span>
          {item.description && <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-roast">{item.description}</span>}
          <span className="mt-auto pt-1.5 text-[0.9375rem] tabular-nums">{formatPrice(item.price)}</span>
        </span>
      </button>
      <m.button
        type="button"
        whileTap={{ scale: 0.88 }}
        aria-label={needsChoice ? `Choose options for ${item.name}` : `Add ${item.name} to my list`}
        onClick={() => {
          if (needsChoice) return open(item);
          flyToBag(photo.current);
          add(item, 1, {});
        }}
        className={`absolute bottom-3 right-0 flex size-11 items-center justify-center rounded-full border transition-colors duration-300 ${inList ? "border-ink bg-ink text-cream" : "border-ink/50 hover:bg-ink hover:text-cream"}`}
      >
        {inList ? <span className="flex items-center gap-px text-[0.875rem] tabular-nums"><CheckIcon size={12} aria-hidden />{inList}</span> : <PlusIcon size={18} aria-hidden />}
      </m.button>
    </div>
  );
}

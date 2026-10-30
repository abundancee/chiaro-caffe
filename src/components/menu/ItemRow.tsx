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
          <span className="serif text-[1.3125rem] leading-[1.18] underline-offset-4 group-hover:underline md:text-[1.4375rem]">
            {item.name}
            {item.popular && <span className="accent ml-2 text-[0.9375rem] text-brass-ink">Popular</span>}
          </span>
          {item.description && <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-roast">{item.description}</span>}
          <span className="mt-auto pt-1.5 text-[0.875rem] tracking-[0.04em] tabular-nums">{formatPrice(item.price)}</span>
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
        className={`absolute bottom-3 right-0 flex size-11 items-center justify-center rounded-full border transition-colors duration-500 ${inList ? "border-brass bg-brass text-[#17120f]" : "border-line hover:border-brass hover:bg-brass hover:text-[#17120f]"}`}
      >
        {inList ? <span className="flex items-center gap-px text-[0.875rem] tabular-nums"><CheckIcon size={12} aria-hidden />{inList}</span> : <PlusIcon size={18} aria-hidden />}
      </m.button>
    </div>
  );
}

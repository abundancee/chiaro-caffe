"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { useModal } from "@/lib/use-modal";
import { SectionSticker } from "@/components/ui/SectionIcon";
import type { MenuCategory } from "@/data/menu";

// Every section on one screen, so nothing on the menu is more than two taps away.
export function SectionSheet({ categories, onPick, onClose }: { categories: MenuCategory[]; onPick: (id: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  let index = 0;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
      <m.div className="absolute inset-0 bg-ink/60" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="All menu sections"
        tabIndex={-1}
        data-lenis-prevent
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 34 }}
        className="relative max-h-[88dvh] w-full overflow-y-auto rounded-t-sheet border-2 border-ink bg-cream p-4 pb-8 outline-none md:max-w-3xl md:rounded-sheet md:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="display text-[2.25rem]">Jump to</h2>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close sections" className="flex size-11 items-center justify-center rounded-full bg-ink text-cream">
            <XIcon size={20} weight="bold" aria-hidden />
          </button>
        </div>
        {categories.map((c) => (
          <div key={c.id} className="mt-5">
            <h3 className="eyebrow font-sans">{c.name}</h3>
            <ul className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-5">
              {c.sections.map((s) => {
                const i = index++;
                return (
                  <m.li key={s.id} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.1 + i * 0.018 }}>
                    <button type="button" onClick={() => onPick(s.id)} className="flex h-full min-h-24 w-full flex-col items-center justify-center gap-1.5 rounded-tile border-2 border-ink bg-paper p-1.5 text-center text-[0.8125rem] font-bold capitalize leading-tight shadow-hard-sm active:translate-y-0.5">
                      <SectionSticker id={s.id} size={24} className="size-10" />
                      {s.name}
                    </button>
                  </m.li>
                );
              })}
            </ul>
          </div>
        ))}
      </m.div>
    </div>
  );
}

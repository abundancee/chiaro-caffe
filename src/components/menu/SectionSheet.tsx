"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { useModal } from "@/lib/use-modal";
import { SectionGlyph } from "@/components/ui/SectionIcon";
import type { MenuCategory } from "@/data/menu";

// Every section on one screen, so nothing on the menu is more than two taps away.
export function SectionSheet({ categories, onPick, onClose }: { categories: MenuCategory[]; onPick: (id: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
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
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[88dvh] w-full overflow-y-auto rounded-t-sheet bg-cream p-4 pb-8 outline-none md:max-w-3xl md:rounded-sheet md:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="display text-[2.5rem]">Jump to</h2>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close sections" className="flex size-11 items-center justify-center">
            <XIcon size={24} weight="light" aria-hidden />
          </button>
        </div>
        {categories.map((c) => (
          <div key={c.id} className="mt-5">
            <h3 className="eyebrow font-sans text-roast">{c.name}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-3">
              {c.sections.map((s) => (
                <li key={s.id} className="border-t border-line">
                  <button type="button" onClick={() => onPick(s.id)} className="flex min-h-12 w-full items-center gap-2.5 text-left text-[0.9375rem] capitalize leading-tight">
                    <SectionGlyph id={s.id} />
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </m.div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/data/menu";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { PdfButton } from "./PdfButton";

export function StaffView() {
  const { staffOpen, setStaffOpen } = usePicks();
  return <AnimatePresence>{staffOpen && <Card onClose={() => setStaffOpen(false)} />}</AnimatePresence>;
}

const ease = [0.16, 1, 0.3, 1] as const;
// Bodoni's sturdier low-optical-size cut holds its thin strokes when read from across a counter.
const sturdy = { fontVariationSettings: '"opsz" 11', fontWeight: 500 };

// A presentation card on a dark table: dark ink on warm paper, large enough to read across a counter.
// Staff can tap each line to tick it off.
function Card({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  const { picks, total, count, clear, table, setTable } = usePicks();
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const done = picks.length > 0 && picks.every((p) => ticked[p.key]);

  return (
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="List for staff"
      tabIndex={-1}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="on-dark fixed inset-0 z-[55] flex flex-col overflow-hidden bg-ink outline-none"
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-3 md:px-8 md:pt-8">
        <m.article
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto min-h-full w-full max-w-3xl bg-paper px-6 pb-8 pt-7 text-ink md:px-14 md:pb-12 md:pt-10"
        >
          <span aria-hidden className="pointer-events-none absolute inset-2 border border-brass md:inset-3" />

          <header className="relative text-center">
            <Image src="/images/site/logo-full-espresso.png" alt="Chiaro Caffé" width={64} height={74} className="mx-auto h-auto w-12 md:w-16" />
            <p className="accent mt-3 text-[1.75rem] leading-none md:text-[2.5rem]">This guest would love</p>
            <label className="mt-4 inline-flex items-baseline gap-3">
              <span className="eyebrow">Table</span>
              <input
                value={table}
                onChange={(e) => setTable(e.target.value)}
                inputMode="numeric"
                maxLength={4}
                placeholder="–"
                aria-label="Table number (optional)"
                style={sturdy}
                className="serif w-20 border-b border-ink bg-transparent text-center text-[2.5rem] leading-tight outline-offset-2 placeholder:text-roast md:text-[3.25rem]"
              />
            </label>
          </header>

          <ul className="relative mt-5 border-t border-brass">
            {picks.map((p, i) => {
              const details = [...Object.values(p.options), p.note].filter(Boolean);
              const on = !!ticked[p.key];
              return (
                <m.li key={p.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.08, duration: 0.7, ease }} className="border-b border-line">
                  <button type="button" aria-pressed={on} onClick={() => setTicked((t) => ({ ...t, [p.key]: !t[p.key] }))} className="flex w-full items-start gap-4 py-4 text-left md:gap-7 md:py-6">
                    <span style={sturdy} className="serif flex w-12 shrink-0 justify-center text-[3rem] leading-[1] tabular-nums md:w-16 md:text-[4.25rem]">
                      {on ? (
                        <m.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease }} className="flex size-12 items-center justify-center rounded-full bg-ink text-cream md:size-16">
                          <CheckIcon size={24} aria-hidden />
                          <span className="sr-only">{p.quantity}, ticked off</span>
                        </m.span>
                      ) : (
                        p.quantity
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span style={sturdy} className={`serif block text-[1.875rem] leading-[1.12] md:text-[2.875rem] ${on ? "line-through decoration-1" : ""}`}>
                        {p.item.name}
                      </span>
                      {details.length > 0 && <span className="mt-1.5 block text-[1.25rem] font-medium leading-snug md:text-[1.625rem]">{details.join(" · ")}</span>}
                      <span className="mt-1 block text-base tabular-nums text-roast md:text-lg">{formatPrice(p.item.price * p.quantity)}</span>
                    </span>
                  </button>
                </m.li>
              );
            })}
          </ul>

          <div className="relative flex items-end justify-between gap-3 pt-5">
            <div className="whitespace-nowrap">
              <p className="accent text-[1.75rem] leading-none md:text-[2.5rem]">Total</p>
              <p className="eyebrow mt-2">
                <AnimatePresence mode="wait">
                  {done ? (
                    <m.span key="done" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      All ticked off
                    </m.span>
                  ) : (
                    <m.span key="count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {count} {count === 1 ? "item" : "items"}
                    </m.span>
                  )}
                </AnimatePresence>
              </p>
            </div>
            <p style={sturdy} className="serif whitespace-nowrap text-[2.25rem] leading-none tabular-nums md:text-[3.75rem]">
              {formatPrice(total)}
            </p>
          </div>
        </m.article>
      </div>

      <div className="grid shrink-0 grid-cols-[auto_1fr_1fr] gap-1 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-cream md:mx-auto md:w-full md:max-w-3xl md:gap-3 md:px-0 md:py-4">
        <button type="button" data-autofocus onClick={onClose} aria-label="Back to my picks" className="btn gap-2 px-3 tracking-[0.12em] md:px-5">
          <ArrowLeftIcon size={18} weight="light" aria-hidden /> <span className="hidden md:inline">Back</span>
        </button>
        <PdfButton className="btn gap-2 whitespace-nowrap px-1 text-[0.75rem] tracking-[0.1em] md:text-[0.8125rem] md:tracking-[0.18em]" />
        <button
          type="button"
          onClick={() => {
            clear();
            setTable("");
            onClose();
          }}
          className="btn whitespace-nowrap bg-cream px-1 text-[0.75rem] tracking-[0.1em] text-ink md:text-[0.8125rem] md:tracking-[0.18em]"
        >
          Clear list
        </button>
      </div>
    </m.div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/data/menu";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";

export function StaffView() {
  const { staffOpen, setStaffOpen } = usePicks();
  return <AnimatePresence>{staffOpen && <Ticket onClose={() => setStaffOpen(false)} />}</AnimatePresence>;
}

// A paper ticket slides out of a slot. Large black-on-white type to read across a counter,
// and staff can tap each line to tick it off.
function Ticket({ onClose }: { onClose: () => void }) {
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
      className="on-dark fixed inset-0 z-[55] flex flex-col overflow-hidden bg-ink outline-none"
    >
      <div aria-hidden className="relative z-10 mx-3 mt-3 h-1.5 shrink-0 rounded-full bg-black md:mx-auto md:w-full md:max-w-3xl" />

      <div className="-mt-0.5 min-h-0 flex-1 overflow-y-auto px-4 pb-4 md:mx-auto md:w-full md:max-w-3xl md:px-8">
        <m.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-105%" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="text-black">
          <div className="bg-white px-4 pb-3 md:px-8">
            <div className="flex items-center justify-between gap-3 border-b-2 border-black py-4 md:py-6">
              <div className="flex items-center gap-3">
                <Image src="/images/site/logo-full-espresso.png" alt="" width={56} height={60} className="h-auto w-12 md:w-16" />
                <p className="serif text-[1.375rem] italic leading-tight md:text-[2rem]">For the counter</p>
              </div>
              <label className="flex shrink-0 items-center gap-2">
                <span className="text-[0.8125rem] font-medium uppercase tracking-[0.14em]">Table</span>
                <input
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="–"
                  aria-label="Table number (optional)"
                  className="display h-14 w-16 rounded-tile border-2 border-black bg-white text-center text-[2.5rem] placeholder:text-black/60 md:h-20 md:w-24 md:text-[3.5rem]"
                />
              </label>
            </div>

            <ul>
              {picks.map((p, i) => {
                const details = [...Object.values(p.options), p.note].filter(Boolean);
                const on = !!ticked[p.key];
                return (
                  <m.li key={p.key} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }} className="border-b border-black/40 last:border-0">
                    <button type="button" aria-pressed={on} onClick={() => setTicked((t) => ({ ...t, [p.key]: !t[p.key] }))} className="flex w-full items-start gap-3.5 py-4 text-left md:gap-6 md:py-5">
                      <span className={`display flex size-14 shrink-0 items-center justify-center rounded-tile border-2 border-black text-[2.75rem] tabular-nums transition-colors duration-300 md:size-20 md:text-[4rem] ${on ? "bg-black text-white" : ""}`}>
                        {on ? <CheckIcon size={30} aria-hidden /> : p.quantity}
                        {on && <span className="sr-only">{p.quantity} done</span>}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[1.625rem] font-semibold leading-[1.12] md:text-[2.5rem] ${on ? "line-through decoration-2" : ""}`}>{p.item.name}</span>
                        <span className="mt-0.5 block text-base tabular-nums md:text-lg">{formatPrice(p.item.price * p.quantity)}</span>
                        {details.length > 0 && <span className="mt-1.5 block border-l-4 border-black pl-2 text-[1.25rem] font-medium leading-snug md:text-[1.5rem]">{details.join(" · ")}</span>}
                      </span>
                    </button>
                  </m.li>
                );
              })}
            </ul>

            <div className="flex items-end justify-between gap-3 border-t-2 border-black pt-3">
              <div>
                <p className="text-lg font-semibold leading-none md:text-2xl">Total</p>
                <p className="mt-1 text-[0.9375rem]">
                  <AnimatePresence mode="wait">
                    {done ? (
                      <m.span key="done" role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-semibold">
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
              <p className="text-[2.25rem] font-semibold leading-none tabular-nums md:text-[3.5rem]">{formatPrice(total)}</p>
            </div>
          </div>
          <div aria-hidden className="ticket-edge" />
        </m.div>
      </div>

      <div className="grid shrink-0 grid-cols-[auto_1fr] gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:mx-auto md:w-full md:max-w-3xl">
        <button type="button" data-autofocus onClick={onClose} aria-label="Back to my picks" className="btn bg-ink-2 px-4 text-cream">
          <ArrowLeftIcon size={20} aria-hidden /> Back
        </button>
        <button
          type="button"
          onClick={() => {
            clear();
            setTable("");
            onClose();
          }}
          className="btn bg-cream text-ink"
        >
          Clear list
        </button>
      </div>
    </m.div>
  );
}

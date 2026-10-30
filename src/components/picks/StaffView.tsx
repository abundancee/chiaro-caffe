"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/data/menu";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { Mascot } from "@/components/ui/Mascot";

export function StaffView() {
  const { staffOpen, setStaffOpen } = usePicks();
  return <AnimatePresence>{staffOpen && <Ticket onClose={() => setStaffOpen(false)} />}</AnimatePresence>;
}

// A paper ticket prints out of a slot. Big black-on-white type to read across a counter,
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
      {/* Printer slot */}
      <div aria-hidden className="relative z-10 mx-3 mt-3 h-3 shrink-0 rounded-full bg-black shadow-[0_2px_0_#ffffff30] md:mx-auto md:w-full md:max-w-3xl" />

      <div className="-mt-1.5 min-h-0 flex-1 overflow-y-auto px-5 pb-4 md:mx-auto md:w-full md:max-w-3xl md:px-8">
        <m.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.8, ease: [0.3, 0.9, 0.3, 1] }}
          className="text-black"
        >
          <div className="bg-paper px-4 pb-3 md:px-8">
            <div className="-mx-4 flex items-center gap-3 border-b-[3px] border-black bg-butter px-4 pb-3 pt-5 md:-mx-8 md:px-8 md:pt-7">
              <Mascot mood="wink" steam={false} className="w-14 shrink-0 text-black md:w-20" />
              <div className="min-w-0 flex-1">
                <p className="display text-[1.75rem] leading-none md:text-[2.75rem]">Hi there!</p>
                <p className="mt-0.5 text-lg font-semibold leading-tight md:text-2xl">This guest would love:</p>
              </div>
              <label className="shrink-0 text-center">
                <span className="block text-[0.75rem] font-bold uppercase tracking-wider">Table</span>
                <input
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="–"
                  aria-label="Table number (optional)"
                  className="display h-14 w-16 rounded-lg border-[3px] border-black bg-white text-center text-[2rem] placeholder:text-black/60 md:h-20 md:w-24 md:text-[3rem]"
                />
              </label>
            </div>

            <ul>
              {picks.map((p, i) => {
                const details = [...Object.values(p.options), p.note].filter(Boolean);
                const on = !!ticked[p.key];
                return (
                  <m.li key={p.key} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.08 }} className="border-b-2 border-black/80 last:border-0">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTicked((t) => ({ ...t, [p.key]: !t[p.key] }))}
                      className="flex w-full items-center gap-3 py-3.5 text-left md:gap-5 md:py-5"
                    >
                      <span className={`display flex size-14 shrink-0 items-center justify-center -rotate-3 rounded-lg border-[3px] border-black text-[2rem] tabular-nums transition-colors md:size-20 md:text-[3rem] ${on ? "bg-black text-white" : "bg-marmalade"}`}>
                        {on ? <CheckIcon size={30} weight="bold" aria-hidden /> : p.quantity}
                        {on && <span className="sr-only">{p.quantity} done</span>}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[1.625rem] font-extrabold leading-[1.1] md:text-[2.5rem] ${on ? "line-through decoration-[3px]" : ""}`}>{p.item.name}</span>
                        <span className="mt-0.5 block text-[0.9375rem] font-semibold tabular-nums md:text-lg">{formatPrice(p.item.price * p.quantity)}</span>
                        {details.length > 0 && <span className="mt-1 block rounded bg-black px-2 py-0.5 text-[1.125rem] font-semibold leading-snug text-white md:text-[1.5rem]">{details.join(" · ")}</span>}
                      </span>
                    </button>
                  </m.li>
                );
              })}
            </ul>

            <div className="relative mt-1 flex items-end justify-between border-t-[3px] border-dashed border-black pt-3">
              <div>
                <p className="text-lg font-bold leading-none md:text-2xl">Total</p>
                <p className="text-[0.9375rem] font-semibold">{count} {count === 1 ? "item" : "items"}</p>
              </div>
              <p className="display text-[2.5rem] normal-case tabular-nums md:text-[4rem]">{formatPrice(total)}</p>
              <AnimatePresence>
                {done && (
                  <m.span
                    role="status"
                    initial={{ scale: 3, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: -9 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="display absolute -top-14 right-1 rounded-lg border-4 border-black bg-pistachio px-3 py-1 text-[2rem]"
                  >
                    All set!
                  </m.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div aria-hidden className="ticket-edge" />
        </m.div>
      </div>

      <div className="grid shrink-0 grid-cols-[auto_1fr] gap-2 border-t-2 border-cream/20 bg-ink p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:mx-auto md:w-full md:max-w-3xl">
        <button type="button" data-autofocus onClick={onClose} aria-label="Back to my picks" className="btn bg-cream px-4 text-ink">
          <ArrowLeftIcon size={20} weight="bold" aria-hidden /> Back
        </button>
        <button
          type="button"
          onClick={() => {
            clear();
            setTable("");
            onClose();
          }}
          className="btn border-cream bg-marmalade text-[1.0625rem] text-ink"
        >
          Clear list
        </button>
      </div>
    </m.div>
  );
}

"use client";

import { useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { ArrowRightIcon, TrashIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/data/menu";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { Photo } from "@/components/ui/Photo";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function PicksDrawer() {
  const { drawerOpen, setDrawerOpen } = usePicks();
  return <AnimatePresence>{drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} />}</AnimatePresence>;
}

function Drawer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  const { picks, total, count, setQuantity, setNote, setStaffOpen, clear } = usePicks();

  return (
    <div className="fixed inset-0 z-50">
      <m.div
        className="absolute inset-0 bg-espresso/55"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <m.aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="picks-title"
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-float outline-none"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 id="picks-title" className="text-[1.75rem] leading-none">
            My picks
          </h2>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close my picks" className="-mr-2 flex size-11 items-center justify-center rounded-full hover:bg-espresso/5">
            <XIcon size={22} aria-hidden />
          </button>
        </div>

        {picks.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-5">
            <div className="arch mb-6 h-28 w-20 border border-taupe" aria-hidden />
            <p className="font-display text-subtitle">Nothing here yet.</p>
            <p className="mt-2 max-w-xs text-roast">Tap anything on the menu to add it, then show this list to a member of staff.</p>
            <Link href="/menu" onClick={onClose} className="mt-6 inline-flex items-center gap-2 border-b border-espresso pb-0.5">
              Browse the menu <ArrowRightIcon size={16} aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto px-5">
              <AnimatePresence initial={false}>
                {picks.map((p) => (
                  <m.li
                    key={p.key}
                    layout
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    className="py-4"
                  >
                    <div className="flex gap-3">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-card bg-oat-2">
                        <Photo src={p.item.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <p className="font-medium leading-snug">{p.item.name}</p>
                          <p className="shrink-0 tabular-nums">{formatPrice(p.item.price * p.quantity)}</p>
                        </div>
                        {Object.entries(p.options).map(([k, v]) => (
                          <p key={k} className="text-[0.875rem] text-roast">
                            {v}
                          </p>
                        ))}
                        <div className="mt-2 flex items-center justify-between">
                          <QuantityStepper value={p.quantity} min={1} onChange={(n) => setQuantity(p.key, n)} label={p.item.name} size="sm" />
                          <button
                            type="button"
                            onClick={() => setQuantity(p.key, 0)}
                            aria-label={`Remove ${p.item.name}`}
                            className="flex size-11 items-center justify-center rounded-full text-roast hover:bg-espresso/5"
                          >
                            <TrashIcon size={18} aria-hidden />
                          </button>
                        </div>
                      </div>
                    </div>
                    <label className="mt-3 block">
                      <span className="sr-only">Note for {p.item.name}</span>
                      <input
                        value={p.note}
                        onChange={(e) => setNote(p.key, e.target.value)}
                        placeholder="Add a note"
                        maxLength={120}
                        className="h-11 w-full rounded-card border border-line bg-transparent px-3 text-[0.9375rem] placeholder:text-roast/80"
                      />
                    </label>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="border-t border-line px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <div className="flex items-baseline justify-between">
                <p>
                  Total <span className="text-roast">({count} {count === 1 ? "item" : "items"})</span>
                </p>
                <p className="text-lg font-medium tabular-nums">{formatPrice(total)}</p>
              </div>
              <m.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  setStaffOpen(true);
                }}
                className="mt-3 h-13 w-full rounded-card bg-espresso text-oat transition-colors hover:bg-espresso-2"
              >
                Show to staff
              </m.button>
              <button type="button" onClick={clear} className="mt-1 min-h-11 w-full text-[0.9375rem] text-roast underline-offset-4 hover:underline">
                Clear list
              </button>
            </div>
          </>
        )}
      </m.aside>
    </div>
  );
}

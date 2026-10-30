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
import { PdfButton } from "./PdfButton";

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
      <m.div className="absolute inset-0 bg-ink/60" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
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
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 id="picks-title" className="display text-[2.25rem]">
            My <span className="accent">picks</span>
          </h2>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close my picks" className="-mr-2 flex size-11 items-center justify-center">
            <XIcon size={24} weight="light" aria-hidden />
          </button>
        </div>

        {picks.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-5">
            <p className="serif text-[2.5rem] leading-tight">Nothing here <span className="italic">yet.</span></p>
            <p className="mt-2 max-w-xs text-roast">Tap the + on anything you fancy, then show this list to a member of staff.</p>
            <Link href="/menu" onClick={onClose} className="btn mt-6 bg-ink text-cream">
              Browse the menu <ArrowRightIcon size={18} aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto px-5">
              <AnimatePresence initial={false}>
                {picks.map((p) => (
                  <m.li key={p.key} layout exit={{ x: 60, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="py-3.5">
                    <div className="flex gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-tile bg-sand">
                        <Photo src={p.item.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-medium leading-tight">{p.item.name}</p>
                          <p className="shrink-0 text-[0.9375rem] tabular-nums">{formatPrice(p.item.price * p.quantity)}</p>
                        </div>
                        {Object.values(p.options).map((v) => (
                          <p key={v} className="text-[0.8125rem] text-roast">
                            {v}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <QuantityStepper value={p.quantity} min={1} onChange={(n) => setQuantity(p.key, n)} label={p.item.name} size="sm" />
                      <label className="min-w-0 flex-1">
                        <span className="sr-only">Note for {p.item.name}</span>
                        <input value={p.note} onChange={(e) => setNote(p.key, e.target.value)} placeholder="Add a note" maxLength={120} className="h-10 w-full rounded-tile border border-line bg-transparent px-3 text-[0.875rem] placeholder:text-roast" />
                      </label>
                      <button type="button" onClick={() => setQuantity(p.key, 0)} aria-label={`Remove ${p.item.name}`} className="flex size-10 shrink-0 items-center justify-center text-roast hover:text-ink">
                        <TrashIcon size={18} weight="light" aria-hidden />
                      </button>
                    </div>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="border-t border-line px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              <div className="flex items-baseline justify-between">
                <p>
                  Total <span className="text-roast">({count} {count === 1 ? "item" : "items"})</span>
                </p>
                <p className="serif text-[1.75rem] tabular-nums">{formatPrice(total)}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setStaffOpen(true);
                }}
                className="btn mt-2.5 w-full bg-ink text-cream"
              >
                Show to staff
              </button>
              <div className="mt-1 grid grid-cols-2">
                <PdfButton className="flex min-h-11 items-center justify-center gap-2 text-[0.9375rem] underline-offset-4 hover:underline disabled:opacity-60" />
                <button type="button" onClick={clear} className="min-h-11 text-[0.9375rem] underline-offset-4 hover:underline">
                  Clear list
                </button>
              </div>
            </div>
          </>
        )}
      </m.aside>
    </div>
  );
}

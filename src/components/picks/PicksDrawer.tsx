"use client";

import { useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { ArrowRightIcon, ReceiptIcon, TrashIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/data/menu";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { Photo } from "@/components/ui/Photo";
import { Mascot } from "@/components/ui/Mascot";
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
      <m.div className="absolute inset-0 bg-ink/60" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
      <m.aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="picks-title"
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l-2 border-ink bg-cream outline-none"
        initial={{ x: "100%", rotate: 3 }}
        animate={{ x: 0, rotate: 0 }}
        exit={{ x: "100%", rotate: 3 }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
      >
        <div className="flex items-center justify-between border-b-2 border-ink bg-butter px-4 py-2.5">
          <h2 id="picks-title" className="display text-[2rem]">
            My <span className="accent">picks</span>
          </h2>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close my picks" className="flex size-11 items-center justify-center rounded-full bg-ink text-cream">
            <XIcon size={20} weight="bold" aria-hidden />
          </button>
        </div>

        {picks.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <Mascot mood="wow" className="bob w-32" />
            <p className="display mt-4 text-[2.25rem]">It’s empty in here</p>
            <p className="mt-2 max-w-xs font-medium text-roast">Tap the + on anything tasty, then show the list to a member of staff.</p>
            <Link href="/menu" onClick={onClose} className="btn mt-6 bg-marmalade">
              Browse the menu <ArrowRightIcon size={18} weight="bold" aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <ul className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
              <AnimatePresence initial={false}>
                {picks.map((p) => (
                  <m.li
                    key={p.key}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ x: 120, rotate: 8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    className="rounded-tile border-2 border-ink bg-paper p-2.5 shadow-hard-sm"
                  >
                    <div className="flex gap-2.5">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-[10px] bg-butter">
                        <Photo src={p.item.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-bold leading-tight">{p.item.name}</p>
                          <p className="shrink-0 text-[0.9375rem] font-semibold tabular-nums">{formatPrice(p.item.price * p.quantity)}</p>
                        </div>
                        {Object.values(p.options).map((v) => (
                          <p key={v} className="text-[0.8125rem] font-medium text-roast">
                            {v}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <QuantityStepper value={p.quantity} min={1} onChange={(n) => setQuantity(p.key, n)} label={p.item.name} size="sm" />
                      <label className="min-w-0 flex-1">
                        <span className="sr-only">Note for {p.item.name}</span>
                        <input
                          value={p.note}
                          onChange={(e) => setNote(p.key, e.target.value)}
                          placeholder="Add a note"
                          maxLength={120}
                          className="h-10 w-full rounded-full border-2 border-line bg-transparent px-3 text-[0.875rem] placeholder:text-roast focus:border-ink"
                        />
                      </label>
                      <button type="button" onClick={() => setQuantity(p.key, 0)} aria-label={`Remove ${p.item.name}`} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-blush">
                        <TrashIcon size={18} weight="duotone" aria-hidden />
                      </button>
                    </div>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="border-t-2 border-ink bg-paper px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">
                  Total <span className="font-medium text-roast">({count} {count === 1 ? "item" : "items"})</span>
                </p>
                <m.p key={total} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="display text-[1.875rem] normal-case tabular-nums">
                  {formatPrice(total)}
                </m.p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setStaffOpen(true);
                }}
                className="btn mt-2.5 w-full bg-marmalade text-[1.0625rem]"
              >
                <ReceiptIcon size={22} weight="duotone" aria-hidden /> Show to staff
              </button>
              <button type="button" onClick={clear} className="mt-1 min-h-11 w-full text-[0.9375rem] font-semibold underline-offset-4 hover:underline">
                Clear list
              </button>
            </div>
          </>
        )}
      </m.aside>
    </div>
  );
}

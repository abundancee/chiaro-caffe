"use client";

import { useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/data/menu";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";

export function StaffView() {
  const { staffOpen, setStaffOpen } = usePicks();
  return <AnimatePresence>{staffOpen && <View onClose={() => setStaffOpen(false)} />}</AnimatePresence>;
}

// High contrast and large type, so it can be read across a counter.
function View({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  const { picks, total, clear } = usePicks();

  return (
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="List for staff"
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[55] flex flex-col bg-white text-black outline-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: "spring", stiffness: 340, damping: 36 }}
    >
      <div className="flex items-center justify-between px-5 pb-2 pt-4 md:px-10 md:pt-8">
        <p className="text-lg font-medium">Chiaro Caffé</p>
        <button type="button" data-autofocus onClick={onClose} aria-label="Close staff view" className="-mr-2 flex size-12 items-center justify-center rounded-full hover:bg-black/5">
          <XIcon size={28} aria-hidden />
        </button>
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto px-5 md:px-10">
        {picks.map((p) => {
          const details = [...Object.values(p.options), p.note].filter(Boolean);
          return (
            <li key={p.key} className="flex gap-4 border-b-2 border-black py-4 md:gap-8 md:py-6">
              <span className="w-12 shrink-0 text-[2.25rem] font-semibold leading-none tabular-nums md:w-20 md:text-[3.5rem]">{p.quantity}×</span>
              <div className="min-w-0">
                <p className="text-[1.75rem] font-semibold leading-tight md:text-[3rem]">{p.item.name}</p>
                {details.length > 0 && <p className="mt-1 text-[1.25rem] leading-snug md:text-[1.75rem]">{details.join(" · ")}</p>}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t-4 border-black px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-10 md:pb-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[1.5rem] font-semibold md:text-[2.25rem]">Total</p>
          <p className="text-[1.75rem] font-semibold tabular-nums md:text-[3rem]">{formatPrice(total)}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            clear();
            onClose();
          }}
          className="mt-3 h-13 w-full rounded-card border-2 border-black text-lg font-medium transition-colors hover:bg-black hover:text-white"
        >
          Clear list
        </button>
      </div>
    </m.div>
  );
}

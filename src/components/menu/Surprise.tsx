"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowsClockwiseIcon, PlusIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { allItems, formatPrice, type MenuItem } from "@/data/menu";
import { useSurpriseState } from "@/lib/surprise";
import { useItemSheet } from "@/lib/item-sheet";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { Photo } from "@/components/ui/Photo";
import { Mascot } from "@/components/ui/Mascot";

const skip = new Set(["packaging", "bread-replacement-2pcs", "lactose-milk", "birthday-candle", "independence-pitcher"]);
const pool = allItems.filter((i) => !skip.has(i.slug));
const randomItem = () => pool[Math.floor(Math.random() * pool.length)];

export function Surprise() {
  const { open, stop } = useSurpriseState();
  return <AnimatePresence>{open && <Machine onClose={stop} />}</AnimatePresence>;
}

// A slot machine for the undecided: photos flick past, slow down and land on something.
function Machine({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  const [item, setItem] = useState<MenuItem | null>(null);
  const [spinning, setSpinning] = useState(true);
  const timer = useRef(0);
  const { open: openSheet } = useItemSheet();
  const { add } = usePicks();

  const spin = useCallback(() => {
    window.clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSpinning(true);
    let delay = 60;
    const step = () => {
      setItem(randomItem());
      if (reduce || delay > 340) {
        setSpinning(false);
        return;
      }
      delay *= 1.18;
      timer.current = window.setTimeout(step, delay);
    };
    step();
  }, []);

  useEffect(() => {
    // Starting the machine on open is the point of this component.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    spin();
    return () => window.clearTimeout(timer.current);
  }, [spin]);

  return (
    <div className="fixed inset-0 z-[58] flex items-center justify-center p-4">
      <m.div className="absolute inset-0 bg-ink/70" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Surprise me"
        tabIndex={-1}
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.6, rotate: 8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="relative w-full max-w-sm rounded-sheet border-2 border-ink bg-butter p-4 shadow-[8px_8px_0_#00000066] outline-none"
      >
        <div className="flex items-center justify-between">
          <p className="display text-[1.75rem]">Surprise <span className="accent">me</span></p>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close" className="flex size-11 items-center justify-center rounded-full bg-ink text-cream">
            <XIcon size={20} weight="bold" aria-hidden />
          </button>
        </div>
        <div className="relative mx-auto mt-3 aspect-square w-3/4 overflow-hidden rounded-tile border-2 border-ink bg-paper">
          {item && <Photo key={item.id} src={item.image} alt={spinning ? "" : item.name} fill sizes="280px" className="object-cover" />}
          <Mascot mood={spinning ? "wow" : "wink"} steam={false} className="absolute -bottom-1 -right-1 w-16" />
        </div>
        <div aria-live="polite" className="mt-3 min-h-20 text-center">
          {!spinning && item ? (
            <m.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
              <p className="display text-[1.625rem] normal-case leading-tight">{item.name}</p>
              <p className="mt-1 font-semibold tabular-nums">{formatPrice(item.price)}</p>
            </m.div>
          ) : (
            <p className="accent pt-4 text-2xl">Hmm, let’s see…</p>
          )}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={spin} disabled={spinning} className="btn bg-paper px-3 text-[0.9375rem] disabled:opacity-50">
            <ArrowsClockwiseIcon size={18} weight="bold" aria-hidden /> Again
          </button>
          <button
            type="button"
            disabled={spinning || !item}
            onClick={() => {
              if (!item) return;
              onClose();
              if (item.options?.some((o) => o.required)) openSheet(item);
              else add(item, 1, {});
            }}
            className="btn bg-marmalade px-3 text-[0.9375rem] disabled:opacity-50"
          >
            <PlusIcon size={18} weight="bold" aria-hidden /> Add it
          </button>
        </div>
        {!spinning && item && (
          <button type="button" onClick={() => { onClose(); openSheet(item); }} className="mt-1 min-h-11 w-full text-[0.9375rem] font-semibold underline underline-offset-4">
            See details
          </button>
        )}
      </m.div>
    </div>
  );
}

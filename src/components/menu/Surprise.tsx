"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ShuffleIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { allItems, formatPrice, type MenuItem } from "@/data/menu";
import { useSurpriseState } from "@/lib/surprise";
import { useItemSheet } from "@/lib/item-sheet";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { Photo } from "@/components/ui/Photo";

const skip = new Set(["packaging", "bread-replacement-2pcs", "lactose-milk", "birthday-candle", "independence-pitcher"]);
const pool = allItems.filter((i) => !skip.has(i.slug));
const randomItem = () => pool[Math.floor(Math.random() * pool.length)];

export function Surprise() {
  const { open, stop } = useSurpriseState();
  return <AnimatePresence>{open && <Chooser onClose={stop} />}</AnimatePresence>;
}

// For the undecided: photos flick past, slow down and settle on something.
function Chooser({ onClose }: { onClose: () => void }) {
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
    let delay = 70;
    const step = () => {
      setItem(randomItem());
      if (reduce || delay > 380) {
        setSpinning(false);
        return;
      }
      delay *= 1.2;
      timer.current = window.setTimeout(step, delay);
    };
    step();
  }, []);

  useEffect(() => {
    // Starting the shuffle on open is the point of this component.
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
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm rounded-sheet bg-paper p-5 shadow-float outline-none"
      >
        <div className="flex items-center justify-between">
          <p className="display text-[2.25rem]">Surprise <span className="accent text-[0.85em]">me</span></p>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close" className="-mr-2 flex size-11 items-center justify-center">
            <XIcon size={22} weight="light" aria-hidden />
          </button>
        </div>
        <div className="relative mx-auto mt-3 aspect-[4/5] w-2/3 overflow-hidden rounded-tile bg-sand">
          {item && <Photo key={item.id} src={item.image} alt={spinning ? "" : item.name} fill sizes="240px" className="object-cover" />}
        </div>
        <div aria-live="polite" className="mt-3 min-h-20 text-center">
          {!spinning && item ? (
            <m.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              <p className="serif text-[1.625rem] leading-tight">{item.name}</p>
              <p className="mt-1 tabular-nums">{formatPrice(item.price)}</p>
            </m.div>
          ) : (
            <p className="accent pt-4 text-2xl text-roast">Let’s see</p>
          )}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button type="button" onClick={spin} disabled={spinning} className="btn border border-line px-3 text-[0.9375rem] disabled:opacity-40">
            <ShuffleIcon size={18} aria-hidden /> Again
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
            className="btn bg-ink px-3 text-[0.9375rem] text-cream disabled:opacity-40"
          >
            Add to my list
          </button>
        </div>
        {!spinning && item && (
          <button type="button" onClick={() => { onClose(); openSheet(item); }} className="mt-1 min-h-11 w-full text-[0.9375rem] underline underline-offset-4">
            See details
          </button>
        )}
      </m.div>
    </div>
  );
}

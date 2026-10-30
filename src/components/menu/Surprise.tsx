"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRightIcon, ShuffleIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice, menu, type MenuItem } from "@/data/menu";
import { useSurpriseState } from "@/lib/surprise";
import { useItemSheet } from "@/lib/item-sheet";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { flyToBag } from "@/lib/fly";
import { Photo } from "@/components/ui/Photo";

const skip = new Set(["packaging", "bread-replacement-2pcs", "lactose-milk", "birthday-candle", "independence-pitcher"]);
const pool = menu.flatMap((c) => c.sections.flatMap((s) => s.items.filter((i) => !skip.has(i.slug)).map((item) => ({ item, section: s.name }))));
const pick = () => pool[Math.floor(Math.random() * pool.length)];

const ease = [0.16, 1, 0.3, 1] as const;

export function Surprise() {
  const { open, stop } = useSurpriseState();
  return <AnimatePresence>{open && <Reveal onClose={stop} />}</AnimatePresence>;
}

// Let the house choose: photos wipe past, slow down, and the choice lands in large type.
function Reveal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  const [current, setCurrent] = useState<{ item: MenuItem; section: string; turn: number } | null>(null);
  const [spinning, setSpinning] = useState(true);
  const timer = useRef(0);
  const { open: openSheet } = useItemSheet();
  const { add } = usePicks();

  const spin = useCallback(() => {
    window.clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSpinning(true);
    let delay = 110;
    let turn = Date.now();
    const step = () => {
      setCurrent({ ...pick(), turn: turn++ });
      if (reduce || delay > 620) {
        setSpinning(false);
        return;
      }
      delay *= 1.28;
      timer.current = window.setTimeout(step, delay);
    };
    step();
  }, []);

  useEffect(() => {
    // Starting the reveal on open is the point of this component.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    spin();
    return () => window.clearTimeout(timer.current);
  }, [spin]);

  const settled = !spinning && current;

  return (
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Surprise me"
      tabIndex={-1}
      data-lenis-prevent
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="on-dark fixed inset-0 z-[58] overflow-y-auto bg-ink text-cream outline-none"
    >
      <button type="button" data-autofocus onClick={onClose} aria-label="Close" className="fixed right-3 top-3 z-10 flex size-11 items-center justify-center md:right-6 md:top-6">
        <XIcon size={26} weight="light" aria-hidden />
      </button>

      <div className="mx-auto grid min-h-full max-w-[90rem] content-center gap-x-16 gap-y-6 px-5 py-14 md:grid-cols-2 md:items-center md:px-12">
        <div className="md:justify-self-end">
          <div ref={frame} className="relative mx-auto aspect-[4/5] w-[62vw] max-w-[24rem] overflow-hidden rounded-tile bg-ink-2 md:w-[min(32vw,70vh)] md:max-w-none">
            {current && (
              <m.div
                key={current.turn}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: spinning ? 0.16 : 0.5, ease }}
              >
                <m.div className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: settled ? 1.6 : 0.3, ease }}>
                  <Photo src={current.item.image} alt={settled ? current.item.name : ""} fill sizes="(min-width: 768px) 32vw, 62vw" className="object-cover" />
                </m.div>
              </m.div>
            )}
            <span aria-hidden className="pointer-events-none absolute inset-2 border border-cream/25" />
          </div>
        </div>

        <div aria-live="polite" className="min-h-[17rem] text-center md:min-h-[24rem] md:text-left">
          <AnimatePresence mode="wait">
            {settled ? (
              <m.div key={`found-${current.turn}`} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <m.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="eyebrow capitalize text-brass">
                  From {current.section}
                </m.p>
                <h2 className="mt-3 overflow-hidden pb-[0.12em] text-[2.75rem] leading-[1.06] md:text-[clamp(3.25rem,5.4vw,6rem)]">
                  <m.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.08 }}>
                    {current.item.name}
                  </m.span>
                </h2>
                <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 }}>
                  {current.item.description && <p className="mx-auto mt-2 max-w-md text-cream/75 md:mx-0">{current.item.description}</p>}
                  <p className="serif mt-3 text-[1.5rem] tabular-nums">{formatPrice(current.item.price)}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
                    <button
                      type="button"
                      onClick={() => {
                        if (current.item.options?.some((o) => o.required)) {
                          onClose();
                          openSheet(current.item);
                          return;
                        }
                        flyToBag(frame.current);
                        add(current.item, 1, {});
                        onClose();
                      }}
                      className="btn bg-cream text-ink"
                    >
                      Add to my list <ArrowRightIcon size={16} aria-hidden />
                    </button>
                    <button type="button" onClick={spin} className="inline-flex min-h-11 items-center gap-2 border-b border-cream/50 text-[0.8125rem] uppercase tracking-[0.18em] transition-colors hover:border-cream">
                      <ShuffleIcon size={16} weight="light" aria-hidden /> Choose again
                    </button>
                  </div>
                  <button type="button" onClick={() => { onClose(); openSheet(current.item); }} className="mt-2 min-h-11 text-[0.9375rem] text-cream/80 underline underline-offset-4 hover:text-cream">
                    See details
                  </button>
                </m.div>
              </m.div>
            ) : (
              <m.div key="choosing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <p className="eyebrow text-brass">Surprise me</p>
                <p className="accent mt-3 text-[2.75rem] leading-[1.06] md:text-[clamp(3.25rem,5.4vw,6rem)]">Let the house choose.</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </m.div>
  );
}

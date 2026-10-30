"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useDragControls } from "motion/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useItemSheet } from "@/lib/item-sheet";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { Photo } from "@/components/ui/Photo";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { flyToBag } from "@/lib/fly";

export function ItemSheet() {
  const { item, close } = useItemSheet();
  return <AnimatePresence>{item && <Sheet key={item.id} item={item} onClose={close} />}</AnimatePresence>;
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function Sheet({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  const desktop = useIsDesktop();
  const drag = useDragControls();
  const photo = useRef<HTMLDivElement>(null);
  const { add } = usePicks();
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");
  const [missing, setMissing] = useState<string | null>(null);

  const submit = () => {
    const needed = item.options?.find((o) => o.required && !options[o.label]);
    if (needed) {
      setMissing(needed.label);
      return;
    }
    flyToBag(photo.current);
    add(item, quantity, options, note.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-8">
      <m.div
        className="absolute inset-0 bg-ink/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-sheet-title"
        tabIndex={-1}
        data-lenis-prevent
        drag={desktop ? false : "y"}
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 110 || info.velocity.y > 500) onClose();
        }}
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-sheet bg-paper shadow-float outline-none md:max-h-[86dvh] md:max-w-4xl md:flex-row md:rounded-sheet"
        initial={desktop ? { opacity: 0, scale: 0.97, y: 12 } : { y: "100%" }}
        animate={desktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
        exit={desktop ? { opacity: 0, scale: 0.98, y: 8 } : { y: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          aria-label="Drag down to close"
          tabIndex={-1}
          onPointerDown={(e) => drag.start(e)}
          className="absolute inset-x-0 top-0 z-10 flex h-7 touch-none justify-center pt-2.5 md:hidden"
        >
          <span className="h-1 w-10 rounded-full bg-cream/90 shadow-[0_0_4px_#0005]" />
        </button>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label={`Close ${item.name}`}
          className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full bg-paper/90 text-ink"
        >
          <XIcon size={20} aria-hidden />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto md:flex md:overflow-hidden">
          <div ref={photo} className="relative aspect-[3/2] w-full shrink-0 bg-sand md:aspect-auto md:w-[42%]">
            <Photo src={item.image} alt={item.name} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
          <div className="px-5 pb-6 pt-5 md:flex-1 md:overflow-y-auto md:p-8 md:pb-24 md:pt-10">
            {item.popular && <p className="eyebrow mb-2 text-roast">Popular</p>}
            <h2 id="item-sheet-title" className="serif text-[2.25rem] font-normal leading-[1.1] md:pr-8 md:text-[2.75rem]">
              {item.name}
            </h2>
            <p className="mt-2 text-lg tabular-nums">{formatPrice(item.price)}</p>
            {item.description && <p className="mt-4 text-roast">{item.description}</p>}

            {item.options?.map((o) => (
              <fieldset key={o.label} className="mt-6">
                <legend className="text-[0.9375rem] font-medium">{o.label}</legend>
                {missing === o.label && (
                  <p role="alert" className="mt-1 text-[0.875rem] text-roast">
                    Choose one to continue.
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {o.choices.map((c) => {
                    const selected = options[o.label] === c;
                    return (
                      <m.button
                        key={c}
                        type="button"
                        aria-pressed={selected}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setMissing(null);
                          setOptions((prev) => {
                            const next = { ...prev };
                            if (selected && !o.required) delete next[o.label];
                            else next[o.label] = c;
                            return next;
                          });
                        }}
                        className={`min-h-11 rounded-tile border px-4 text-[0.9375rem] transition-colors ${
                          selected ? "border-ink bg-ink text-cream" : "border-line hover:border-ink"
                        }`}
                      >
                        {c}
                      </m.button>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="mt-6">
              <label htmlFor="item-note" className="text-[0.9375rem] font-medium">
                Note for staff <span className="font-normal text-roast">(optional)</span>
              </label>
              <input
                id="item-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Oat milk, extra hot"
                maxLength={120}
                className="mt-2 h-12 w-full rounded-tile border border-line bg-paper px-3 placeholder:text-roast"
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-line bg-paper px-4 py-3 md:absolute md:bottom-0 md:right-0 md:w-[54%] md:px-8 md:py-4">
          <QuantityStepper value={quantity} onChange={setQuantity} label={item.name} size="sm" />
          <m.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={submit}
            className="flex h-12 min-w-0 flex-1 items-center justify-between gap-2 whitespace-nowrap rounded-tile bg-ink px-4 text-[0.9375rem] text-cream"
          >
            <span>Add to my list</span>
            <span className="tabular-nums">{formatPrice(item.price * quantity)}</span>
          </m.button>
        </div>
      </m.div>
    </div>
  );
}

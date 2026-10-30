"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { m } from "motion/react";

export function QuantityStepper({ value, onChange, min = 1, label, size = "md" }: { value: number; onChange: (n: number) => void; min?: number; label: string; size?: "sm" | "md" }) {
  const btn = size === "sm" ? "size-10" : "size-12";
  return (
    <div className="inline-flex shrink-0 items-center rounded-full border-2 border-ink bg-paper" role="group" aria-label={`Quantity for ${label}`}>
      <m.button type="button" whileTap={{ scale: 0.8 }} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease quantity of ${label}`} className={`${btn} flex items-center justify-center rounded-full disabled:opacity-30`}>
        <MinusIcon size={16} weight="bold" aria-hidden />
      </m.button>
      <m.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-live="polite" className="min-w-5 text-center font-bold tabular-nums">
        {value}
      </m.span>
      <m.button type="button" whileTap={{ scale: 0.8 }} onClick={() => onChange(value + 1)} aria-label={`Increase quantity of ${label}`} className={`${btn} flex items-center justify-center rounded-full`}>
        <PlusIcon size={16} weight="bold" aria-hidden />
      </m.button>
    </div>
  );
}

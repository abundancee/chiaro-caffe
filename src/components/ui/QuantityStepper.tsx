"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { m } from "motion/react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  label,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  label: string;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "size-10" : "size-12";
  return (
    <div className="inline-flex items-center rounded-full border border-line" role="group" aria-label={`Quantity for ${label}`}>
      <m.button
        type="button"
        whileTap={{ scale: 0.86 }}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className={`${btn} flex items-center justify-center rounded-full transition-colors hover:bg-espresso/5 disabled:opacity-30`}
      >
        <MinusIcon size={16} aria-hidden />
      </m.button>
      <span aria-live="polite" className="min-w-6 text-center font-medium tabular-nums">
        {value}
      </span>
      <m.button
        type="button"
        whileTap={{ scale: 0.86 }}
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity of ${label}`}
        className={`${btn} flex items-center justify-center rounded-full transition-colors hover:bg-espresso/5`}
      >
        <PlusIcon size={16} aria-hidden />
      </m.button>
    </div>
  );
}

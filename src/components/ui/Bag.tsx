"use client";

import { m } from "motion/react";
import { ShoppingBagOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { usePicks } from "@/lib/picks";

// The list button. Bounces each time something lands in it.
export function BagButton({ className = "" }: { className?: string }) {
  const { count, bump, ready, setDrawerOpen } = usePicks();
  return (
    <button
      type="button"
      data-bag
      onClick={() => setDrawerOpen(true)}
      aria-label={`Open my picks, ${ready ? count : 0} ${count === 1 ? "item" : "items"}`}
      className={`relative flex items-center justify-center ${className}`}
    >
      <m.span
        key={bump}
        initial={bump ? { scale: 0.6, rotate: -18 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 13 }}
        className="flex"
      >
        <ShoppingBagOpenIcon size={26} weight="duotone" aria-hidden />
      </m.span>
      {ready && count > 0 && (
        <m.span
          key={`c${count}`}
          aria-hidden
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 15 }}
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ink bg-marmalade px-1 text-[0.6875rem] font-bold tabular-nums text-ink"
        >
          {count}
        </m.span>
      )}
    </button>
  );
}

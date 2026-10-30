"use client";

import { m } from "motion/react";
import { ToteIcon } from "@phosphor-icons/react/dist/ssr";
import { usePicks } from "@/lib/picks";

// The list button. Gives a small nudge each time something lands in it.
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
      <m.span key={bump} initial={bump ? { scale: 0.86 } : false} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 420, damping: 24 }} className="flex">
        <ToteIcon size={24} weight="light" aria-hidden />
      </m.span>
      {ready && count > 0 && (
        <span aria-hidden className="absolute right-0 top-0 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-brass px-1 text-[0.6875rem] tabular-nums text-ink">
          {count}
        </span>
      )}
    </button>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { usePicks } from "@/lib/picks";
import { Mascot } from "./Mascot";

const lines = ["Nice pick!", "Great taste.", "Ooh, good one.", "Yes please.", "Chef’s kiss."];

// A small cheer from Chi when something lands on the list.
export function Toast() {
  const { bump } = usePicks();
  const [text, setText] = useState<string | null>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Triggered by an external counter changing, so a state update here is deliberate.
    setText(lines[bump % lines.length]);
    const id = window.setTimeout(() => setText(null), 1600);
    return () => window.clearTimeout(id);
  }, [bump]);
  return (
    <div role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center md:bottom-8">
      <AnimatePresence>
        {text && (
          <m.div
            initial={{ y: 40, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="flex items-center gap-2 rounded-full border-2 border-ink bg-butter py-1 pl-2 pr-5 font-bold text-ink shadow-hard-sm"
          >
            <Mascot mood="wink" steam={false} className="w-9" />
            {text}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

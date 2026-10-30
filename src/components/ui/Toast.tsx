"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { usePicks } from "@/lib/picks";

// Quiet confirmation when something lands on the list.
export function Toast() {
  const { bump } = usePicks();
  const [show, setShow] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setShow(true);
    const id = window.setTimeout(() => setShow(false), 1500);
    return () => window.clearTimeout(id);
  }, [bump]);
  return (
    <div role="status" className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex justify-center md:bottom-8">
      <AnimatePresence>
        {show && (
          <m.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-2 rounded-tile bg-ink px-4 py-2.5 text-[0.9375rem] text-cream shadow-float">
            <CheckIcon size={16} aria-hidden /> Added to your list
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

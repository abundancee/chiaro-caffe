"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Mascot } from "./Mascot";

const colours = ["bg-marmalade", "bg-butter", "bg-pistachio", "bg-blush", "bg-taupe"];

// Colour shutters close over the page, the route changes, then they open again.
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [covering, setCovering] = useState(false);
  const pending = useRef<string | null>(null);

  // Once the loader has played, later pages shouldn't wait for it.
  useEffect(() => {
    const id = window.setTimeout(() => document.documentElement.classList.add("no-loader"), 2200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      // Links inside overlays close them on click, so they navigate directly.
      if (!a || a.target || a.hasAttribute("download") || a.closest('[role="dialog"]')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      // Capture phase: this runs before next/link, so the shutters close before the route changes.
      e.preventDefault();
      e.stopPropagation();
      pending.current = url.pathname + url.hash;
      setCovering(true);
      window.setTimeout(() => {
        if (pending.current) router.push(pending.current);
      }, 460);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    const id = window.setTimeout(() => setCovering(false), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <AnimatePresence>
      {covering && (
        <div className="pointer-events-none fixed inset-0 z-[95] flex" aria-hidden>
          {colours.map((c, i) => (
            <m.div
              key={c}
              className={`-mr-px h-full flex-1 ${c}`}
              initial={{ y: "101%" }}
              animate={{ y: 0 }}
              exit={{ y: "-101%" }}
              transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1], delay: i * 0.03 }}
            />
          ))}
          <m.div
            className="absolute inset-0 flex items-center justify-center text-ink"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.14 }}
          >
            <Mascot mood="wink" className="w-28" />
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

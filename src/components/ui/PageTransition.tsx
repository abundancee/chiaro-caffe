"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";

const ease = [0.76, 0, 0.24, 1] as const;

// The same drapes as the loader: they close over the page, the route changes, then they part again.
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [covering, setCovering] = useState(false);
  const pending = useRef<string | null>(null);

  // Once the loader has played, later pages shouldn't wait for it.
  useEffect(() => {
    const id = window.setTimeout(() => document.documentElement.classList.add("no-loader"), 2800);
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
      // Capture phase: this runs before next/link, so the drapes close before the route changes.
      e.preventDefault();
      e.stopPropagation();
      pending.current = url.pathname + url.hash;
      setCovering(true);
      window.setTimeout(() => {
        if (pending.current) router.push(pending.current);
      }, 720);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    const id = window.setTimeout(() => setCovering(false), 160);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <AnimatePresence>
      {covering && (
        <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden>
          <m.div className="drape drape-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.7, ease }} />
          <m.div className="drape drape-right" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.7, ease }} />
          <m.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.42 }}>
            <Image src="/images/site/logo-full-oat.png" alt="" width={96} height={111} />
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

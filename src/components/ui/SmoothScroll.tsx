"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import type Lenis from "lenis";
import { usePathname } from "next/navigation";

const Ctx = createContext<{
  lock: () => void;
  unlock: () => void;
  scrollTo: (target: string) => void;
}>({ lock: () => {}, unlock: () => {}, scrollTo: () => {} });

export const useSmoothScroll = () => useContext(Ctx);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const refresh = useRef<(() => void) | null>(null);
  const locks = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const [{ default: LenisClass }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), import("@/lib/gsap")]);
      if (cancelled) return;
      const instance = new LenisClass({ duration: 0.9, smoothWheel: true, anchors: true });
      lenis.current = instance;
      refresh.current = () => ScrollTrigger.refresh();
      if (locks.current > 0) instance.stop();
      instance.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
        lenis.current = null;
      };
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenis.current?.scrollTo(0, { immediate: true });
    refresh.current?.();
  }, [pathname]);

  const lock = useCallback(() => {
    locks.current += 1;
    lenis.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);
  const unlock = useCallback(() => {
    locks.current = Math.max(0, locks.current - 1);
    if (locks.current === 0) {
      lenis.current?.start();
      document.documentElement.style.overflow = "";
    }
  }, []);
  // Both paths honour scroll-padding-top and each section's scroll-margin-top.
  const scrollTo = useCallback((target: string) => {
    if (lenis.current) lenis.current.scrollTo(target);
    else document.querySelector(target)?.scrollIntoView();
  }, []);

  const value = useMemo(() => ({ lock, unlock, scrollTo }), [lock, unlock, scrollTo]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

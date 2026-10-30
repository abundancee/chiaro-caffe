"use client";

import { useEffect, type RefObject } from "react";

type Tools = typeof import("@/lib/gsap");

// Builds a GSAP scene once the library has loaded, only when motion is welcome, and cleans it up.
export function useScene(ref: RefObject<HTMLElement | null>, build: (tools: Tools, root: HTMLElement) => void) {
  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    import("@/lib/gsap").then((tools) => {
      if (cancelled || !ref.current) return;
      const root = ref.current;
      const mm = tools.gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => build(tools, root));
      revert = () => mm.revert();
      document.fonts?.ready.then(() => tools.ScrollTrigger.refresh());
    });
    return () => {
      cancelled = true;
      revert();
    };
    // Scenes are built once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

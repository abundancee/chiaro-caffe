"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Soft vertical drift for a photo inside an overflow-hidden frame. Child should overfill by amount * 2.
export function Parallax({ children, amount = 6, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -amount },
          { yPercent: amount, ease: "none", scrollTrigger: { trigger: ref.current?.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, [amount]);

  return (
    <div ref={ref} className={`absolute inset-x-0 ${className}`} style={{ top: `-${amount}%`, bottom: `-${amount}%` }}>
      {children}
    </div>
  );
}

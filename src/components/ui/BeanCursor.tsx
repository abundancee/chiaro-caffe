"use client";

import { useEffect, useRef } from "react";

// A coffee bean trails the pointer on desktop and grows over anything clickable.
export function BeanCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    el.style.display = "block";
    let x = -100, y = -100, tx = -100, ty = -100, s = 1, ts = 1, r = 0, frame = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      ts = (e.target as HTMLElement).closest?.("a,button,input,label") ? 2.1 : 1;
    };
    const tick = () => {
      const dx = tx - x;
      x += dx * 0.2; y += (ty - y) * 0.2; s += (ts - s) * 0.15; r += dx * 0.12;
      el.style.transform = `translate(${x + 12}px, ${y + 12}px) rotate(${r}deg) scale(${s})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[99] hidden" style={{ willChange: "transform" }}>
      <svg width="16" height="20" viewBox="0 0 16 20">
        <ellipse cx="8" cy="10" rx="7" ry="9.5" fill="#5c3a22" stroke="#1a120c" />
        <path d="M9 1.5C4.5 6.5 11.5 12 7 18.5" stroke="#fbf3e4" strokeWidth="1.4" fill="none" />
      </svg>
    </div>
  );
}

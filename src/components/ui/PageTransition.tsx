"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Fades the new page in after in-app navigation. Skips the first load so it never delays the first paint.
export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelector("main")?.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 350, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }, [pathname]);
  return null;
}

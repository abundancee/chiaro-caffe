"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

// Fades content up once as it enters the viewport.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 26, delay }}
    >
      {children}
    </m.div>
  );
}

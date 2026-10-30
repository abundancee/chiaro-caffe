"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";

// Renders nothing until opening hours are entered in src/data/site.ts.
export function OpenStatus({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold ${className}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${open ? "bg-current" : "border border-current"}`} />
      {open ? "Open now" : "Closed"}
    </span>
  );
}

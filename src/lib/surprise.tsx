"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const SurpriseContext = createContext<{ open: boolean; start: () => void; stop: () => void } | null>(null);

export function SurpriseProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, start: () => setOpen(true), stop: () => setOpen(false) }), [open]);
  return <SurpriseContext.Provider value={value}>{children}</SurpriseContext.Provider>;
}

export const useSurpriseState = () => {
  const ctx = useContext(SurpriseContext);
  if (!ctx) throw new Error("useSurprise must be used inside SurpriseProvider");
  return ctx;
};

export const useSurprise = () => useSurpriseState().start;

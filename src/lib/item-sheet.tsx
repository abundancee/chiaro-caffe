"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "@/data/menu";

const ItemSheetContext = createContext<{
  item: MenuItem | null;
  open: (item: MenuItem) => void;
  close: () => void;
} | null>(null);

export function ItemSheetProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const value = useMemo(() => ({ item, open: setItem, close: () => setItem(null) }), [item]);
  return <ItemSheetContext.Provider value={value}>{children}</ItemSheetContext.Provider>;
}

export function useItemSheet() {
  const ctx = useContext(ItemSheetContext);
  if (!ctx) throw new Error("useItemSheet must be used inside ItemSheetProvider");
  return ctx;
}

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { allItems, type MenuItem } from "@/data/menu";

export interface Pick {
  key: string;
  itemId: number;
  quantity: number;
  options: Record<string, string>;
  note: string;
}

interface PicksContextValue {
  picks: (Pick & { item: MenuItem })[];
  count: number;
  total: number;
  bump: number;
  ready: boolean;
  drawerOpen: boolean;
  staffOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  setStaffOpen: (open: boolean) => void;
  add: (item: MenuItem, quantity: number, options: Record<string, string>, note?: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  setNote: (key: string, note: string) => void;
  clear: () => void;
  table: string;
  setTable: (table: string) => void;
}

const STORAGE_KEY = "chiaro-my-picks-v1";
const PicksContext = createContext<PicksContextValue | null>(null);

const makeKey = (itemId: number, options: Record<string, string>) =>
  `${itemId}|${Object.entries(options).sort().map(([k, v]) => `${k}:${v}`).join(",")}`;

export function PicksProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Pick[]>([]);
  const [ready, setReady] = useState(false);
  const [bump, setBump] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [table, setTable] = useState("");

  useEffect(() => {
    let restored: Pick[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw);
    } catch {
      // Storage can be blocked or hold bad data; start with an empty list.
    }
    // Reading localStorage has to wait for the client, so this one state update is deliberate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Array.isArray(restored)) setStored(restored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // The list still works for this visit.
    }
  }, [stored, ready]);

  const add = useCallback<PicksContextValue["add"]>((item, quantity, options, note = "") => {
    const key = makeKey(item.id, options);
    setStored((prev) => {
      const found = prev.find((p) => p.key === key);
      if (found) {
        return prev.map((p) =>
          p.key === key ? { ...p, quantity: p.quantity + quantity, note: note || p.note } : p,
        );
      }
      return [...prev, { key, itemId: item.id, quantity, options, note }];
    });
    setBump((b) => b + 1);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setStored((prev) =>
      quantity <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, quantity } : p)),
    );
  }, []);

  const setNote = useCallback((key: string, note: string) => {
    setStored((prev) => prev.map((p) => (p.key === key ? { ...p, note } : p)));
  }, []);

  const clear = useCallback(() => setStored([]), []);

  const value = useMemo<PicksContextValue>(() => {
    const picks = stored.flatMap((p) => {
      const item = allItems.find((i) => i.id === p.itemId);
      return item ? [{ ...p, item }] : [];
    });
    return {
      picks,
      count: picks.reduce((n, p) => n + p.quantity, 0),
      total: picks.reduce((n, p) => n + p.quantity * p.item.price, 0),
      bump,
      ready,
      drawerOpen,
      staffOpen,
      setDrawerOpen,
      setStaffOpen,
      add,
      setQuantity,
      setNote,
      clear,
      table,
      setTable,
    };
  }, [stored, bump, ready, drawerOpen, staffOpen, add, setQuantity, setNote, clear, table]);

  return <PicksContext.Provider value={value}>{children}</PicksContext.Provider>;
}

export function usePicks() {
  const ctx = useContext(PicksContext);
  if (!ctx) throw new Error("usePicks must be used inside PicksProvider");
  return ctx;
}

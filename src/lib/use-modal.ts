"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";

const FOCUSABLE =
  'a[href], button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Shared behaviour for every overlay: traps focus, closes on Escape, stops the page
// scrolling behind it, and returns focus to whatever opened it.
export function useModal(open: boolean, onClose: () => void, ref: RefObject<HTMLElement | null>) {
  const { lock, unlock } = useSmoothScroll();
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lock();
    const node = ref.current;
    (node?.querySelector<HTMLElement>("[data-autofocus]") ?? node)?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!node.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlock();
      // If another overlay opened while this one animated out, leave focus with it.
      if (!document.querySelector('[role="dialog"][aria-modal="true"]')) previous?.focus?.({ preventScroll: true });
    };
  }, [open, ref, lock, unlock]);
}

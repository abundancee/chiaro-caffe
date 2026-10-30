"use client";

import { useState } from "react";
import { FilePdfIcon } from "@phosphor-icons/react/dist/ssr";
import { usePicks } from "@/lib/picks";

// Builds the list as a PDF and opens it in a new tab.
export function PdfButton({ className = "" }: { className?: string }) {
  const { picks, total, table } = usePicks();
  const [state, setState] = useState<"idle" | "working" | "failed">("idle");
  return (
    <button
      type="button"
      disabled={state === "working"}
      onClick={async () => {
        setState("working");
        try {
          const { openPicksPdf } = await import("@/lib/export-picks");
          await openPicksPdf(picks, total, table);
          setState("idle");
        } catch {
          setState("failed");
        }
      }}
      className={className}
    >
      <FilePdfIcon size={18} weight="light" aria-hidden />
      <span aria-live="polite">{state === "working" ? "Preparing" : state === "failed" ? "Try again" : "Save as PDF"}</span>
    </button>
  );
}

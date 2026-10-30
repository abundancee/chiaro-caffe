import type { ReactNode } from "react";

// A visibly marked gap for details the café still needs to supply. Filled in via src/data/site.ts.
export function Placeholder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-[3px] border border-dashed border-current px-1.5 py-0.5 font-mono text-[0.8125rem] normal-case tracking-normal not-italic font-normal leading-snug ${className}`}>
      {children}
    </span>
  );
}

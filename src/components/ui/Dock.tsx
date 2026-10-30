"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiceFiveIcon, ForkKnifeIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import { useSurprise } from "@/lib/surprise";
import { BagButton } from "./Bag";

// Thumb-reach navigation on phones, where most guests arrive from a table QR code.
export function Dock() {
  const pathname = usePathname();
  const spin = useSurprise();
  const item = "flex h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[0.6875rem] font-semibold leading-none";
  return (
    <nav aria-label="Quick" className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-1 rounded-full border-2 border-ink bg-cream p-1.5 shadow-hard">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`${item} ${pathname === "/" ? "bg-butter" : ""}`}>
          <HouseIcon size={22} weight="duotone" aria-hidden /> Home
        </Link>
        <Link href="/menu" aria-current={pathname === "/menu" ? "page" : undefined} className={`${item} ${pathname === "/menu" ? "bg-butter" : ""}`}>
          <ForkKnifeIcon size={22} weight="duotone" aria-hidden /> Menu
        </Link>
        <button type="button" onClick={spin} className={item}>
          <DiceFiveIcon size={22} weight="duotone" aria-hidden /> Surprise
        </button>
        <BagButton className="h-12 w-14 shrink-0 rounded-full bg-marmalade" />
      </div>
    </nav>
  );
}

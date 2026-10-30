"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForkKnifeIcon, HouseSimpleIcon, ShuffleIcon } from "@phosphor-icons/react/dist/ssr";
import { useSurprise } from "@/lib/surprise";
import { BagButton } from "./Bag";

// Thumb-reach navigation on phones, where most guests arrive from a table QR code.
export function Dock() {
  const pathname = usePathname();
  const spin = useSurprise();
  const item = "flex h-13 flex-1 flex-col items-center justify-center gap-1 text-[0.6875rem] leading-none";
  const on = (p: string) => (pathname === p ? "text-cream" : "text-cream/80");
  return (
    <nav aria-label="Quick" className="on-dark fixed inset-x-0 bottom-0 z-40 bg-ink/95 pb-[env(safe-area-inset-bottom)] text-cream shadow-[0_-1px_0_var(--color-line-dark)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`${item} ${on("/")}`}>
          <HouseSimpleIcon size={22} weight={pathname === "/" ? "fill" : "light"} aria-hidden /> Home
        </Link>
        <Link href="/menu" aria-current={pathname === "/menu" ? "page" : undefined} className={`${item} ${on("/menu")}`}>
          <ForkKnifeIcon size={22} weight={pathname === "/menu" ? "fill" : "light"} aria-hidden /> Menu
        </Link>
        <button type="button" onClick={spin} className={`${item} text-cream/80`}>
          <ShuffleIcon size={22} weight="light" aria-hidden /> Surprise
        </button>
        <BagButton className={`${item}`} />
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ListIcon, ShoppingBagOpenIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { navLinks, site } from "@/data/site";
import { usePicks } from "@/lib/picks";
import { useModal } from "@/lib/use-modal";
import { OpenStatus } from "./OpenStatus";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const { count, bump, ready, setDrawerOpen } = usePicks();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 16);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 96);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = isHome && atTop;
  const onDark = overHero && !menuOpen;

  return (
    <>
      <header
        data-site-header
        data-hidden={hidden && !menuOpen ? "true" : "false"}
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color,box-shadow] duration-300 ease-out ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${onDark ? "on-dark bg-transparent text-oat" : "bg-oat/90 text-espresso backdrop-blur-md"} ${
          !overHero && !atTop ? "shadow-[0_1px_0_var(--color-line)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[110rem] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Link href="/" aria-label={`${site.name}, home`} className="relative block h-7 w-[6.5rem] md:h-8 md:w-[7.5rem]">
            <Image
              src={onDark ? "/images/site/wordmark-oat.png" : "/images/site/wordmark-espresso.png"}
              alt=""
              fill
              sizes="120px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="group relative py-1 text-[0.9375rem]">
                {l.label}
                <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <OpenStatus className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Open my picks, ${ready ? count : 0} ${count === 1 ? "item" : "items"}`}
              className="relative flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10"
            >
              <m.span
                key={bump}
                initial={bump ? { scale: 0.72, rotate: -10 } : false}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 520, damping: 18 }}
                className="flex"
              >
                <ShoppingBagOpenIcon size={24} aria-hidden />
              </m.span>
              {ready && count > 0 && (
                <span
                  aria-hidden
                  className={`absolute right-0.5 top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-1 text-[0.6875rem] font-medium tabular-nums ${
                    onDark ? "bg-oat text-espresso" : "bg-espresso text-oat"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 md:hidden"
            >
              <ListIcon size={24} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  return (
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      tabIndex={-1}
      className="on-dark fixed inset-0 z-50 flex flex-col bg-espresso text-oat outline-none md:hidden"
      initial={{ clipPath: "circle(0% at calc(100% - 38px) 32px)" }}
      animate={{ clipPath: "circle(150% at calc(100% - 38px) 32px)" }}
      exit={{ clipPath: "circle(0% at calc(100% - 38px) 32px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <span className="relative block h-7 w-[6.5rem]">
          <Image src="/images/site/wordmark-oat.png" alt={site.name} fill sizes="104px" className="object-contain object-left" />
        </span>
        <button type="button" data-autofocus onClick={onClose} aria-label="Close navigation" className="flex size-11 items-center justify-center rounded-full">
          <XIcon size={24} aria-hidden />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6">
        {navLinks.map((l, i) => (
          <m.div
            key={l.href}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 24, delay: 0.08 + i * 0.05 }}
          >
            <Link href={l.href} onClick={onClose} className="block py-2 font-display text-[3rem] leading-none">
              {l.label}
            </Link>
          </m.div>
        ))}
      </nav>
      <div className="flex items-center justify-between px-6 pb-8 text-[0.9375rem] text-oat/80">
        <a href={`tel:${site.phoneInternational}`}>{site.phone}</a>
        <OpenStatus />
      </div>
    </m.div>
  );
}

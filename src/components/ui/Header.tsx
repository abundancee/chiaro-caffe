"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { HouseIcon, ListIcon, MapTrifoldIcon, PhoneIcon, ForkKnifeIcon, SmileyIcon, StarIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { navLinks, site } from "@/data/site";
import { useModal } from "@/lib/use-modal";
import { OpenStatus } from "./OpenStatus";
import { BagButton } from "./Bag";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 120);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        data-site-header
        data-hidden={hidden && !menuOpen ? "true" : "false"}
        className={`fixed inset-x-0 top-2 z-40 px-2 transition-transform duration-300 ease-out md:top-3 md:px-4 ${hidden && !menuOpen ? "-translate-y-[130%]" : ""}`}
      >
        <div className="mx-auto flex h-14 max-w-[100rem] items-center justify-between gap-3 rounded-full border-2 border-ink bg-cream/90 pl-4 pr-1.5 shadow-hard-sm backdrop-blur-md md:h-16 md:pl-6 md:pr-2">
          <Link href="/" aria-label={`${site.name}, home`} className="relative block h-7 w-[6.25rem] md:h-8 md:w-[7rem]">
            <Image src="/images/site/wordmark-espresso.png" alt="" fill sizes="112px" className="object-contain object-left" priority />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 font-semibold transition-colors hover:bg-butter">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <OpenStatus className="mr-2 hidden sm:inline-flex" />
            <BagButton className="hidden size-11 rounded-full transition-colors hover:bg-butter md:flex" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="flex size-11 items-center justify-center rounded-full bg-ink text-cream md:hidden"
            >
              <ListIcon size={22} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}

const rows = [
  { href: "/", label: "Home", Icon: HouseIcon, bg: "bg-butter" },
  { href: "/menu", label: "Menu", Icon: ForkKnifeIcon, bg: "bg-marmalade" },
  { href: "/#about", label: "About", Icon: SmileyIcon, bg: "bg-pistachio" },
  { href: "/#reviews", label: "Reviews", Icon: StarIcon, bg: "bg-blush" },
  { href: "/#visit", label: "Visit", Icon: MapTrifoldIcon, bg: "bg-taupe" },
];

function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModal(true, onClose, ref);
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Navigation" tabIndex={-1} className="fixed inset-0 z-50 flex flex-col outline-none md:hidden">
      <nav aria-label="Mobile" className="flex flex-1 flex-col">
        {rows.map((r, i) => (
          <m.div
            key={r.href}
            className={`flex flex-1 ${r.bg}`}
            initial={{ x: "-101%" }}
            animate={{ x: 0 }}
            exit={{ x: "101%" }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1], delay: i * 0.045 }}
          >
            <Link href={r.href} onClick={onClose} className="flex w-full items-center justify-between px-6 text-ink">
              <span className="display text-[3.25rem]">{r.label}</span>
              <r.Icon size={44} weight="duotone" aria-hidden />
            </Link>
          </m.div>
        ))}
        <m.div
          className="on-dark flex items-center justify-between bg-ink px-6 py-4 text-cream"
          initial={{ x: "-101%" }}
          animate={{ x: 0 }}
          exit={{ x: "101%" }}
          transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1], delay: 0.24 }}
        >
          <a href={`tel:${site.phoneInternational}`} className="flex items-center gap-2 font-semibold">
            <PhoneIcon size={20} weight="duotone" aria-hidden /> {site.phone}
          </a>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close navigation" className="flex size-11 items-center justify-center rounded-full bg-cream text-ink">
            <XIcon size={22} weight="bold" aria-hidden />
          </button>
        </m.div>
      </nav>
    </div>
  );
}

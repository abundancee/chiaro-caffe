"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { navLinks, site } from "@/data/site";
import { useModal } from "@/lib/use-modal";
import { OpenStatus } from "./OpenStatus";
import { BagButton } from "./Bag";

export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 16);
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 120);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = pathname === "/" && atTop;

  return (
    <>
      <header
        data-site-header
        data-hidden={hidden && !menuOpen ? "true" : "false"}
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color] duration-500 ease-out ${hidden && !menuOpen ? "-translate-y-full" : ""} ${
          onDark ? "on-dark bg-transparent text-cream" : "bg-cream/92 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[110rem] items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <Link href="/" aria-label={`${site.name}, home`} className="relative block h-7 w-[6.25rem] md:h-8 md:w-[7rem]">
            <Image src={onDark ? "/images/site/wordmark-oat.png" : "/images/site/wordmark-espresso.png"} alt="" fill sizes="112px" className="object-contain object-left" priority />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="group relative py-1 text-[0.9375rem]">
                {l.label}
                <span className="absolute inset-x-0 -bottom-px h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <OpenStatus className="mr-1 hidden sm:inline-flex" />
            <BagButton className="hidden size-11 md:flex" />
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen} className="flex size-11 items-center justify-center md:hidden">
              <ListIcon size={26} weight="light" aria-hidden />
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
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="on-dark fixed inset-0 z-50 flex flex-col bg-ink text-cream outline-none md:hidden"
    >
      <div className="flex h-16 items-center justify-between px-4">
        <span className="relative block h-7 w-[6.25rem]">
          <Image src="/images/site/wordmark-oat.png" alt={site.name} fill sizes="100px" className="object-contain object-left" />
        </span>
        <button type="button" data-autofocus onClick={onClose} aria-label="Close navigation" className="flex size-11 items-center justify-center">
          <XIcon size={26} weight="light" aria-hidden />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-4">
        {[{ href: "/", label: "Home" }, ...navLinks].map((l, i) => (
          <div key={l.href} className="overflow-hidden border-t border-line-dark last:border-b">
            <m.div initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.06 }}>
              <Link href={l.href} onClick={onClose} className="display flex items-baseline justify-between py-3 text-[3.75rem]">
                {l.label}
                <span className="accent text-lg text-cream/70">0{i + 1}</span>
              </Link>
            </m.div>
          </div>
        ))}
      </nav>
      <div className="flex items-center justify-between px-4 pb-8 text-[0.9375rem] text-cream/80">
        <a href={`tel:${site.phoneInternational}`}>{site.phone}</a>
        <OpenStatus />
      </div>
    </m.div>
  );
}

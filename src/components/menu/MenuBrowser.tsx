"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { DiceFiveIcon, FireIcon, MagnifyingGlassIcon, SnowflakeIcon, SquaresFourIcon, StarIcon, XIcon, CoffeeIcon, ForkKnifeIcon, WindIcon } from "@phosphor-icons/react/dist/ssr";
import { menu, type MenuItem } from "@/data/menu";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";
import { Mascot } from "@/components/ui/Mascot";
import { SectionSticker, sectionStyle } from "@/components/ui/SectionIcon";
import { useSurprise } from "@/lib/surprise";
import { ItemRow } from "./ItemRow";
import { SectionSheet } from "./SectionSheet";

type Filter = "all" | "popular" | "hot" | "cold";
const filters = [
  { id: "all" as const, label: "All", Icon: SquaresFourIcon },
  { id: "popular" as const, label: "Popular", Icon: StarIcon },
  { id: "hot" as const, label: "Hot drinks", Icon: FireIcon },
  { id: "cold" as const, label: "Cold drinks", Icon: SnowflakeIcon },
];

const categoryCards = [
  { id: "food", Icon: ForkKnifeIcon, bg: "bg-marmalade", rot: "-rotate-1" },
  { id: "beverages", Icon: CoffeeIcon, bg: "bg-pistachio", rot: "rotate-1" },
  { id: "tobacco", Icon: WindIcon, bg: "bg-blush", rot: "-rotate-1" },
];

const normalise = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const matches = (item: MenuItem, query: string, filter: Filter) => {
  if (filter === "popular" && !item.popular) return false;
  if ((filter === "hot" || filter === "cold") && item.temperature !== filter) return false;
  if (!query) return true;
  return normalise(`${item.name} ${item.description ?? ""}`).includes(query);
};

export function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(menu[0].sections[0].id);
  const [sheet, setSheet] = useState(false);
  const tabs = useRef<HTMLDivElement>(null);
  const side = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const clickLock = useRef(false);
  const pendingJump = useRef<string | null>(null);
  const { scrollTo } = useSmoothScroll();
  const surprise = useSurprise();
  const q = normalise(query.trim());

  const results = useMemo(
    () =>
      menu
        .map((c) => ({ ...c, sections: c.sections.map((s) => ({ ...s, items: s.items.filter((i) => matches(i, q, filter)) })).filter((s) => s.items.length > 0) }))
        .filter((c) => c.sections.length > 0),
    [q, filter],
  );
  const count = results.reduce((n, c) => n + c.sections.reduce((a, s) => a + s.items.length, 0), 0);
  const firstSection = results[0]?.sections[0]?.id;
  const current = results.some((c) => c.sections.some((s) => s.id === active)) ? active : firstSection;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible[0]) return;
        setActive(visible[0].target === intro.current ? (firstSection ?? visible[0].target.id) : visible[0].target.id);
      },
      { rootMargin: "-22% 0px -70% 0px" },
    );
    document.querySelectorAll("[data-menu-section]").forEach((s) => observer.observe(s));
    if (intro.current) observer.observe(intro.current);
    return () => observer.disconnect();
  }, [results, firstSection]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const row = tabs.current;
    const tab = row?.querySelector<HTMLElement>(`[data-tab="${current}"]`);
    if (row && tab && row.offsetParent !== null) row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    const list = side.current;
    const item = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (list && item && list.offsetParent !== null) list.scrollTo({ top: item.offsetTop - list.clientHeight / 2, behavior: reduce ? "auto" : "smooth" });
  }, [current]);

  const go = (id: string) => {
    clickLock.current = true;
    window.setTimeout(() => {
      clickLock.current = false;
    }, 1200);
    setActive(id);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <div ref={intro} className="relative mx-auto max-w-[100rem] px-4 pt-22 md:px-8 md:pt-28">
        <div className="flex items-end justify-between gap-2">
          <h1 className="display text-[3.5rem] md:text-[7rem]">
            What’s it <span className="accent">gonna</span> be?
          </h1>
          <Mascot className="bob w-20 shrink-0 md:w-32" />
        </div>

        <ul className="mt-5 grid grid-cols-3 gap-2 md:max-w-3xl md:gap-4">
          {categoryCards.map((c) => {
            const cat = menu.find((x) => x.id === c.id)!;
            const total = cat.sections.reduce((n, s) => n + s.items.length, 0);
            return (
              <li key={c.id}>
                <m.button
                  type="button"
                  whileHover={{ y: -4, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => go(cat.sections[0].id)}
                  className={`flex h-full w-full flex-col items-start gap-3 rounded-tile border-2 border-ink p-3 text-left shadow-hard-sm md:p-4 ${c.bg} ${c.rot}`}
                >
                  <c.Icon size={34} weight="duotone" aria-hidden />
                  <span>
                    <span className="block text-[0.9375rem] font-extrabold leading-tight md:text-lg">{cat.name}</span>
                    <span className="block text-[0.75rem] font-medium">{total} items</span>
                  </span>
                </m.button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative md:w-80">
            <MagnifyingGlassIcon size={20} weight="bold" aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Croissant, matcha, pizza…"
              className="h-12 w-full rounded-full border-2 border-ink bg-paper pl-11 pr-11 font-medium placeholder:text-roast [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0.5 top-0.5 flex size-11 items-center justify-center rounded-full">
                <XIcon size={18} weight="bold" aria-hidden />
              </button>
            )}
          </div>
          <div role="group" aria-label="Filter the menu" className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
            {filters.map((f) => (
              <m.button
                key={f.id}
                type="button"
                whileTap={{ scale: 0.92 }}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border-2 border-ink px-3.5 text-[0.875rem] font-semibold transition-colors ${filter === f.id ? "bg-ink text-cream" : "bg-paper hover:bg-butter"}`}
              >
                <f.Icon size={16} weight="duotone" aria-hidden /> {f.label}
              </m.button>
            ))}
            <m.button type="button" whileTap={{ scale: 0.92 }} onClick={surprise} className="hidden min-h-11 shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-butter px-3.5 text-[0.875rem] font-bold md:flex">
              <DiceFiveIcon size={18} weight="duotone" aria-hidden /> Surprise me
            </m.button>
          </div>
        </div>
      </div>

      {/* Sticky section bar on phones and tablets */}
      <div data-sticky-bar className="sticky top-0 z-30 mt-3 border-y-2 border-ink bg-cream transition-[top] duration-300 lg:hidden [body:has([data-site-header][data-hidden=false])_&]:top-[4.25rem] md:[body:has([data-site-header][data-hidden=false])_&]:top-[5rem]">
        <nav aria-label="Menu sections" className="flex items-center">
          <button type="button" onClick={() => setSheet(true)} aria-label="Show all sections" className="flex h-13 shrink-0 items-center gap-1.5 border-r-2 border-ink bg-butter px-3 text-[0.8125rem] font-bold">
            <SquaresFourIcon size={20} weight="duotone" aria-hidden /> All
          </button>
          <div ref={tabs} className="no-scrollbar relative flex items-center gap-1 overflow-x-auto px-2">
            {results.flatMap((c) =>
              c.sections.map((s) => {
                const on = s.id === current;
                const { Icon } = sectionStyle[s.id];
                return (
                  <button
                    key={s.id}
                    type="button"
                    data-tab={s.id}
                    aria-current={on ? "true" : undefined}
                    onClick={() => go(s.id)}
                    className="relative my-1.5 flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[0.875rem] font-semibold capitalize"
                  >
                    {on && <m.span layoutId="tab-pill" className="absolute inset-0 rounded-full border-2 border-ink bg-marmalade" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
                    <Icon size={18} weight="duotone" aria-hidden className="relative" />
                    <span className="relative">{s.name}</span>
                  </button>
                );
              }),
            )}
          </div>
        </nav>
      </div>

      <div className="mx-auto max-w-[100rem] px-4 pb-32 pt-4 md:px-8 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10 lg:pt-8">
        {/* Sidebar on large screens: every section always in view */}
        <aside className="hidden lg:block">
          <nav ref={side} aria-label="Menu sections" data-lenis-prevent className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            {results.map((c) => (
              <div key={c.id} className="mb-4">
                <p className="eyebrow mb-1 px-2">{c.name}</p>
                <ul>
                  {c.sections.map((s) => {
                    const on = s.id === current;
                    return (
                      <li key={s.id}>
                        <button type="button" onClick={() => go(s.id)} aria-current={on ? "true" : undefined} className={`flex w-full items-center gap-2 rounded-full border-2 px-2 py-1 text-left text-[0.9375rem] font-semibold capitalize transition-colors ${on ? "border-ink bg-marmalade" : "border-transparent hover:bg-butter"}`}>
                          <SectionSticker id={s.id} size={16} className="size-7 !border" />
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <p aria-live="polite" className="sr-only">
            {count} {count === 1 ? "item" : "items"} shown
          </p>

          {count === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Mascot mood="wow" className="w-28" />
              <h2 className="display mt-4 text-[2.25rem]">Nothing by that name</h2>
              <p className="mt-1 font-medium text-roast">Try another word, or roll the dice.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => { setQuery(""); setFilter("all"); }} className="btn bg-butter">
                  Clear search
                </button>
                <button type="button" onClick={surprise} className="btn bg-marmalade">
                  <DiceFiveIcon size={20} weight="duotone" aria-hidden /> Surprise me
                </button>
              </div>
            </div>
          )}

          {results.map((c) => (
            <div key={c.id}>
              {c.sections.map((s) => {
                const { bg } = sectionStyle[s.id];
                return (
                  <section key={s.id} id={s.id} data-menu-section aria-labelledby={`${s.id}-h`} className="mb-8 scroll-mt-16 md:scroll-mt-20 lg:scroll-mt-4">
                    <div className={`mb-3 flex items-center justify-between gap-3 rounded-tile border-2 border-ink px-3 py-2.5 md:px-5 md:py-4 ${bg}`}>
                      <h2 id={`${s.id}-h`} className="display text-[1.875rem] capitalize md:text-[3rem]">
                        {s.name}
                      </h2>
                      <SectionSticker id={s.id} size={26} className="size-11 bg-paper md:size-14" />
                    </div>
                    <ul className="grid gap-2.5 md:grid-cols-2 md:gap-3 2xl:grid-cols-3">
                      {s.items.map((item, i) => (
                        <li key={item.id}>
                          <ItemRow item={item} priority={s.id === firstSection && i < 3} />
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          // The page stays locked until the sheet has gone, so the jump waits for that.
          const id = pendingJump.current;
          pendingJump.current = null;
          if (id) window.setTimeout(() => go(id), 40);
        }}
      >
        {sheet && (
          <SectionSheet
            categories={results}
            onClose={() => setSheet(false)}
            onPick={(id) => {
              pendingJump.current = id;
              setSheet(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

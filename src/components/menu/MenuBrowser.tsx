"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { MagnifyingGlassIcon, ShuffleIcon, SquaresFourIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/ui/Photo";
import { menu, type MenuItem } from "@/data/menu";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";
import { SectionGlyph } from "@/components/ui/SectionIcon";
import { useSurprise } from "@/lib/surprise";
import { ItemRow } from "./ItemRow";
import { SectionSheet } from "./SectionSheet";

type Filter = "all" | "popular" | "hot" | "cold";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "hot", label: "Hot drinks" },
  { id: "cold", label: "Cold drinks" },
];

// Each category opens with its own framed photo.
const chapters: Record<string, { numeral: string; src: string; alt: string }> = {
  food: { numeral: "I", src: "/images/site/number-start.webp", alt: "Two golden croissants on black glass" },
  beverages: { numeral: "II", src: "/images/site/number-coffee.webp", alt: "A cup of coffee on a dark saucer" },
  tobacco: { numeral: "III", src: "/images/site/gallery-hookah.webp", alt: "A row of hookahs on a warmly lit bar" },
};

// The page falls into evening as you reach these sections.
const afterDark = new Set(["wine", "cocktails", "beer", "shisha"]);
const allSectionIds = menu.flatMap((c) => c.sections.map((s) => s.id));

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
      <div ref={intro} className="on-dark bg-ink px-4 pb-8 pt-24 text-cream md:px-8 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-[110rem]">
          <p className="pop eyebrow text-brass">{allSectionIds.length} sections, {menu.reduce((n, c) => n + c.sections.reduce((a, x) => a + x.items.length, 0), 0)} items</p>
          <h1 className="slide-up display mt-3 pb-[0.1em] text-[5rem] md:text-[clamp(7rem,13vw,14rem)]">
            The <em className="accent">menu</em>
          </h1>
          <ul className="mt-5 grid grid-cols-3 gap-2.5 md:mt-8 md:gap-6">
            {menu.map((cat, i) => {
              const ch = chapters[cat.id];
              return (
                <li key={cat.id} className="slide-up" style={{ ["--d" as string]: `${0.2 + i * 0.1}s` }}>
                  <button type="button" onClick={() => go(cat.sections[0].id)} className="group block w-full text-left">
                    <span className="sticker block aspect-[4/5] md:aspect-[16/10]">
                      <Photo src={ch.src} alt="" fill priority sizes="(min-width: 768px) 32vw, 32vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
                      <span className="eyebrow absolute left-2.5 top-2.5 text-cream md:left-4 md:top-4">{ch.numeral}</span>
                    </span>
                    <span className="mt-2.5 block text-[1.1875rem] leading-tight underline-offset-4 group-hover:underline md:text-[2rem]">
                      <span className="serif">{cat.name}</span>
                    </span>
                    <span className="block text-[0.8125rem] tabular-nums text-cream/70">{cat.sections.reduce((n, sec) => n + sec.items.length, 0)} items</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={`menu-tone ${current && afterDark.has(current) ? "tone-dark" : ""}`}>
      <div className="mx-auto max-w-[110rem] px-4 pt-5 md:px-8 md:pt-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-80">
            <MagnifyingGlassIcon size={20} weight="light" aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Croissant, matcha, pizza"
              className="h-12 w-full rounded-tile border border-line bg-paper pl-11 pr-11 placeholder:text-roast [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0.5 top-0.5 flex size-11 items-center justify-center">
                <XIcon size={18} aria-hidden />
              </button>
            )}
          </div>
          <div role="group" aria-label="Filter the menu" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`min-h-11 shrink-0 rounded-tile px-3.5 text-[0.9375rem] transition-colors duration-300 ${filter === f.id ? "bg-ink text-cream" : "hover:bg-sand"}`}
              >
                {f.label}
              </button>
            ))}
            <button type="button" onClick={surprise} className="hidden min-h-11 shrink-0 items-center gap-1.5 rounded-tile px-3.5 text-[0.9375rem] transition-colors duration-300 hover:bg-sand md:flex">
              <ShuffleIcon size={18} weight="light" aria-hidden /> Surprise me
            </button>
          </div>
        </div>
      </div>

      {/* Sticky section bar on phones and tablets */}
      <div data-sticky-bar className="sticky top-0 z-30 mt-3 border-y border-line bg-cream/95 backdrop-blur-md transition-[top] duration-300 lg:hidden [body:has([data-site-header][data-hidden=false])_&]:top-16 md:[body:has([data-site-header][data-hidden=false])_&]:top-20">
        <nav aria-label="Menu sections" className="flex items-center">
          <button type="button" onClick={() => setSheet(true)} aria-label="Show all sections" className="flex h-12 shrink-0 items-center gap-1.5 border-r border-line px-3 text-[0.875rem]">
            <SquaresFourIcon size={20} weight="light" aria-hidden /> All
          </button>
          <div ref={tabs} className="no-scrollbar relative flex items-center gap-1 overflow-x-auto px-2">
            {results.flatMap((c) =>
              c.sections.map((s) => {
                const on = s.id === current;
                return (
                  <button
                    key={s.id}
                    type="button"
                    data-tab={s.id}
                    aria-current={on ? "true" : undefined}
                    onClick={() => go(s.id)}
                    className={`relative h-12 shrink-0 whitespace-nowrap px-3 text-[0.9375rem] capitalize transition-colors ${on ? "text-ink" : "text-roast"}`}
                  >
                    {s.name}
                    {on && <m.span layoutId="tab-line" className="absolute inset-x-3 bottom-0 h-px bg-brass" transition={{ type: "spring", stiffness: 380, damping: 40 }} />}
                  </button>
                );
              }),
            )}
          </div>
        </nav>
      </div>

      <div className="mx-auto max-w-[110rem] px-4 pb-28 pt-4 md:px-8 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-14 lg:pt-8">
        {/* Sidebar on large screens: every section always in view */}
        <aside className="hidden lg:block">
          <nav ref={side} aria-label="Menu sections" data-lenis-prevent className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            {results.map((c) => (
              <div key={c.id} className="mb-4">
                <p className="eyebrow mb-2 text-roast">{c.name}</p>
                <ul>
                  {c.sections.map((s) => {
                    const on = s.id === current;
                    return (
                      <li key={s.id}>
                        <button type="button" onClick={() => go(s.id)} aria-current={on ? "true" : undefined} className={`flex w-full items-center gap-2.5 py-1 text-left text-[0.9375rem] capitalize transition-colors ${on ? "font-medium text-ink" : "text-roast hover:text-ink"}`}>
                          <SectionGlyph id={s.id} size={18} className={on ? "text-brass-ink" : ""} />
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
            <div className="py-16">
              <h2 className="display text-[3.25rem] md:text-[5rem]">Nothing <span className="accent">by that name</span></h2>
              <p className="mt-2 text-roast">Try another word, or let us choose for you.</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <button type="button" onClick={surprise} className="btn bg-ink text-cream">
                  <ShuffleIcon size={18} aria-hidden /> Surprise me
                </button>
                <button type="button" onClick={() => { setQuery(""); setFilter("all"); }} className="border-b border-ink pb-0.5">
                  Clear search
                </button>
              </div>
            </div>
          )}

          {results.map((c) => (
            <div key={c.id}>
              <div className="mb-8 mt-2 flex items-baseline gap-4 first:mt-0 md:mb-12">
                <span className="accent text-[1.5rem] text-brass-ink md:text-[2rem]">{chapters[c.id].numeral}</span>
                <p className="display text-[3.5rem] md:text-[clamp(5rem,8vw,8.5rem)]">{c.name}</p>
              </div>
              {c.sections.map((s) => (
                <section key={s.id} id={s.id} data-menu-section aria-labelledby={`${s.id}-h`} className="mb-12 scroll-mt-16 md:mb-20 md:scroll-mt-20 lg:scroll-mt-4">
                  <div className="row-in flex items-baseline justify-between gap-3 pb-3">
                    <h2 id={`${s.id}-h`} className="display flex items-baseline gap-3 text-[2.25rem] capitalize md:text-[3.25rem]">
                      <span className="eyebrow font-sans tabular-nums text-brass-ink">{String(allSectionIds.indexOf(s.id) + 1).padStart(2, "0")}</span>
                      {s.name}
                    </h2>
                    <span className="accent shrink-0 text-[1.0625rem] text-roast md:text-[1.25rem]">
                      {s.items.length} {s.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <span aria-hidden className="rule-in block h-px origin-left bg-brass" />
                  <ul className="grid md:grid-cols-2 md:gap-x-10 2xl:grid-cols-3">
                    {s.items.map((item, i) => (
                      <li key={item.id} className="row-in">
                        <ItemRow item={item} priority={s.id === firstSection && i < 3} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ))}
        </div>
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

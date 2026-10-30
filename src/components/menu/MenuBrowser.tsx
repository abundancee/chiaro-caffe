"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { m } from "motion/react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { menu, type MenuItem } from "@/data/menu";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";
import { ItemCard } from "./ItemCard";

type Filter = "all" | "popular" | "hot" | "cold";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "hot", label: "Hot drinks" },
  { id: "cold", label: "Cold drinks" },
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
  const tabs = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();
  const clickLock = useRef(false);
  const q = normalise(query.trim());

  const results = useMemo(
    () =>
      menu
        .map((c) => ({
          ...c,
          sections: c.sections
            .map((s) => ({ ...s, items: s.items.filter((i) => matches(i, q, filter)) }))
            .filter((s) => s.items.length > 0),
        }))
        .filter((c) => c.sections.length > 0),
    [q, filter],
  );
  const count = results.reduce((n, c) => n + c.sections.reduce((m, s) => m + s.items.length, 0), 0);
  const firstSection = results[0]?.sections[0]?.id;
  const current = results.some((c) => c.sections.some((s) => s.id === active)) ? active : firstSection;

  // Keep the active tab in step with the section under the sticky bar.
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-menu-section]")];
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible[0]) return;
        // Back at the page intro, the first section is the current one.
        setActive(visible[0].target === intro.current ? (firstSection ?? visible[0].target.id) : visible[0].target.id);
      },
      { rootMargin: "-22% 0px -70% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    if (intro.current) observer.observe(intro.current);
    return () => observer.disconnect();
  }, [results, firstSection]);

  useEffect(() => {
    const row = tabs.current;
    const tab = row?.querySelector<HTMLElement>(`[data-tab="${current}"]`);
    if (!row || !tab) return;
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [current]);

  const go = (id: string) => {
    clickLock.current = true;
    window.setTimeout(() => {
      clickLock.current = false;
    }, 1100);
    setActive(id);
    scrollTo(`#${id}`);
  };

  const reset = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <>
      <div ref={intro} className="mx-auto max-w-[110rem] px-4 pt-24 md:px-8 md:pt-32">
        <h1 className="text-title">The menu</h1>
        <p className="mt-2 max-w-prose text-roast">Tap anything to see it closer and add it to your list. Prices are in NGN.</p>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-72 lg:w-96">
            <MagnifyingGlassIcon size={20} aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-roast" />
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search croissant, matcha, pizza"
              className="h-12 w-full rounded-card border border-line bg-paper pl-11 pr-11 placeholder:text-roast/80 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0.5 top-0.5 flex size-11 items-center justify-center rounded-full text-roast">
                <XIcon size={18} aria-hidden />
              </button>
            )}
          </div>
          <div role="group" aria-label="Filter the menu" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {filters.map((f) => (
              <m.button
                key={f.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-[0.9375rem] transition-colors ${
                  filter === f.id ? "border-espresso bg-espresso text-oat" : "border-line hover:border-espresso"
                }`}
              >
                {f.label}
              </m.button>
            ))}
          </div>
        </div>
      </div>

      <div data-sticky-bar className="sticky top-0 z-30 mt-4 border-b border-line bg-oat/95 backdrop-blur-md transition-[top] duration-300 ease-out [body:has([data-site-header][data-hidden=false])_&]:top-16 md:[body:has([data-site-header][data-hidden=false])_&]:top-20">
        <nav aria-label="Menu sections" className="mx-auto max-w-[110rem]">
          <div ref={tabs} className="no-scrollbar relative flex gap-1 overflow-x-auto px-3 md:px-6">
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
                    className={`relative min-h-12 shrink-0 whitespace-nowrap px-3 text-[0.9375rem] capitalize transition-colors ${on ? "text-espresso" : "text-roast hover:text-espresso"}`}
                  >
                    {s.name}
                    {on && <m.span layoutId="tab-line" className="absolute inset-x-3 bottom-0 h-0.5 bg-espresso" transition={{ type: "spring", stiffness: 420, damping: 38 }} />}
                  </button>
                );
              }),
            )}
          </div>
        </nav>
      </div>

      <div className="mx-auto max-w-[110rem] px-4 pb-20 md:px-8 md:pb-32">
        <p aria-live="polite" className="sr-only">
          {count} {count === 1 ? "item" : "items"} shown
        </p>

        {count === 0 && (
          <div className="flex flex-col items-start py-20">
            <div className="arch mb-6 h-28 w-20 border border-taupe" aria-hidden />
            <h2 className="text-subtitle">Nothing matches that.</h2>
            <p className="mt-2 text-roast">Try another word, or clear the search and filters.</p>
            <button type="button" onClick={reset} className="mt-5 border-b border-espresso pb-0.5">
              Clear search and filters
            </button>
          </div>
        )}

        {results.map((c) => (
          <div key={c.id}>
            <h2 className="pt-12 font-sans text-eyebrow text-roast md:pt-16">{c.name}</h2>
            {c.sections.map((s) => (
              <section key={s.id} id={s.id} data-menu-section aria-labelledby={`${s.id}-heading`} className="scroll-mt-10 pt-4 md:scroll-mt-14 md:pt-6">
                <h3 id={`${s.id}-heading`} className="text-subtitle capitalize">
                  {s.name}
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 pb-8 sm:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 3xl:grid-cols-6">
                  {s.items.map((item, i) => (
                    <li key={item.id}>
                      <ItemCard item={item} priority={s.id === firstSection && i < 2} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

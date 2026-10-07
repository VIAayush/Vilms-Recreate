"use client";

import { useId, useMemo, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { ARTICLES, ARTICLE_CATEGORIES, type Article, type ArticleCategory } from "@/lib/site/articles";
import { EASE } from "@/components/site-ui/motion-tokens";
import { ArticleCard } from "./ArticleCard";

type Filter = "All" | ArticleCategory;

const haystack = (a: Article) => `${a.title} ${a.excerpt} ${a.category} ${a.tags.join(" ")}`.toLowerCase();

// asymmetric 12-column rhythm used while browsing: wide, narrow / narrow, wide
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/**
 * The blog index: one large featured article, animated category chips, live
 * search and the rest as cards. While a filter or a search is active the
 * featured block folds into the results.
 */
export function BlogIndex() {
  const uid = useId();
  const [cat, setCat] = useState<Filter>("All");
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const browsing = cat === "All" && !query;

  const results = useMemo(() => ARTICLES.filter((a) => (cat === "All" || a.category === cat) && (!query || haystack(a).includes(query))), [cat, query]);
  const [featured, ...rest] = ARTICLES;

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "All", label: "All", count: ARTICLES.length },
    ...ARTICLE_CATEGORIES.map((c) => ({ id: c as Filter, label: c, count: ARTICLES.filter((a) => a.category === c).length })),
  ];

  return (
    <div>
      {/* controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {chips.map((c) => {
            const on = cat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c.id)}
                className={clsx(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors",
                  on ? "border-transparent text-white" : "border-edge bg-panel text-fg-muted hover:border-edge-strong hover:text-fg",
                )}
              >
                {on ? <motion.span layoutId={`${uid}-chip`} transition={{ duration: 0.35, ease: EASE }} className="absolute inset-0 rounded-full bg-navy" /> : null}
                <span className="relative">{c.label}</span>
                <span className={clsx("relative font-mono text-[11px]", on ? "opacity-70" : "text-fg-faint")}>{c.count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-[340px]">
          <label htmlFor={`${uid}-q`} className="sr-only">
            Search articles
          </label>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint" />
          <input
            id={`${uid}-q`}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search: GST, rubric, hybrid…"
            autoComplete="off"
            className="v-field rounded-full py-3 pl-11 pr-10 [&::-webkit-search-cancel-button]:hidden"
          />
          {q ? (
            <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-fg-muted transition-colors hover:bg-sunken hover:text-fg">
              <X aria-hidden className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-faint">
        {browsing ? `${ARTICLES.length} guides and articles` : `${results.length} ${results.length === 1 ? "match" : "matches"}${cat !== "All" ? ` in ${cat}` : ""}${query ? ` for “${q.trim()}”` : ""}`}
      </p>

      {/* content */}
      <div className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {browsing ? (
            <motion.div key="browse" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
              <ArticleCard article={featured} variant="featured" />
              <div className="mt-6 grid gap-6 lg:grid-cols-12">
                {rest.map((a, i) => (
                  <ArticleCard key={a.slug} article={a} className={SPAN[i % SPAN.length]} />
                ))}
              </div>
            </motion.div>
          ) : results.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-[24px] border border-dashed border-edge-strong px-6 py-16 text-center">
              <p className="font-display text-[24px] font-medium tracking-[-0.03em]">Nothing matches that yet</p>
              <p className="mx-auto mt-2 max-w-[420px] text-[15px] text-fg-muted">Try a broader word, such as “payments”, “AI” or “hybrid”, or clear the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setCat("All");
                }}
                className="cta cta-outline cta-sm mt-6"
              >
                Show every article
              </button>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={clsx("grid gap-6", results.length > 1 && "md:grid-cols-2")}>
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((a) => (
                  <motion.div key={a.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, ease: EASE }} className="min-w-0">
                    <ArticleCard article={a} variant={results.length === 1 ? "featured" : "card"} className="h-full" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail, Search, X } from "lucide-react";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { useReducedMotion } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { brand } from "@/lib/content";
import type { FaqGroup } from "@/lib/site/faq";

// Searchable FAQ. Without a query it shows the groups (all of them, or the one
// picked in the chip bar) as accordions; with a query it switches to a flat
// list of matching answers with the matched words marked. Groups are deep
// links (#payments): the hash picks the chip, and picking a chip updates it.

const tokensOf = (q: string) => q.toLowerCase().split(/\s+/).filter(Boolean);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Marked({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map(escapeRe).join("|")})`, "gi");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-primary-tint px-0.5 text-fg">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const uid = useId();
  const reduced = useReducedMotion();
  const top = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const tokens = useMemo(() => tokensOf(query), [query]);
  const searching = tokens.length > 0;

  // matches per group for the current query
  const matches = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        hits: searching ? g.items.filter((it) => tokens.every((t) => `${it.q} ${it.a}`.toLowerCase().includes(t))) : g.items,
      })),
    [groups, tokens, searching],
  );
  const total = matches.reduce((n, g) => n + g.hits.length, 0);
  const visible = cat === "all" ? matches : matches.filter((g) => g.id === cat);
  const shown = visible.reduce((n, g) => n + g.hits.length, 0);

  const scrollToTop = useCallback(() => {
    const el = top.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  // Deep links: #payments selects the chip (on load and when the hash changes).
  useEffect(() => {
    const apply = (scroll: boolean) => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && groups.some((g) => g.id === id)) {
        setCat(id);
        if (scroll) window.setTimeout(scrollToTop, 30);
      }
    };
    apply(true);
    const onHash = () => apply(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [groups, scrollToTop]);

  // "/" jumps to the search box, like most docs sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pick = (id: string) => {
    setCat(id);
    const url = id === "all" ? window.location.pathname + window.location.search : `#${id}`;
    window.history.replaceState(null, "", url);
  };

  const clear = () => {
    setQuery("");
    input.current?.focus();
  };

  const summary = searching
    ? shown === 0
      ? "No answers match"
      : `${shown} ${shown === 1 ? "answer matches" : "answers match"} “${query.trim()}”`
    : `${shown} ${shown === 1 ? "answer" : "answers"}${cat === "all" ? ` in ${groups.length} topics` : ` in ${groups.find((g) => g.id === cat)?.label}`}`;

  return (
    <div ref={top}>
      {/* search */}
      <div className="relative">
        <label htmlFor={`${uid}-search`} className="sr-only">
          Search the FAQ
        </label>
        <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-faint" />
        <input
          ref={input}
          id={`${uid}-search`}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query) {
              e.preventDefault();
              setQuery("");
            }
          }}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search: Razorpay, GST, AI, domain, trial…"
          className="peer block w-full rounded-full border border-edge-strong bg-panel py-4 pl-14 pr-24 text-[17px] text-fg shadow-soft transition placeholder:text-fg-faint hover:border-fg-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button type="button" onClick={clear} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-fg-muted transition hover:bg-sunken hover:text-fg">
            <X aria-hidden className="h-4 w-4" />
          </button>
        ) : (
          <kbd aria-hidden className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-md border border-edge-strong px-2 py-0.5 font-mono text-[12px] text-fg-faint sm:block">
            /
          </kbd>
        )}
      </div>

      {/* category chips, stuck under the site bar */}
      <div className="sticky top-14 z-20 -mx-4 mt-5 border-b border-edge bg-canvas px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex items-center gap-4 py-3">
          <div role="tablist" aria-label="FAQ topics" className="no-scrollbar -mx-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 py-1">
            {[{ id: "all", label: "All", count: total }, ...matches.map((g) => ({ id: g.id, label: g.label, count: g.hits.length }))].map((c) => {
              const on = cat === c.id;
              const empty = searching && c.count === 0;
              return (
                <button
                  key={c.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => pick(c.id)}
                  className={clsx(
                    "relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-200",
                    on ? "text-white" : empty ? "text-fg-faint hover:text-fg-muted" : "text-fg-muted hover:bg-sunken hover:text-fg",
                  )}
                >
                  {on ? <motion.span layoutId={`${uid}-chip`} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} aria-hidden className="absolute inset-0 -z-0 rounded-full bg-navy" /> : null}
                  <span className="relative">
                    {c.label} <span className={clsx("font-mono text-[11.5px] tabular-nums", on ? "opacity-70" : "text-fg-faint")}>{c.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="hidden shrink-0 text-[13px] text-fg-muted lg:block" aria-live="polite">
            {summary}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[13px] text-fg-muted lg:hidden" aria-live="polite">
        {summary}
      </p>

      {/* content */}
      <div className="mt-8 min-h-[360px]" role="tabpanel">
        {searching ? (
          shown === 0 ? (
            <NoResults query={query.trim()} onClear={clear} />
          ) : (
            <ul className="divide-y divide-edge border-y border-edge">
              <AnimatePresence initial={false} mode="popLayout">
                {visible.flatMap((g) =>
                  g.hits.map((it) => (
                    <motion.li key={`${g.id}-${it.q}`} layout={reduced ? false : "position"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }} className="py-6">
                      <button type="button" onClick={() => pick(g.id)} className="tag mb-3 transition-colors hover:border-primary hover:text-primary" aria-label={`Show only ${g.label}`}>
                        {g.label}
                      </button>
                      <h3 className="text-[19px] font-medium leading-snug tracking-[-0.01em]">
                        <Marked text={it.q} tokens={tokens} />
                      </h3>
                      <p className="mt-2 max-w-[720px] text-[15.5px] leading-relaxed text-fg-muted">
                        <Marked text={it.a} tokens={tokens} />
                      </p>
                    </motion.li>
                  )),
                )}
              </AnimatePresence>
            </ul>
          )
        ) : (
          <div className="space-y-14 sm:space-y-20">
            {visible.map((g) => (
              <section key={g.id} id={g.id} className="grid scroll-mt-36 gap-4 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] lg:gap-14" aria-labelledby={`${uid}-${g.id}`}>
                <div className="lg:sticky lg:top-40 lg:self-start">
                  <h2 id={`${uid}-${g.id}`} className="font-display text-[clamp(28px,3.2vw,40px)] font-medium leading-[1.05] tracking-[-0.035em]">
                    {g.label}
                  </h2>
                  <p className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg-faint">
                    {g.items.length} {g.items.length === 1 ? "question" : "questions"}
                  </p>
                </div>
                <FaqAccordion key={`${g.id}-${cat}`} items={g.items} defaultOpen={cat === g.id ? 0 : null} />
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="rounded-[28px] border border-dashed border-edge-strong bg-canvas-alt px-6 py-12 text-center sm:px-10 sm:py-16">
      <p className="font-display text-[clamp(24px,3vw,34px)] font-medium leading-tight tracking-[-0.03em]">Nothing on “{query}” yet.</p>
      <p className="mx-auto mt-3 max-w-[460px] text-[16px] leading-relaxed text-fg-muted">Try a shorter word, or ask us directly. A person on the VILMS team will answer.</p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={`mailto:${brand.emails.general}?subject=${encodeURIComponent("A question about VILMS")}&body=${encodeURIComponent(`${query}\n`)}`} className="cta cta-primary">
          <Mail aria-hidden className="h-4 w-4" /> Ask {brand.emails.general}
        </a>
        <Link href="/contact" className="cta cta-ghost">
          Use the contact form <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
        <button type="button" onClick={onClear} className="cta text-fg-muted hover:text-fg">
          Clear search
        </button>
      </div>
    </div>
  );
}

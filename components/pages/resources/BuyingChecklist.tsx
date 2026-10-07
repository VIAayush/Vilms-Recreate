"use client";

import { useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, ClipboardCopy, RotateCcw } from "lucide-react";
import { useInView } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { CHECK_GROUPS } from "./buying-data";
import { ScoreRing, scoreTone } from "./ScoreRing";

const ITEMS = CHECK_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));
const weightOf = (i: { must?: boolean }) => (i.must ? 2 : 1);
const TOTAL_WEIGHT = ITEMS.reduce((t, i) => t + weightOf(i), 0);
const MUSTS = ITEMS.filter((i) => i.must);

function verdict(score: number, mustsMissing: number, any: boolean) {
  if (!any) return { title: "Tick what a vendor offers", text: "Go through the list with one vendor in mind. Only tick what they have shown you, not what they promised." };
  if (score >= 0.85 && mustsMissing === 0) return { title: "A strong fit on paper", text: "Probe the gaps that remain, and test the claims with your own material." };
  if (score >= 0.6) return { title: "Decent, with gaps to question", text: mustsMissing ? "A must-have is missing. Ask about it directly before you go further." : "Nothing critical is missing, but ask about each gap." };
  return { title: "A weak fit for a coaching institute", text: "Several basics are absent. Be sure why before you commit." };
}

/**
 * The scoreable buying checklist. Tick what a vendor genuinely offers; a ring
 * scores it (must-haves count double), group bars show where the gaps are,
 * and "what you're missing" turns the unticked items into questions to ask.
 * State lives in the page only. Nothing is stored or sent.
 */
export function BuyingChecklist() {
  const uid = useId();
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [vendor, setVendor] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  const root = useRef<HTMLDivElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { margin: "-15% 0px -15% 0px" });

  const stats = useMemo(() => {
    const got = ITEMS.filter((i) => ticked.has(i.id));
    const points = got.reduce((t, i) => t + weightOf(i), 0);
    const missing = ITEMS.filter((i) => !ticked.has(i.id)).sort((a, b) => Number(!!b.must) - Number(!!a.must));
    const mustsMissing = MUSTS.filter((i) => !ticked.has(i.id));
    return { count: got.length, score: points / TOTAL_WEIGHT, missing, mustsMissing };
  }, [ticked]);

  const pct = Math.round(stats.score * 100);
  const v = verdict(stats.score, stats.mustsMissing.length, ticked.size > 0);
  const shown = showAll ? stats.missing : stats.missing.slice(0, 4);

  const toggle = (id: string) =>
    setTicked((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => {
    setTicked(new Set());
    setShowAll(false);
    setCopy("idle");
  };

  const resultText = () => {
    const name = vendor.trim();
    const lines = [
      `LMS checklist${name ? `: ${name}` : ""}`,
      `Score: ${pct}% (${stats.count} of ${ITEMS.length} items; ${MUSTS.length - stats.mustsMissing.length} of ${MUSTS.length} must-haves)`,
    ];
    if (stats.mustsMissing.length) lines.push("", "Must-haves missing:", ...stats.mustsMissing.map((i) => `- ${i.text}`));
    const other = stats.missing.filter((i) => !i.must);
    if (other.length) lines.push("", "Also missing, ask about:", ...other.map((i) => `- ${i.text}`));
    lines.push("", `Scored with the VILMS LMS buying guide: ${window.location.origin}${window.location.pathname}`);
    return lines.join("\n");
  };

  const copyResult = async () => {
    const text = resultText();
    try {
      await navigator.clipboard.writeText(text);
      setCopy("done");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        setCopy(ok ? "done" : "failed");
      } catch {
        setCopy("failed");
      }
    }
    window.setTimeout(() => setCopy("idle"), 2400);
  };

  return (
    <div ref={root} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-12">
      {/* the list */}
      <div className="min-w-0 space-y-12">
        {CHECK_GROUPS.map((g, gi) => {
          const done = g.items.filter((i) => ticked.has(i.id)).length;
          return (
            <section key={g.id} aria-labelledby={`${uid}-${g.id}`}>
              <div className="flex items-end justify-between gap-4 border-b border-edge-strong pb-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">{String(gi + 1).padStart(2, "0")}</p>
                  <h3 id={`${uid}-${g.id}`} className="mt-1 font-display text-[24px] font-medium tracking-[-0.03em]">
                    {g.title}
                  </h3>
                </div>
                <p className="shrink-0 pb-1 font-mono text-[12px] tabular-nums text-fg-muted" aria-label={`${done} of ${g.items.length} ticked`}>
                  {done}/{g.items.length}
                </p>
              </div>
              <p className="mt-3 max-w-[560px] text-[14.5px] leading-relaxed text-fg-muted">{g.why}</p>
              <ul className="mt-3 space-y-0.5">
                {g.items.map((it) => (
                  <li key={it.id}>
                    <label className="group relative flex cursor-pointer items-start gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-sunken has-[:checked]:bg-primary-tint/50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
                      <input type="checkbox" className="peer sr-only" checked={ticked.has(it.id)} onChange={() => toggle(it.id)} />
                      <span
                        aria-hidden
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-edge-strong transition duration-200 group-hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:[&>svg]:scale-100"
                      >
                        <Check className="h-4 w-4 scale-0 text-canvas transition-transform duration-200" strokeWidth={3.5} />
                      </span>
                      <span className="min-w-0 flex-1 text-[16px] leading-snug">
                        {it.text}
                        {it.must ? <span className="ml-2 inline-block translate-y-[-1px] rounded-full border border-gold/70 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.1em] text-gold-text">Must-have</span> : null}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* the live result */}
      <div ref={result} className="min-w-0 scroll-mt-28 lg:pt-1">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-[28px] border border-edge-strong bg-panel p-5 shadow-soft sm:p-6">
            <label htmlFor={`${uid}-vendor`} className="v-label">
              Vendor you are scoring <span className="font-normal text-fg-faint">(optional)</span>
            </label>
            <input id={`${uid}-vendor`} className="v-field" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="e.g. Vendor A" maxLength={60} autoComplete="off" />

            <div className="mt-6 flex items-center gap-5">
              <ScoreRing value={stats.score} size={132} stroke={11} tone={scoreTone(stats.score)}>
                <span className="text-center">
                  <span className="block font-display text-[34px] font-medium leading-none tracking-[-0.04em] tabular-nums">
                    {pct}
                    <span className="text-[18px] text-fg-muted">%</span>
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">score</span>
                </span>
              </ScoreRing>
              <div className="min-w-0">
                <p className="font-mono text-[11.5px] tabular-nums text-fg-muted">
                  {stats.count} of {ITEMS.length} ticked
                </p>
                <p className="mt-1.5 font-mono text-[11.5px] tabular-nums text-fg-muted">
                  {MUSTS.length - stats.mustsMissing.length} of {MUSTS.length} must-haves
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-edge">
                  <motion.div className={clsx("h-full rounded-full", stats.mustsMissing.length ? "bg-gold" : "bg-green")} initial={false} animate={{ width: `${((MUSTS.length - stats.mustsMissing.length) / MUSTS.length) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
                </div>
              </div>
            </div>

            <div role="status" aria-live="polite" className="mt-5 border-t border-edge pt-4">
              <p className="font-display text-[19px] font-medium leading-tight tracking-[-0.02em]">{v.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{v.text}</p>
              <span className="sr-only">{`Score ${pct} percent.`}</span>
            </div>

            <ul className="mt-5 space-y-2" aria-label="Score by area">
              {CHECK_GROUPS.map((g) => {
                const done = g.items.filter((i) => ticked.has(i.id)).length;
                return (
                  <li key={g.id} className="grid grid-cols-[96px_1fr_28px] items-center gap-3 text-[12.5px]">
                    <span className="truncate text-fg-muted">{g.title}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-edge">
                      <motion.span className="block h-full rounded-full bg-navy" initial={false} animate={{ width: `${(done / g.items.length) * 100}%` }} transition={{ duration: 0.45, ease: EASE }} />
                    </span>
                    <span className="text-right font-mono tabular-nums text-fg-faint">
                      {done}/{g.items.length}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-edge pt-5">
              <p className="flex items-center justify-between font-display text-[17px] font-medium tracking-[-0.02em]">
                What you are missing
                <span className="font-mono text-[12px] tabular-nums text-fg-faint">{stats.missing.length}</span>
              </p>
              {stats.missing.length === 0 ? (
                <p className="mt-2 text-[14px] text-fg-muted">Nothing. Every item is ticked.</p>
              ) : (
                <>
                  <ul className="mt-3 space-y-2.5">
                    <AnimatePresence initial={false}>
                      {shown.map((i) => (
                        <motion.li key={i.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <p className="flex gap-2.5 text-[13.5px] leading-snug text-fg-muted">
                            <span aria-hidden className={clsx("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", i.must ? "bg-gold" : "bg-edge-strong")} />
                            <span>
                              <span className="sr-only">{i.must ? "Must-have: " : ""}</span>
                              {i.text}
                            </span>
                          </p>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  {stats.missing.length > 4 ? (
                    <button type="button" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll} className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary">
                      {showAll ? "Show fewer" : `Show all ${stats.missing.length}`}
                      <ChevronDown aria-hidden className={clsx("h-4 w-4 transition-transform", showAll && "rotate-180")} />
                    </button>
                  ) : null}
                </>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              <button type="button" onClick={copyResult} disabled={ticked.size === 0} className="cta cta-primary cta-sm flex-1">
                <ClipboardCopy aria-hidden className="h-4 w-4" />
                {copy === "done" ? "Copied" : copy === "failed" ? "Could not copy" : "Copy result"}
              </button>
              <button type="button" onClick={reset} disabled={ticked.size === 0} aria-label="Reset the checklist" className="cta cta-ghost cta-sm px-3.5">
                <RotateCcw aria-hidden className="h-4 w-4" />
                Reset
              </button>
            </div>
            <p role="status" aria-live="polite" className="sr-only">
              {copy === "done" ? "Result copied to the clipboard." : ""}
            </p>
          </div>
        </div>
      </div>

      {/* phones: the score follows you while you tick */}
      <AnimatePresence>
        {visible ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={() => result.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            aria-label={`Score ${pct} percent. Jump to the full result`}
            className="fixed bottom-[88px] right-4 z-30 flex items-center gap-2.5 rounded-full border border-edge-strong bg-panel py-1.5 pl-1.5 pr-4 shadow-window lg:hidden"
          >
            <ScoreRing value={stats.score} size={36} stroke={5} tone={scoreTone(stats.score)} />
            <span className="text-left">
              <span className="block font-display text-[16px] font-medium leading-none tabular-nums">{pct}%</span>
              <span className="block font-mono text-[10px] text-fg-faint">
                {stats.count}/{ITEMS.length}
              </span>
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

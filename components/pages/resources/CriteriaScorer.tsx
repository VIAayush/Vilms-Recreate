"use client";

import { useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useInView } from "@/components/marketing/motion";
import { EASE } from "@/components/site-ui/motion-tokens";
import { CRITERIA, PRESETS, WEIGHTS } from "./criteria-data";
import { ScoreRing, scoreTone } from "./ScoreRing";

const N = CRITERIA.length;
const COVER = { full: 1, partial: 0.5 } as const;
const R = 112;
const C = 170; // centre of the 340 x 340 viewBox

const point = (i: number, k: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  return [C + Math.cos(a) * R * k, C + Math.sin(a) * R * k] as const;
};
const poly = (ks: number[]) => ks.map((k, i) => point(i, k).map((n) => n.toFixed(1)).join(",")).join(" ");

function Radar({ weights }: { weights: number[] }) {
  const priorities = weights.map((w) => Math.max(0.05, w / 3));
  const coverage = CRITERIA.map((c) => COVER[c.coverage]);
  return (
    <svg viewBox="0 0 340 340" role="img" aria-label="Radar chart comparing how much you care about each criterion with how much VILMS covers it" className="mx-auto h-auto w-full max-w-[340px]" fontFamily="var(--font-sans)">
      {[1, 0.66, 0.33].map((k) => (
        <polygon key={k} points={poly(Array(N).fill(k))} className="fill-none stroke-edge" strokeWidth={1} />
      ))}
      {CRITERIA.map((c, i) => {
        const [x, y] = point(i, 1);
        const [lx, ly] = point(i, 1.2);
        const anchor = lx < C - 8 ? "end" : lx > C + 8 ? "start" : "middle";
        return (
          <g key={c.id}>
            <line x1={C} y1={C} x2={x} y2={y} className="stroke-edge" strokeWidth={1} />
            <text x={lx} y={ly + 4} textAnchor={anchor} className="fill-fg-muted text-[11.5px] font-medium">
              {c.short}
            </text>
          </g>
        );
      })}
      <motion.polygon initial={false} animate={{ points: poly(priorities) }} transition={{ duration: 0.5, ease: EASE }} className="fill-primary/20 stroke-primary" strokeWidth={2} strokeLinejoin="round" />
      <polygon points={poly(coverage)} className="fill-none stroke-navy" strokeWidth={2.5} strokeDasharray="6 5" strokeLinejoin="round" />
      {coverage.map((k, i) => {
        const [x, y] = point(i, k);
        return <circle key={i} cx={x} cy={y} r={3.5} className="fill-navy" />;
      })}
    </svg>
  );
}

/**
 * Weighted criteria scorer. The visitor sets how much each criterion matters;
 * the result is how much of that VILMS covers, using only what the product
 * genuinely does ("covered" or "partly"). It is a coverage profile against
 * the visitor's own priorities, not a ranking of vendors.
 */
export function CriteriaScorer() {
  const uid = useId();
  const [weights, setWeights] = useState<Record<string, number>>(() => ({ ...PRESETS[0].weights }));
  const [preset, setPreset] = useState<string | null>("balanced");
  const root = useRef<HTMLDivElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { margin: "-15% 0px -15% 0px" });

  const list = CRITERIA.map((c) => weights[c.id] ?? 0);
  const { score, gaps } = useMemo(() => {
    const total = CRITERIA.reduce((t, c) => t + (weights[c.id] ?? 0), 0);
    const got = CRITERIA.reduce((t, c) => t + (weights[c.id] ?? 0) * COVER[c.coverage], 0);
    return {
      score: total ? got / total : null,
      gaps: CRITERIA.filter((c) => c.coverage === "partial" && (weights[c.id] ?? 0) >= 2).sort((a, b) => (weights[b.id] ?? 0) - (weights[a.id] ?? 0)),
    };
  }, [weights]);

  const set = (id: string, v: number) => {
    setWeights((w) => ({ ...w, [id]: v }));
    setPreset(null);
  };
  const apply = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setWeights({ ...p.weights });
    setPreset(id);
  };

  const pct = score === null ? 0 : Math.round(score * 100);
  const sentence =
    score === null
      ? "Set at least one criterion above Skip to see a score."
      : gaps.length
        ? `You rated ${gaps.map((g) => g.short.toLowerCase()).join(" and ")} ${gaps.length > 1 ? "as important or critical" : weights[gaps[0].id] === 3 ? "as critical" : "as important"}. VILMS covers ${gaps.length > 1 ? "those" : "that"} only partly.`
        : "Everything you rated Important or Critical is fully covered.";

  return (
    <div ref={root} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Start from</span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={preset === p.id}
              onClick={() => apply(p.id)}
              className={clsx("rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-colors", preset === p.id ? "border-navy bg-navy text-canvas" : "border-edge bg-panel text-fg-muted hover:border-edge-strong hover:text-fg")}
            >
              {p.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 divide-y divide-edge border-y border-edge">
          {CRITERIA.map((c, i) => {
            const w = weights[c.id] ?? 0;
            return (
              <li key={c.id} className="grid gap-x-6 gap-y-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[16.5px] font-medium leading-tight">{c.title}</span>
                  </p>
                  <p className={clsx("mt-1 pl-[30px] text-[12.5px]", c.coverage === "full" ? "text-green" : "text-gold-text")}>
                    <span aria-hidden className={clsx("mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle", c.coverage === "full" ? "bg-green" : "bg-gold")} />
                    VILMS: {c.coverage === "full" ? "covered" : "covered in part"}
                  </p>
                </div>
                <fieldset className="min-w-0">
                  <legend className="sr-only">{`How much does ${c.short} matter to you?`}</legend>
                  <div className="grid grid-cols-4 gap-1 rounded-xl bg-sunken p-1 sm:w-[300px]">
                    {WEIGHTS.map((o) => (
                      <label
                        key={o.value}
                        className={clsx(
                          "relative cursor-pointer select-none rounded-lg px-1 py-2 text-center text-[12.5px] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary",
                          w === o.value ? "text-canvas" : "text-fg-muted hover:text-fg",
                        )}
                      >
                        <input type="radio" name={`${uid}-${c.id}`} value={o.value} checked={w === o.value} onChange={() => set(c.id, o.value)} className="sr-only" />
                        {w === o.value ? <motion.span layoutId={`${uid}-${c.id}`} transition={{ duration: 0.3, ease: EASE }} className="absolute inset-0 rounded-lg bg-navy" /> : null}
                        <span className="relative">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-fg-faint">
          This is a coverage profile against your own priorities, not a ranking of vendors. To score any vendor, use the <Link href="/lms-buying-guide" className="link">LMS buying guide checklist</Link>.
        </p>
      </div>

      <div ref={result} className="min-w-0 scroll-mt-28">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-[28px] border border-edge-strong bg-panel p-5 shadow-soft sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">Your priorities vs VILMS coverage</p>
            <div className="mt-3">
              <Radar weights={list} />
            </div>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[12.5px] text-fg-muted">
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-3 w-5 rounded-sm border border-primary bg-primary/20" /> How much you care
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-0 w-5 border-t-2 border-dashed border-navy" /> What VILMS covers
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4 border-t border-edge pt-5">
              <ScoreRing value={score ?? 0} size={84} stroke={8} tone={scoreTone(score ?? 0)}>
                <span className="font-display text-[22px] font-medium leading-none tabular-nums">{score === null ? "–" : pct}</span>
              </ScoreRing>
              <div role="status" aria-live="polite" className="min-w-0">
                <p className="font-display text-[18px] font-medium leading-tight tracking-[-0.02em]">{score === null ? "Nothing weighted" : `${pct}% of what you weighted is covered`}</p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-fg-muted">{sentence}</p>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {gaps.slice(0, 2).map((g) => (
                <motion.div key={g.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="mt-4 border-l-2 border-gold pl-3 text-[13px] leading-snug text-fg-muted">
                    <span className="font-medium text-fg">{g.short}: </span>
                    {g.vilms}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button type="button" onClick={() => apply("balanced")} className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-fg-muted transition-colors hover:text-fg">
                <RotateCcw aria-hidden className="h-3.5 w-3.5" />
                Reset
              </button>
              <Link href="/lms-platform" className="group inline-flex items-center gap-1 text-[13.5px] font-medium text-primary">
                See the platform
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {visible ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={() => result.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            aria-label={`${pct} percent covered. Jump to the full result`}
            className="fixed bottom-[88px] right-4 z-30 flex items-center gap-2.5 rounded-full border border-edge-strong bg-panel py-1.5 pl-1.5 pr-4 shadow-window lg:hidden"
          >
            <ScoreRing value={score ?? 0} size={36} stroke={5} tone={scoreTone(score ?? 0)} />
            <span className="font-display text-[16px] font-medium tabular-nums">{score === null ? "–" : `${pct}%`}</span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

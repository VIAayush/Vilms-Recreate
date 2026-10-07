"use client";

import { useReducer } from "react";
import clsx from "clsx";
import { LayoutGroup, motion } from "motion/react";
import { ArrowRight, Plus, RotateCcw } from "lucide-react";
import { Avatar, Illustrative } from "@/components/marketing/screens/primitives";
import { SOURCES, STAGES } from "./data";

type Lead = { id: number; name: string; course: string; source: string; fee: number; col: number };

const NEXT_ACTION = ["Call today", "Offer a demo", "Demo Thu 5 PM", "Set a follow-up", "Call Sat 11 AM", "Offer a trial", "Day-3 check-in", "Enrolled"];
const DOT = ["bg-primary", "bg-primary", "bg-navy", "bg-navy", "bg-gold", "bg-sky", "bg-green", "bg-green"];
const FEES: Record<string, number> = { "Prelims Foundation": 15000, "JEE crash course": 12000, "Spoken English": 8000, "UPSC prelims": 15000, "NEET foundation": 18000 };
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const START: Lead[] = [
  { id: 1, name: "Neha Verma", course: "Prelims Foundation", source: "Meta Ads", fee: 15000, col: 0 },
  { id: 2, name: "Rahul Kumar", course: "JEE crash course", source: "Google Ads", fee: 12000, col: 0 },
  { id: 3, name: "Isha Menon", course: "Spoken English", source: "Landing page", fee: 8000, col: 1 },
  { id: 4, name: "Arjun Thakur", course: "UPSC prelims", source: "Free PDF", fee: 15000, col: 2 },
  { id: 5, name: "Sana Pillai", course: "NEET foundation", source: "Webinar", fee: 18000, col: 3 },
  { id: 6, name: "Karan Shah", course: "JEE crash course", source: "Google Ads", fee: 12000, col: 4 },
  { id: 7, name: "Divya Rao", course: "NEET foundation", source: "Meta Ads", fee: 18000, col: 5 },
  { id: 8, name: "Aman Verma", course: "UPSC prelims", source: "Free PDF", fee: 15000, col: 6 },
  { id: 9, name: "Priya Sethi", course: "Prelims Foundation", source: "Meta Ads", fee: 15000, col: 7 },
];

type State = { leads: Lead[]; nextId: number; arrivals: number };
type Action = { type: "advance"; id: number } | { type: "add" } | { type: "reset" };

function reduce(s: State, a: Action): State {
  switch (a.type) {
    case "advance":
      return { ...s, leads: s.leads.map((l) => (l.id === a.id && l.col < STAGES.length - 1 ? { ...l, col: l.col + 1 } : l)) };
    case "add": {
      const src = SOURCES[s.arrivals % SOURCES.length];
      const names = ["Meera Joshi", "Vikram Rao", "Tanya Bose", "Dev Malhotra", "Anita Das"];
      const lead: Lead = { id: s.nextId, name: names[s.arrivals % names.length], course: src.lead.course, source: src.label, fee: FEES[src.lead.course] ?? 15000, col: 0 };
      return { leads: [...s.leads, lead], nextId: s.nextId + 1, arrivals: s.arrivals + 1 };
    }
    default:
      return { leads: START, nextId: 100, arrivals: 0 };
  }
}

/** A pipeline you can operate: every arrow moves a lead, the numbers follow. */
export function PipelineSim() {
  const [state, dispatch] = useReducer(reduce, { leads: START, nextId: 100, arrivals: 0 });
  const converted = state.leads.filter((l) => l.col === STAGES.length - 1);
  const revenue = converted.reduce((t, l) => t + l.fee, 0);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <dl className="flex gap-8">
          <div>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Converted</dt>
            <dd className="font-display text-[38px] font-semibold leading-none tabular-nums tracking-tight">
              <motion.span key={converted.length} initial={{ opacity: 0.3, y: -8 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
                {converted.length}
              </motion.span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Revenue</dt>
            <dd className="font-display text-[38px] font-semibold leading-none tabular-nums tracking-tight">
              <motion.span key={revenue} initial={{ color: "rgb(var(--green))", y: -8 }} animate={{ color: "rgb(var(--foreground))", y: 0 }} transition={{ duration: 0.8 }} className="inline-block">
                {inr(revenue)}
              </motion.span>
            </dd>
          </div>
        </dl>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "add" })}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-navy px-4 text-[13.5px] font-semibold text-white transition duration-200 hover:-translate-y-px hover:bg-primary"
          >
            <Plus aria-hidden className="h-4 w-4" /> New lead arrives
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-edge-strong px-4 text-[13.5px] font-semibold transition duration-200 hover:-translate-y-px hover:border-primary hover:text-primary"
          >
            <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mt-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <LayoutGroup>
          <div className="grid min-w-[1060px] grid-cols-8 gap-2">
            {STAGES.map((name, col) => {
              const cards = state.leads.filter((l) => l.col === col);
              return (
                <section key={name} aria-label={`${name}, ${cards.length} leads`} className="min-h-[340px] rounded-2xl bg-canvas-alt p-2">
                  <header className="mb-2 flex items-center gap-1.5 px-1.5 pt-1">
                    <span aria-hidden className={clsx("h-2 w-2 shrink-0 rounded-full", DOT[col])} />
                    <h3 className="min-w-0 flex-1 truncate text-[12px] font-semibold">{name}</h3>
                    <span className="font-mono text-[11px] tabular-nums text-fg-faint">{cards.length}</span>
                  </header>
                  <ul className="space-y-2">
                    {cards.map((l) => (
                      <motion.li
                        key={l.id}
                        layoutId={`lead-${l.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 30 }}
                        className="group rounded-xl border border-edge bg-panel p-2.5 shadow-sm transition-shadow hover:shadow-lift"
                      >
                        <div className="flex items-center gap-1.5">
                          <Avatar name={l.name} size="sm" />
                          <span className="truncate text-[12px] font-semibold">{l.name}</span>
                        </div>
                        <p className="mt-1.5 truncate text-[11px] text-fg-muted">{l.course}</p>
                        <span className="mt-1.5 inline-block max-w-full truncate rounded bg-sunken px-1.5 py-0.5 text-[10px] text-fg-muted">{l.source}</span>
                        <div className="mt-2 flex items-center justify-between gap-1">
                          <span className={clsx("truncate text-[10.5px] font-medium", col === STAGES.length - 1 ? "text-green" : "text-primary")}>{col === STAGES.length - 1 ? `${NEXT_ACTION[col]} · ${inr(l.fee)}` : NEXT_ACTION[col]}</span>
                          {col < STAGES.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => dispatch({ type: "advance", id: l.id })}
                              aria-label={`Move ${l.name} to ${STAGES[col + 1]}`}
                              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-edge-strong text-fg-muted transition duration-200 hover:border-primary hover:bg-primary hover:text-primary-ink group-hover:border-primary/60"
                            >
                              <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                            </button>
                          ) : null}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <Illustrative />
        <p className="text-[12.5px] text-fg-muted sm:hidden">Swipe to see every stage.</p>
      </div>
    </div>
  );
}

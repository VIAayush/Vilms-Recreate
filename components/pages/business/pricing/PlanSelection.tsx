"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Plan } from "@/lib/content";
import { MAX_LIMIT, PLANS, planFor } from "../plans";

// One piece of state shared by the student slider, the plan cards and the
// comparison table: how many students the visitor teaches. The fitting plan
// is derived from it, so all three always agree.

// Slider stops: a spread of sizes plus each plan's own limit, read from the plans.
export const STOPS = Array.from(new Set([10, 25, 75, 100, 150, 300, 400, 750, 1000, Math.round(MAX_LIMIT * 1.35), ...PLANS.map((p) => p.limit)])).sort((a, b) => a - b);

type Ctx = {
  stop: number;
  setStop: (i: number) => void;
  students: number;
  plan: Plan | null;
  /** index into PLANS, or null above the largest plan */
  planIndex: number | null;
  choose: (p: Plan) => void;
};

const SelectionContext = createContext<Ctx | null>(null);

export function usePlanSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("usePlanSelection must be used inside <PlanSelectionProvider>");
  return ctx;
}

const DEFAULT_STOP = STOPS.indexOf(PLANS[1].limit);

export function PlanSelectionProvider({ children }: { children: React.ReactNode }) {
  const [stop, setStop] = useState(DEFAULT_STOP);
  const students = STOPS[stop];
  const plan = planFor(students);
  const planIndex = plan ? PLANS.indexOf(plan) : null;
  const choose = useCallback((p: Plan) => setStop(STOPS.indexOf(p.limit)), []);
  const value = useMemo(() => ({ stop, setStop, students, plan, planIndex, choose }), [stop, students, plan, planIndex, choose]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

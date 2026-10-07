import { pricing, type Plan } from "@/lib/content";

// Plan arithmetic for the business pages. Every number here is read from
// `pricing.plans` (lib/content.ts) — nothing about a plan is typed twice.

export const PLANS = pricing.plans;
export type PlanId = Plan["id"];

/** Monthly price in rupees, excluding GST ("₹1,199" → 1199). */
export const monthly = (p: Plan) => Number(p.price.replace(/[^\d]/g, ""));
/** Twelve months of the plan, excluding GST. */
export const annual = (p: Plan) => monthly(p) * 12;
/** Price per student per month if the plan is full. */
export const perStudent = (p: Plan) => monthly(p) / p.limit;
/** The smallest plan that fits this many students, or null above the largest. */
export const planFor = (students: number): Plan | null => PLANS.find((p) => students <= p.limit) ?? null;
export const MAX_LIMIT = PLANS[PLANS.length - 1].limit;
export const planById = (id: PlanId) => PLANS.find((p) => p.id === id)!;

/** ₹ with Indian digit grouping, e.g. 1500000 → "₹15,00,000". */
export const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/** Short form for big sums: ₹4.5 L, ₹1.2 Cr. */
export function rupeesShort(n: number) {
  if (n >= 1_00_00_000) return `₹${trim(n / 1_00_00_000)} Cr`;
  if (n >= 1_00_000) return `₹${trim(n / 1_00_000)} L`;
  return rupees(n);
}
const trim = (x: number) => (x >= 10 ? Math.round(x) : Math.round(x * 10) / 10).toString();

import type { ExplorerTabId } from "@/lib/content";

// One colour language for the whole site.
//
// Meaning (product UI, diagrams, status):
//   blue   — a lead, learning, anything active or selected
//   green  — done: enrolled, paid, approved
//   yellow — waiting on a person: in review, awaiting evaluation
//   red    — live right now (or refunded)
//
// Identity (each product area owns a colour, so the page changes colour as
// the visitor moves through it): Teach blue, Assess red, Grow green,
// Payments yellow, Brand teal.

export type Tone = "blue" | "red" | "yellow" | "green" | "teal";

type ToneClasses = {
  /** text in this colour */
  text: string;
  /** solid fill (dots, bars, icons tiles) */
  fill: string;
  /** light tinted surface */
  tint: string;
  /** a very light wash for whole sections */
  wash: string;
  /** background for a card that belongs to this colour */
  surface: string;
  border: string;
  /** RGB triplet variable, for CSS effects (cursor glow, tilt glare) */
  rgb: string;
};

export const TONE: Record<Tone, ToneClasses> = {
  blue: { text: "text-primary", fill: "bg-primary", tint: "bg-primary-tint", wash: "bg-wash-blue", surface: "bg-primary-tint/70", border: "border-primary", rgb: "var(--primary)" },
  red: { text: "text-red", fill: "bg-red", tint: "bg-red-tint", wash: "bg-red-tint/50", surface: "bg-red-tint/70", border: "border-red", rgb: "var(--red)" },
  yellow: { text: "text-yellow-ink", fill: "bg-yellow", tint: "bg-yellow-tint", wash: "bg-canvas-alt" /* a yellow wash reads as cream — keep yellow to accents */, surface: "bg-panel", border: "border-yellow", rgb: "var(--yellow)" },
  green: { text: "text-green", fill: "bg-green", tint: "bg-green-tint", wash: "bg-wash-green", surface: "bg-green-tint/70", border: "border-green", rgb: "var(--green)" },
  teal: { text: "text-teal", fill: "bg-teal", tint: "bg-teal-tint", wash: "bg-teal-tint/60", surface: "bg-teal-tint/70", border: "border-teal", rgb: "var(--teal)" },
};

export const AREA_TONE: Record<ExplorerTabId, Tone> = {
  teach: "blue",
  assess: "red",
  grow: "green",
  payments: "yellow",
  brand: "teal",
};

/** Inline style that sets the colour used by .glow-card / [data-glow] effects. */
export const glow = (tone: Tone) => ({ "--glow": TONE[tone].rgb }) as React.CSSProperties;

export const MODULE_DOT: Record<string, string> = {
  "Live classes": "bg-red",
  Payments: "bg-green",
  Tests: "bg-yellow",
  Certificates: "bg-yellow",
};

export const moduleDot = (module: string) => MODULE_DOT[module] ?? "bg-primary";

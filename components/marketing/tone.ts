import type { ExplorerTabId } from "@/lib/content";

// One colour language for the whole site, taken from the VILMS logo:
//   navy   — the logo's outer V and wordmark (light version)
//   gold   — the logo's inner V (light version); never used as a pale tint,
//            which would read as beige — only as fills, rings and lines
//   blue   — the inner V of the dark logo; the colour of every action
//   steel  — the silver of the dark logo
// Plus two state colours the product needs: green (done, paid) and red
// (live now, refunded).
//
// Each product area owns one: Teach blue, Assess gold, Grow green,
// Payments steel, Brand navy.

export type Tone = "blue" | "navy" | "gold" | "steel" | "green" | "red";

type ToneClasses = {
  /** text in this colour (gold text reads navy in light mode, gold in dark) */
  text: string;
  /** solid fill (dots, bars, icon backgrounds) */
  fill: string;
  /** a small surface in this colour — chips, icon tiles, badges */
  tint: string;
  /** a very light wash for whole sections */
  wash: string;
  /** background for a card that belongs to this colour */
  surface: string;
  border: string;
  /** RGB triplet variable, for CSS effects (cursor glow, tilt glare) */
  rgb: string;
};

const GOLD_CHIP = "bg-panel text-gold-text ring-1 ring-inset ring-gold/70";

export const TONE: Record<Tone, ToneClasses> = {
  blue: { text: "text-primary", fill: "bg-primary", tint: "bg-primary-tint text-primary", wash: "bg-wash-blue", surface: "bg-primary-tint/70", border: "border-primary", rgb: "var(--primary)" },
  navy: { text: "text-navy", fill: "bg-navy", tint: "bg-navy-tint text-navy", wash: "bg-navy-tint/50", surface: "bg-navy-tint/80", border: "border-navy", rgb: "var(--navy)" },
  gold: { text: "text-gold-text", fill: "bg-gold", tint: GOLD_CHIP, wash: "bg-canvas-alt", surface: "bg-panel", border: "border-gold", rgb: "var(--gold)" },
  steel: { text: "text-steel", fill: "bg-steel", tint: "bg-steel-tint text-steel", wash: "bg-steel-tint/60", surface: "bg-steel-tint/80", border: "border-steel", rgb: "var(--steel)" },
  green: { text: "text-green", fill: "bg-green", tint: "bg-green-tint text-green", wash: "bg-wash-green", surface: "bg-green-tint/70", border: "border-green", rgb: "var(--green)" },
  red: { text: "text-red", fill: "bg-red", tint: "bg-red-tint text-red", wash: "bg-red-tint/50", surface: "bg-red-tint/70", border: "border-red", rgb: "var(--red)" },
};

export const AREA_TONE: Record<ExplorerTabId, Tone> = {
  teach: "blue",
  assess: "gold",
  grow: "green",
  payments: "steel",
  brand: "navy",
};

/** Inline style that sets the colour used by .glow-card / [data-glow] effects. */
export const glow = (tone: Tone) => ({ "--glow": TONE[tone].rgb }) as React.CSSProperties;

// Module chips: live is red, money is green, things that wait on a person
// (tests to evaluate, certificates to issue) are gold, the rest blue.
export const MODULE_DOT: Record<string, string> = {
  "Live classes": "bg-red",
  Payments: "bg-green",
  Tests: "bg-gold",
  Certificates: "bg-gold",
};

export const moduleDot = (module: string) => MODULE_DOT[module] ?? "bg-primary";

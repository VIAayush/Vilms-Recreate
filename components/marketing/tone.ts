import type { ExplorerTabId } from "@/lib/content";

// One colour language for the whole site.
//   blue   — every action; anything active or selected
//   navy   — the logo's navy: depth, immersive sections, "your brand"
//   green  — done: enrolled, paid, approved
//   yellow — waiting on a person (never as a big tint — it reads as cream)
//   red    — live right now
//   purple — AI, and only AI
// Each product area owns one, so the Explore stage changes colour with it.

export type Tone = "blue" | "navy" | "green" | "yellow" | "red" | "purple";

type ToneClasses = {
  text: string;
  fill: string;
  /** small surfaces: chips, icon tiles, badges */
  tint: string;
  /** a very light wash for a large stage */
  wash: string;
  /** RGB triplet, for CSS effects (glows, rings) */
  rgb: string;
};

export const TONE: Record<Tone, ToneClasses> = {
  blue: { text: "text-primary", fill: "bg-primary", tint: "bg-primary-tint text-primary", wash: "bg-wash-blue", rgb: "var(--primary)" },
  navy: { text: "text-navy", fill: "bg-navy", tint: "bg-navy-tint text-navy", wash: "bg-navy-tint/60", rgb: "var(--navy)" },
  green: { text: "text-green", fill: "bg-green", tint: "bg-green-tint text-green", wash: "bg-wash-green", rgb: "var(--green)" },
  yellow: { text: "text-yellow-text", fill: "bg-yellow", tint: "bg-panel text-yellow-text ring-1 ring-inset ring-yellow/70", wash: "bg-canvas-alt", rgb: "var(--yellow)" },
  red: { text: "text-red", fill: "bg-red", tint: "bg-red-tint text-red", wash: "bg-red-tint/50", rgb: "var(--red)" },
  purple: { text: "text-purple", fill: "bg-purple", tint: "bg-purple-tint text-purple", wash: "bg-purple-tint/50", rgb: "var(--purple)" },
};

export const AREA_TONE: Record<ExplorerTabId, Tone> = {
  teach: "blue",
  assess: "purple",
  grow: "green",
  payments: "yellow",
  brand: "red",
  team: "navy",
};

export const glow = (tone: Tone) => ({ "--glow": TONE[tone].rgb }) as React.CSSProperties;

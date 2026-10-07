import type { ReactNode } from "react";
import type { PageKey } from "@/lib/site/pages";
import type { FaqItem } from "@/components/site-ui/FaqAccordion";
import type { IconName } from "./icons";

/* ---------- "why an LMS" before / after visual ---------- */

export type BeforeAfter = { tools: string[]; before: string; after: string };

/* ---------- capability explorer (the doc's key features) ---------- */

export type Capability = {
  id: string;
  icon: IconName;
  title: string;
  text: string;
  /** a small address shown in the stage's window chrome */
  url?: string;
  visual: ReactNode;
};

/* ---------- workflow diagram ---------- */

export type WorkflowStep = { icon: IconName; title: string; text?: string; chip?: string };

/* ---------- page ---------- */

export type SolutionData = {
  key: Extract<PageKey, "coaching" | "testPrep" | "onlineCoaching" | "training" | "schoolsColleges">;
  kicker: string;
  /** the page's single H1 */
  title: ReactNode;
  lead: ReactNode;
  hero: ReactNode;
  schemaDescription: string;

  /** "What is an LMS for …?" */
  what: { title: string; paragraphs: string[]; bulletsLead?: string; bullets?: string[] };

  /** "Why do … need an LMS?" with the doc's list, beside a before / after visual */
  why: { title: string; paragraphs: string[]; bulletsLead?: string; bullets?: string[]; visual: BeforeAfter };

  /** Key features, as the explorer */
  features: {
    title: string;
    lead?: string;
    /** "side": list beside the stage · "top": tabs above it */
    variant: "side" | "top";
    flip?: boolean;
    items: Capability[];
  };

  /** "How VILMS helps" / "Benefits": the doc's list, drawn as a diagram */
  how: { kicker: string; title: string; lead?: string; variant: "rail" | "loop" | "stairs" | "zigzag"; steps: WorkflowStep[] };

  /** "Who can use VILMS?" */
  who: { title: string; lead?: string; items: string[]; closing?: string };

  /** "How to choose …" / "Tips …" — optional */
  tips?: { title: string; lead?: string; items: string[]; closing?: string };

  showcase: {
    kicker: string;
    title: string;
    lead?: string;
    admin: { url: string; w: number; h: number; label: string; node: ReactNode };
    student: { w: number; h: number; label: string; node: ReactNode };
  };

  /** "Why choose VILMS?" */
  choose: { title: string; paragraphs: string[] };

  /** The closing call to action */
  cta: { title: string; lead: string };

  faq: { kicker: string; title: string; items: FaqItem[] };

  /** product pages, pricing and a guide — 4 keys */
  related: PageKey[];
};

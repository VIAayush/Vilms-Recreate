import clsx from "clsx";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";
import { BeforeAfterCard } from "./BeforeAfterCard";
import type { SolutionData } from "./types";

/** A two-column checklist whose rows react to hover. */
export function BulletGrid({ items, lead, className }: { items: string[]; lead?: string; className?: string }) {
  return (
    <div className={className}>
      {lead ? <p className="mb-4 text-[15px] font-semibold text-fg">{lead}</p> : null}
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {items.map((b, i) => (
          <Reveal as="li" key={b} delay={(i % 2) * 60} className="group flex items-start gap-3 border-t border-edge py-3.5 transition-colors duration-300 hover:border-primary/50">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-tint text-primary transition duration-300 group-hover:scale-110 group-hover:bg-navy group-hover:text-white">
              <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[15.5px] leading-snug transition-transform duration-300 group-hover:translate-x-0.5">{b}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** "What is an LMS for …?": a lead paragraph, the rest beside it, the list below. */
export function WhatIs({ what }: { what: SolutionData["what"] }) {
  const [first, ...rest] = what.paragraphs;
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <Reveal>
          <p className="text-balance font-display text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.25] tracking-[-0.02em]">{first}</p>
        </Reveal>
        <Reveal delay={80} className="space-y-4">
          {rest.map((p) => (
            <p key={p} className="text-[16.5px] leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </Reveal>
      </div>
      {what.bullets ? <BulletGrid className="mt-10" items={what.bullets} lead={what.bulletsLead} /> : null}
    </div>
  );
}

/** "Why do … need an LMS?": the argument and its list, beside a before / after card. */
export function WhyNeeded({ why }: { why: SolutionData["why"] }) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
      <div className="min-w-0">
        <Reveal className="space-y-4">
          {why.paragraphs.map((p, i) => (
            <p key={p} className={clsx("leading-relaxed", i === 0 ? "text-[18px] text-fg" : "text-[16.5px] text-fg-muted")}>
              {p}
            </p>
          ))}
        </Reveal>
        {why.bullets ? <BulletGrid className="mt-7" items={why.bullets} lead={why.bulletsLead} /> : null}
      </div>
      <Reveal delay={100} className="min-w-0 lg:sticky lg:top-28">
        <BeforeAfterCard {...why.visual} />
      </Reveal>
    </div>
  );
}

/** "Who can use VILMS?": big names in hairline rows. */
export function WhoList({ who }: { who: SolutionData["who"] }) {
  return (
    <div>
      <ul className="grid gap-x-12 border-b border-edge md:grid-cols-2">
        {who.items.map((w, i) => (
          <Reveal as="li" key={w} delay={(i % 2) * 70} className="group">
            <div className="-mx-3 flex items-center gap-4 rounded-xl border-t border-edge px-3 py-5 transition-colors duration-300 hover:bg-canvas-alt">
              <span className="font-mono text-[12px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 text-balance font-display text-[clamp(20px,2vw,26px)] font-medium leading-tight tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1">{w}</span>
              <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-fg-faint opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </ul>
      {who.closing ? <p className="mt-8 max-w-[720px] text-[17px] leading-relaxed text-fg-muted">{who.closing}</p> : null}
    </div>
  );
}

/** "How to choose …": a numbered checklist on a connected line. */
export function TipsList({ tips }: { tips: NonNullable<SolutionData["tips"]> }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
      <ol className="relative">
        <span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-px bg-edge-strong" />
        {tips.items.map((t, i) => (
          <Reveal as="li" key={t} delay={i * 50} className="group relative flex items-center gap-5 py-3">
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-edge-strong bg-panel font-mono text-[12px] tabular-nums text-fg-muted transition duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">{i + 1}</span>
            <span className="text-[17px] leading-snug transition-transform duration-300 group-hover:translate-x-1">{t}</span>
          </Reveal>
        ))}
      </ol>
      {tips.closing ? (
        <Reveal delay={100} className="self-center rounded-[28px] border border-edge bg-canvas-alt p-7">
          <p className="text-balance font-display text-[clamp(20px,2vw,26px)] font-medium leading-snug tracking-[-0.02em]">{tips.closing}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** "Why choose VILMS?" */
export function Choose({ choose }: { choose: SolutionData["choose"] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
      {choose.paragraphs.map((p, i) => (
        <Reveal key={p} delay={i * 80}>
          <p className={clsx("leading-relaxed", i === 0 ? "text-balance font-display text-[clamp(22px,2.3vw,30px)] font-medium leading-[1.25] tracking-[-0.02em]" : "text-[17px] text-fg-muted")}>{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

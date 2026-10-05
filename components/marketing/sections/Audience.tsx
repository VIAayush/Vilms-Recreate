"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, FileText, Lock, Unlock } from "lucide-react";
import { audience, type AudienceVisual } from "@/lib/content";
import { CertScene, EvalScene, LiveScene, PayScene } from "../screens/scenes";
import { Pill } from "../screens/primitives";

function TeamMini() {
  return (
    <div className="rounded-xl border border-edge/10 bg-panel p-3.5">
      <p className="text-[11px] font-semibold text-fg-muted">Team &amp; roles</p>
      <ul className="mt-2.5 space-y-2 text-[12.5px]">
        {[
          ["Owner / Admin", "Everything"],
          ["Teacher", "Courses · grading · materials"],
          ["Sales / Counsellor", "Leads · roster · payments"],
        ].map(([r, a]) => (
          <li key={r} className="flex items-center justify-between gap-3 rounded-lg bg-canvas/70 px-3 py-2">
            <span className="font-semibold">{r}</span>
            <span className="truncate text-[11px] text-fg-muted">{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MaterialsMini() {
  return (
    <div className="rounded-xl border border-edge/10 bg-panel p-3.5">
      <p className="text-[11px] font-semibold text-fg-muted">Study materials</p>
      <ul className="mt-2.5 space-y-2 text-[12.5px]">
        {[
          { t: "Syllabus breakdown.pdf", tag: <Pill tone="mint">Public</Pill>, icon: Unlock },
          { t: "Topper's notes — Polity.pdf", tag: <Pill tone="accent">Lead-magnet gated</Pill>, icon: FileText },
          { t: "Batch A worksheet 4.pdf", tag: <Pill tone="primary">Enrolled only</Pill>, icon: Lock },
        ].map(({ t, tag, icon: Icon }) => (
          <li key={t} className="flex items-center gap-2 rounded-lg bg-canvas/70 px-3 py-2">
            <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-fg-muted" />
            <span className="truncate">{t}</span>
            <span className="ml-auto shrink-0">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const VISUALS: Record<AudienceVisual, () => React.ReactNode> = {
  live: LiveScene,
  test: () => <EvalScene approved={false} />,
  cert: () => <CertScene />,
  team: TeamMini,
  invoice: PayScene,
  materials: MaterialsMini,
};

export function Audience() {
  const [activeId, setActiveId] = useState(audience.items[0].id);
  const active = audience.items.find((i) => i.id === activeId) ?? audience.items[0];
  const Visual = VISUALS[active.visual];

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="border-y border-edge/10 bg-panel/40 py-24 sm:py-32">
      <div className="wrap">
        <p className="kicker">{audience.kicker}</p>
        <h2 id="solutions-title" className="h2 mt-4 max-w-[18ch]">
          {audience.title}
        </h2>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          {/* Desktop: a typographic index. Phones: a swipeable row. */}
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-0 lg:overflow-visible lg:px-0" aria-label="Institute types">
            {audience.items.map((item, i) => {
              const on = item.id === active.id;
              return (
                <li key={item.id} className="shrink-0 lg:border-b lg:border-edge/10 lg:first:border-t">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActiveId(item.id)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActiveId(item.id)}
                    className={clsx(
                      "group flex w-full items-baseline gap-4 rounded-full border px-4 py-2 text-left transition-colors lg:rounded-none lg:border-0 lg:px-0 lg:py-4",
                      on ? "border-fg bg-fg text-canvas lg:bg-transparent lg:text-fg" : "border-edge/15 text-fg-muted hover:text-fg",
                    )}
                  >
                    <span className="hidden font-mono text-[12px] text-fg-faint lg:inline">0{i + 1}</span>
                    <span className="whitespace-nowrap text-[14.5px] font-semibold lg:font-display lg:text-[clamp(26px,3vw,42px)] lg:tracking-[-0.035em]">{item.label}</span>
                    <ArrowUpRight
                      aria-hidden
                      className={clsx("ml-auto hidden h-6 w-6 self-center transition-all duration-300 lg:block", on ? "rotate-45 text-primary opacity-100" : "opacity-0 group-hover:opacity-50")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
            <div key={active.id} className="animate-rise-in">
              <p className="text-[19px] leading-relaxed sm:text-[21px]">{active.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-[22px] bg-panel-tint p-4 sm:p-6 [&>*]:shadow-soft">
                <Visual />
              </div>
            </div>
            <p className="mt-6 text-[14px] leading-relaxed text-fg-muted">
              <b className="font-semibold text-fg">A strong fit if</b>{" "}you run ads or webinars to find students, teach in batches, evaluate written answers — and
              don&apos;t want your software taking a cut of your fees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

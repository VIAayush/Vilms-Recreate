"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, Download, FileText, Lock } from "lucide-react";
import { Avatar, BrowserFrame, Illustrative, Pill } from "@/components/marketing/screens/primitives";
import { swap } from "@/components/site-ui/motion-tokens";
import { SOURCES, type SourceId } from "./data";
import { SOURCE_ICON } from "./CrmHero";

// What the landing page for each source looks like, and what the visitor is
// offered. The lead record underneath is filled from the link, not typed.
const PAGES: Record<SourceId, { kind: string; title: string; sub: string; cta: string; slug: string }> = {
  meta: { kind: "Course page", title: "Prelims Foundation Batch", sub: "Weekly live classes, recordings inside, answer writing with mentor evaluation.", cta: "Get a free demo class", slug: "prelims-foundation" },
  google: { kind: "Course page", title: "JEE crash course", sub: "Live batches, recorded lessons and graded tests, in one place.", cta: "Book a free demo class", slug: "jee-crash-course" },
  landing: { kind: "Course page", title: "Spoken English", sub: "A hybrid programme with a certificate when you finish.", cta: "Ask about the batch", slug: "spoken-english" },
  pdf: { kind: "Free material", title: "Polity notes, free PDF", sub: "Enter your details and we will send the PDF straight away.", cta: "Send me the PDF", slug: "polity-notes" },
  webinar: { kind: "Webinar", title: "Free masterclass, Sunday 11 AM", sub: "No login needed. Reserve your seat and get a reminder before it starts.", cta: "Reserve my seat", slug: "masterclass" },
};
const COUNTS: Record<SourceId, number> = { meta: 18, google: 14, landing: 9, pdf: 12, webinar: 7 };
const MAX = Math.max(...Object.values(COUNTS));

export function Attribution() {
  const uid = useId();
  const [active, setActive] = useState<SourceId>("meta");
  const [exported, setExported] = useState(false);
  const src = SOURCES.find((s) => s.id === active)!;
  const page = PAGES[active];
  const url = `learn.abcacademy.in/${page.slug}?utm_source=${src.lead.utm.source}&utm_medium=${src.lead.utm.medium}&utm_campaign=${src.lead.utm.campaign}`;

  return (
    <div>
      <div role="radiogroup" aria-label="Lead source" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {SOURCES.map((s) => {
          const I = SOURCE_ICON[s.id];
          const on = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setActive(s.id)}
              className={clsx(
                "relative flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[14px] font-medium transition duration-200 hover:-translate-y-px",
                on ? "border-navy text-white" : "border-edge bg-panel text-fg-muted hover:border-primary/50 hover:text-fg",
              )}
            >
              {on ? <motion.span layoutId={`${uid}-src`} transition={{ type: "spring", stiffness: 400, damping: 34 }} className="absolute inset-0 rounded-full bg-navy" /> : null}
              <I aria-hidden className="relative h-4 w-4" />
              <span className="relative">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* the page the visitor lands on */}
        <BrowserFrame url={url} className="min-w-0 rounded-[20px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} {...swap} className="grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7">
              <div>
                <Pill tone="primary">{page.kind}</Pill>
                <h3 className="mt-3 font-display text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.05] tracking-[-0.03em]">{page.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-fg-muted">{page.sub}</p>
                <ul className="mt-4 space-y-1.5 text-[12.5px] text-fg-muted">
                  {["Taught by your own mentors", "Starts this month", "Fee paid to your own account"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check aria-hidden className="h-3.5 w-3.5 text-green" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-edge bg-canvas-alt p-4">
                <p className="text-[12.5px] font-semibold">{page.cta}</p>
                <div className="mt-3 space-y-2">
                  <span className="block rounded-lg border border-edge bg-panel px-3 py-2 text-[12px] text-fg-faint">Your name</span>
                  <span className="block rounded-lg border border-edge bg-panel px-3 py-2 text-[12px] text-fg-faint">Phone number</span>
                </div>
                <span className="mt-3 flex h-9 items-center justify-center rounded-lg bg-navy text-[12.5px] font-semibold text-white">{page.cta}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </BrowserFrame>

        {/* the lead it creates */}
        <div className="min-w-0 space-y-4">
          <div className="rounded-[20px] border border-edge bg-panel p-4 shadow-soft sm:p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Lead record</p>
              <Pill tone="green">
                <Lock aria-hidden className="h-3 w-3" /> Captured from the link
              </Pill>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} {...swap}>
                <div className="mt-3 flex items-center gap-3">
                  <Avatar name={src.lead.name} size="lg" tone={SOURCES.indexOf(src)} />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold">{src.lead.name}</p>
                    <p className="truncate text-[12px] text-fg-muted">{src.lead.course}</p>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-edge pt-3 text-[12.5px]">
                  <dt className="text-fg-muted">Lead source</dt>
                  <dd className="font-semibold">{src.label}</dd>
                  <dt className="text-fg-muted">Medium</dt>
                  <dd className="font-mono text-[11.5px]">{src.lead.utm.medium}</dd>
                  <dt className="text-fg-muted">Campaign</dt>
                  <dd className="truncate font-mono text-[11.5px]">{src.lead.utm.campaign}</dd>
                  <dt className="text-fg-muted">Status</dt>
                  <dd>
                    <Pill tone="primary">New</Pill>
                  </dd>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-[20px] border border-edge bg-panel p-4 shadow-soft sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold">Leads by source</p>
              <button
                type="button"
                onClick={() => setExported((e) => !e)}
                aria-expanded={exported}
                className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-edge-strong px-3 text-[12.5px] font-semibold transition duration-200 hover:-translate-y-px hover:border-primary hover:text-primary"
              >
                <Download aria-hidden className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {SOURCES.map((s) => (
                <li key={s.id} className="grid grid-cols-[86px_1fr_22px] items-center gap-2 text-[12px]">
                  <span className={clsx("truncate transition-colors", s.id === active ? "font-semibold text-fg" : "text-fg-muted")}>{s.label}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-sunken">
                    <span className={clsx("block h-full rounded-full transition-[width,background-color] duration-500", s.id === active ? "bg-primary" : "bg-silver")} style={{ width: `${(COUNTS[s.id] / MAX) * 100}%` }} />
                  </span>
                  <span className="text-right font-mono tabular-nums text-fg-muted">{COUNTS[s.id]}</span>
                </li>
              ))}
            </ul>
            <AnimatePresence initial={false}>
              {exported ? (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-3 rounded-lg bg-canvas-alt p-3">
                    <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
                      <FileText aria-hidden className="h-3.5 w-3.5 text-primary" /> leads-june.csv
                    </p>
                    <pre className="mt-2 overflow-x-auto font-mono text-[10.5px] leading-[1.6] text-fg-muted">
                      {`name, course, source, campaign, status\n${SOURCES.slice(0, 3)
                        .map((s) => `${s.lead.name}, ${s.lead.course}, ${s.label}, ${s.lead.utm.campaign}, New`)
                        .join("\n")}`}
                    </pre>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Illustrative className="mt-4" />
    </div>
  );
}

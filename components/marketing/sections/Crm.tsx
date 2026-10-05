"use client";

import { useEffect, useReducer, useRef } from "react";
import clsx from "clsx";
import { LayoutGroup, motion } from "motion/react";
import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { crm } from "@/lib/content";
import { useInView, useReducedMotion } from "../motion";
import { Avatar } from "../screens/primitives";

/* A little pipeline simulation — sample leads moving through the stages. */
type Lead = { id: number; name: string; course: string; source: string; col: number };
const POOL = [
  { name: "Rahul K.", course: "JEE crash course", source: "Google Ads" },
  { name: "Sneha P.", course: "NEET foundation", source: "Free PDF" },
  { name: "Aman V.", course: "UPSC prelims", source: "Meta ad" },
  { name: "Isha M.", course: "Spoken English", source: "Webinar" },
  { name: "Karan S.", course: "JEE crash course", source: "Landing page" },
  { name: "Divya R.", course: "NEET foundation", source: "Google Ads" },
  { name: "Arjun T.", course: "UPSC prelims", source: "Free PDF" },
  { name: "Neha G.", course: "Spoken English", source: "Webinar" },
];
// what happens next for a lead in each column
const NEXT = ["Call today", "Send WhatsApp", "Demo Thu 5 PM", "Share fee plan", "Follow up Mon", "Start trial", "Check in day 3", "Enrolled ✓"];
const COL_TONE = ["bg-primary", "bg-primary", "bg-purple", "bg-purple", "bg-yellow", "bg-yellow", "bg-green", "bg-green"];

type Board = { leads: Lead[]; next: number; tick: number; converted: number };
const initial: Board = {
  leads: [
    { id: 0, ...POOL[0], col: 0 },
    { id: 1, ...POOL[1], col: 1 },
    { id: 2, ...POOL[2], col: 2 },
    { id: 3, ...POOL[3], col: 4 },
    { id: 4, ...POOL[4], col: 5 },
    { id: 5, ...POOL[5], col: 6 },
  ],
  next: 6,
  tick: 0,
  converted: 18,
};
function step(b: Board): Board {
  const tick = b.tick + 1;
  if (tick % 4 === 0) {
    const p = POOL[b.next % POOL.length];
    return { ...b, leads: [...b.leads, { id: b.next, ...p, col: 0 }], next: b.next + 1, tick };
  }
  // move the most advanced lead that isn't converted yet
  const mover = [...b.leads].filter((l) => l.col < 7).sort((a, z) => z.col - a.col || a.id - z.id)[tick % 2 === 0 ? 0 : Math.min(1, b.leads.length - 1)];
  if (!mover) return { ...b, tick };
  let leads = b.leads.map((l) => (l.id === mover.id ? { ...l, col: l.col + 1 } : l));
  let converted = b.converted;
  const done = leads.filter((l) => l.col === 7);
  if (done.length > 1) {
    leads = leads.filter((l) => l.id !== done[0].id);
    converted += 1;
  }
  return { ...b, leads, converted, tick };
}

export function Crm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [board, advance] = useReducer(step, initial);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(advance, 1700);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <section ref={ref} id="crm" aria-labelledby="crm-title" className="overflow-hidden bg-wash-green py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">{crm.kicker}</p>
            <h2 id="crm-title" className="h2 mt-4 max-w-[15ch]">
              {crm.title}
            </h2>
          </div>
          <p className="max-w-[340px] text-[16px] text-fg-muted lg:pb-2 lg:text-right">{crm.sub}</p>
        </div>

        {/* the funnel: a pulse travels from ad to student */}
        <div className="no-scrollbar -mx-4 mt-12 overflow-x-auto px-4">
          <ol className="relative flex min-w-[760px] items-center justify-between" aria-label="From ad to student">
            <span aria-hidden className="absolute inset-x-6 top-1/2 h-[2px] -translate-y-1/2 bg-edge" />
            {!reduced ? (
              <motion.span
                aria-hidden
                className="absolute top-1/2 h-[2px] w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ left: "0%" }}
                animate={{ left: "92%" }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : null}
            {crm.funnel.map((f, i) => (
              <li key={f} className="relative z-10">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className={clsx(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-2 text-[12.5px] font-semibold shadow-soft",
                    i === crm.funnel.length - 1 ? "border-green bg-green text-white" : "border-edge bg-panel",
                  )}
                >
                  {f === "Call / WhatsApp" ? <Phone aria-hidden className="h-3.5 w-3.5 text-green" /> : null}
                  {f}
                </motion.span>
              </li>
            ))}
          </ol>
        </div>

        {/* the pipeline */}
        <div className="mt-10 overflow-hidden rounded-[24px] border border-edge bg-panel shadow-window">
          <div className="flex items-center justify-between border-b border-edge px-4 py-3 sm:px-5">
            <p className="text-[13px] font-semibold">Admissions pipeline</p>
            <p className="flex items-center gap-1.5 text-[12px] text-fg-muted">
              <span className="h-2 w-2 rounded-full bg-green" /> {board.converted} converted this month
            </p>
          </div>
          <div className="no-scrollbar overflow-x-auto">
            <LayoutGroup>
              <div className="grid min-w-[1180px] grid-cols-8 gap-2 p-3 sm:p-4">
                {crm.columns.map((c, col) => {
                  const cards = board.leads.filter((l) => l.col === col);
                  return (
                    <div key={c} className="min-h-[300px] rounded-xl bg-canvas-alt p-2">
                      <div className="mb-2 flex items-center gap-1.5 px-1">
                        <span className={clsx("h-2 w-2 rounded-full", COL_TONE[col])} />
                        <p className="truncate text-[11.5px] font-semibold">{c}</p>
                        <span className="ml-auto font-mono text-[10.5px] text-fg-faint">{cards.length}</span>
                      </div>
                      <div className="space-y-2">
                        {cards.map((l) => (
                          <motion.div
                            key={l.id}
                            layoutId={`lead-${l.id}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 28 }}
                            className="rounded-lg border border-edge bg-panel p-2 shadow-sm"
                          >
                            <div className="flex items-center gap-1.5">
                              <Avatar name={l.name} size="sm" />
                              <span className="truncate text-[11.5px] font-semibold">{l.name}</span>
                            </div>
                            <p className="mt-1.5 truncate text-[10.5px] text-fg-muted">{l.course}</p>
                            <div className="mt-1.5 flex items-center justify-between gap-1 text-[10px]">
                              <span className="truncate rounded bg-sunken px-1.5 py-0.5 text-fg-muted">{l.source}</span>
                            </div>
                            <p className="mt-1.5 flex items-center gap-1 truncate text-[10.5px] font-medium text-primary">
                              {col === 1 ? <MessageCircle aria-hidden className="h-3 w-3 text-green" /> : <ChevronRight aria-hidden className="h-3 w-3" />}
                              {NEXT[col]}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
            <span className="sm:hidden">Swipe the board · </span>Illustrative · sample leads
          </p>
          <Cta intent="demo" location="crm" className="cta cta-outline" arrow>
            Watch the CRM in a demo
          </Cta>
        </div>
      </div>
    </section>
  );
}

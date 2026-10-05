"use client";

import { useEffect, useReducer, useRef } from "react";
import clsx from "clsx";
import { LayoutGroup, motion } from "motion/react";
import { ChevronRight, MessageCircle } from "lucide-react";
import { useInView, useReducedMotion } from "../motion";
import { Avatar } from "./primitives";

export const COLUMNS = ["New enquiry", "Contacted", "Demo scheduled", "Demo completed", "Follow-up", "Trial", "Converted"];

/* A little pipeline simulation — sample leads moving through the stages. */
type Lead = { id: number; name: string; course: string; source: string; col: number };
const POOL = [
  { name: "Rahul K.", course: "JEE crash course", source: "Google Ads" },
  { name: "Sneha P.", course: "NEET foundation", source: "Free PDF" },
  { name: "Aman V.", course: "UPSC prelims", source: "Meta Ads" },
  { name: "Isha M.", course: "Spoken English", source: "Webinar" },
  { name: "Karan S.", course: "JEE crash course", source: "Landing page" },
  { name: "Divya R.", course: "NEET foundation", source: "Google Ads" },
  { name: "Arjun T.", course: "UPSC prelims", source: "Free PDF" },
  { name: "Neha G.", course: "Spoken English", source: "Webinar" },
];
// what happens next for a lead in each column
const NEXT = ["Call today", "Send WhatsApp", "Demo Thu 5 PM", "Share fee plan", "Follow up Mon", "Send fee link", "Enrolled ✓"];
const COL_TONE = ["bg-primary", "bg-primary", "bg-navy", "bg-navy", "bg-gold", "bg-green", "bg-green"];

type Board = { leads: Lead[]; next: number; tick: number; converted: number };
const initial: Board = {
  leads: [
    { id: 0, ...POOL[0], col: 0 },
    { id: 1, ...POOL[1], col: 1 },
    { id: 2, ...POOL[2], col: 2 },
    { id: 3, ...POOL[3], col: 4 },
    { id: 4, ...POOL[4], col: 5 },
    { id: 5, ...POOL[5], col: 5 },
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
  const mover = [...b.leads].filter((l) => l.col < 6).sort((a, z) => z.col - a.col || a.id - z.id)[tick % 2 === 0 ? 0 : Math.min(1, b.leads.length - 1)];
  if (!mover) return { ...b, tick };
  let leads = b.leads.map((l) => (l.id === mover.id ? { ...l, col: l.col + 1 } : l));
  let converted = b.converted;
  const done = leads.filter((l) => l.col === 6);
  if (done.length > 1) {
    leads = leads.filter((l) => l.id !== done[0].id);
    converted += 1;
  }
  return { ...b, leads, converted, tick };
}


export function CrmBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [board, advance] = useReducer(step, initial);
  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(advance, 1700);
    return () => window.clearInterval(id);
  }, [inView, reduced]);
  return (
    <div ref={ref} className="overflow-hidden rounded-[20px] border border-edge bg-panel">
      <div className="flex items-center justify-between border-b border-edge px-4 py-3">
        <p className="text-[13px] font-semibold">Admissions pipeline</p>
        <p className="flex items-center gap-1.5 text-[12px] text-fg-muted">
          <span className="h-2 w-2 rounded-full bg-green" /> {board.converted} converted this month
        </p>
      </div>
      <LayoutGroup>
        <div className="grid grid-cols-7 gap-2 p-3">
          {COLUMNS.map((c, col) => {
            const cards = board.leads.filter((l) => l.col === col);
            return (
              <div key={c} className="min-h-[260px] rounded-xl bg-canvas-alt p-2">
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
                      <span className="mt-1.5 inline-block truncate rounded bg-sunken px-1.5 py-0.5 text-[10px] text-fg-muted">{l.source}</span>
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
  );
}

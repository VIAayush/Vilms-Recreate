"use client";

import { useEffect, useReducer, useRef } from "react";
import clsx from "clsx";
import { BarChart3, Download, FileText, Globe, MessageCircle, Workflow } from "lucide-react";
import { Cta } from "@/components/site/Cta";
import { pipeline } from "@/lib/content";
import { useInView, useReducedMotion } from "../motion";
import { Avatar, BrowserFrame, Illustrative, LiveDot } from "../screens/primitives";

const HIGHLIGHT_ICONS = [Workflow, FileText, Globe, MessageCircle, BarChart3, Download];
// A thin bar on each column says where the money is: blue while it's
// interest, yellow once someone is paying, green when the fee has landed.
const COLUMN_BAR = ["bg-primary", "bg-primary", "bg-yellow", "bg-green"];

/* ---------- a tiny pipeline simulation (sample data) ---------- */

type Lead = { id: number; name: string; source: string; col: number };
type Board = { leads: Lead[]; next: number; enrolled: number; event: string; tick: number };

const POOL = [
  { name: "Rahul K.", source: "Google Ads" },
  { name: "Sneha P.", source: "Free PDF" },
  { name: "Aman V.", source: "Meta ad" },
  { name: "Isha M.", source: "Webinar" },
  { name: "Karan S.", source: "Landing page" },
  { name: "Divya R.", source: "Google Ads" },
  { name: "Arjun T.", source: "Free PDF" },
  { name: "Neha G.", source: "Webinar" },
  { name: "Vikram S.", source: "Meta ad" },
  { name: "Pooja N.", source: "Landing page" },
];

const initial: Board = {
  leads: [
    { id: 0, ...POOL[0], col: 0 },
    { id: 1, ...POOL[1], col: 0 },
    { id: 2, ...POOL[2], col: 1 },
    { id: 3, ...POOL[3], col: 2 },
    { id: 4, ...POOL[4], col: 3 },
  ],
  next: 5,
  enrolled: 21,
  event: "New enquiry · Rahul K. from Google Ads",
  tick: 0,
};

const EVENTS = [
  (l: Lead) => `New enquiry · ${l.name} from ${l.source}`,
  (l: Lead) => `WhatsApp follow-up sent to ${l.name} · via your Wati`,
  (l: Lead) => `${l.name} started checkout · ₹15,000`,
  (l: Lead) => `${l.name} enrolled · paid to your Razorpay`,
];

function step(b: Board): Board {
  const tick = b.tick + 1;
  // Every third beat a new enquiry arrives; otherwise the most advanced
  // lead that isn't enrolled yet moves one stage on.
  if (tick % 3 === 0) {
    const p = POOL[b.next % POOL.length];
    const lead = { id: b.next, ...p, col: 0 };
    return { ...b, leads: [...b.leads, lead], next: b.next + 1, event: EVENTS[0](lead), tick };
  }
  const movable = b.leads.filter((l) => l.col < 3).sort((a, z) => z.col - a.col || a.id - z.id);
  const mover = movable[0];
  if (!mover) return { ...b, tick };
  const col = mover.col + 1;
  let leads = b.leads.map((l) => (l.id === mover.id ? { ...l, col } : l));
  // Keep two enrolled cards on the board; older ones roll into the count.
  const enrolledCards = leads.filter((l) => l.col === 3);
  if (enrolledCards.length > 2) leads = leads.filter((l) => l.id !== enrolledCards[0].id);
  return { ...b, leads, enrolled: b.enrolled + (col === 3 ? 1 : 0), event: EVENTS[col]({ ...mover, col }), tick };
}

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [board, advance] = useReducer(step, initial);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(advance, 1900);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <section id="crm" aria-labelledby="crm-title" className="border-y border-edge bg-canvas-alt py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="kicker">{pipeline.kicker}</p>
            <h2 id="crm-title" className="h2 mt-4 max-w-[13ch]">
              {pipeline.title}
            </h2>
            <p className="sub mt-5 max-w-[460px]">{pipeline.sub}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {pipeline.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i];
              return (
                <div key={h.title} className="group border-t border-edge pt-3 transition-colors duration-300 hover:border-primary">
                  <dt className="flex items-center gap-2 text-[14.5px] font-semibold">
                    <Icon aria-hidden className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />
                    {h.title}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-snug text-fg-muted">{h.text}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div ref={ref} className="mt-14">
          <BrowserFrame url="yourinstitute.vilms.in/admin/leads">
            <div className="no-scrollbar overflow-x-auto">
              <div className="grid min-w-[680px] grid-cols-4 gap-3 p-4 sm:p-5">
                {pipeline.columns.map((c, col) => {
                  const cards = board.leads.filter((l) => l.col === col);
                  return (
                    <div key={c} className="relative min-h-[260px] overflow-hidden rounded-xl bg-canvas-alt p-2.5 pt-3.5">
                      <span aria-hidden className={clsx("absolute inset-x-0 top-0 h-[3px]", COLUMN_BAR[col])} />
                      <div className="mb-2.5 flex items-center justify-between px-1">
                        <p className="text-[12.5px] font-semibold">{c}</p>
                        <span className={clsx("rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums", col === 3 ? "bg-green-tint text-green" : "bg-sunken text-fg-muted")}>
                          {col === 3 ? board.enrolled : cards.length}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {cards.map((l) => (
                          <li key={`${l.id}-${l.col}`} className="animate-pop-in rounded-xl border border-edge bg-panel p-2.5 shadow-sm">
                            <div className="flex items-center gap-2">
                              <Avatar name={l.name} size="sm" />
                              <span className="truncate text-[12.5px] font-semibold">{l.name}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2 text-[10.5px] text-fg-muted">
                              <span className="truncate">{l.source}</span>
                              {col === 1 ? <MessageCircle aria-label="WhatsApp follow-up sent" className="h-3.5 w-3.5 shrink-0 text-green" /> : null}
                              {col === 2 ? <span className="shrink-0 font-semibold text-fg">₹15,000</span> : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2.5 border-t border-edge px-4 py-3 text-[12.5px] sm:px-5">
              <LiveDot />
              <span key={board.tick} className="animate-rise-in truncate text-fg-muted">
                {board.event}
              </span>
            </div>
          </BrowserFrame>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Illustrative />
            <Cta intent="demo" location="crm" className="cta cta-outline" arrow>
              See the CRM in a demo
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Check, CheckCheck, ClipboardCheck, FileText, Funnel, IndianRupee, Lock, Palette, Settings2, Users, UsersRound, Video, type LucideIcon } from "lucide-react";
import { Avatar, Illustrative } from "@/components/marketing/screens/primitives";

/* ------------------------------------------------------------------ */
/* WhatsApp follow-up through the institute's own Wati account          */
/* ------------------------------------------------------------------ */
type Msg = { id: number; from: "lead" | "you"; text: string; state?: "sent" | "delivered" };
const TEMPLATES = [
  { label: "Demo reminder", text: "Hi Neha, your demo class is tomorrow at 5 PM. The joining link is on your confirmation." },
  { label: "Fee plan", text: "Hi Neha, here is the fee plan for Prelims Foundation. Happy to answer any questions." },
  { label: "Trial check-in", text: "Hi Neha, how is the trial going? Want to talk it through for five minutes?" },
];

export function WhatsAppDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 1, from: "lead", text: "Hi, is there an evening batch for Prelims Foundation?" },
    { id: 2, from: "you", text: "Yes, 6 PM on weekdays. Want a free demo class on Thursday?", state: "delivered" },
  ]);
  const [nextId, setNextId] = useState(3);
  const timers = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    const id = nextId;
    setNextId((n) => n + 1);
    setMsgs((m) => [...m, { id, from: "you" as const, text, state: "sent" as const }].slice(-5));
    timers.current.push(window.setTimeout(() => setMsgs((m) => m.map((x) => (x.id === id ? { ...x, state: "delivered" } : x))), 900));
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-edge bg-panel shadow-window">
      <div className="flex items-center gap-3 border-b border-edge bg-canvas-alt px-4 py-3">
        <Avatar name="Neha Verma" tone={0} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold leading-tight">Neha Verma</p>
          <p className="truncate text-[11.5px] text-fg-muted">Lead · Demo Scheduled</p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-green-tint px-2.5 py-1 text-[10.5px] font-semibold text-green sm:inline">Your Wati account</span>
      </div>

      <div ref={scroller} className="h-[270px] space-y-2 overflow-y-auto bg-canvas-alt/60 px-4 py-4" role="log" aria-label="Conversation">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              layout="position"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={clsx("max-w-[86%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug", m.from === "you" ? "ml-auto rounded-br-md bg-green-tint" : "rounded-bl-md bg-panel shadow-sm")}
            >
              {m.text}
              {m.from === "you" ? (
                <span className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] text-fg-faint">
                  {m.state === "delivered" ? <CheckCheck aria-hidden className="h-3 w-3 text-primary" /> : <Check aria-hidden className="h-3 w-3" />}
                  {m.state === "delivered" ? "Delivered" : "Sending"}
                </span>
              ) : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-edge p-3.5">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">Send a template</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => send(t.text)}
              className="min-h-[36px] rounded-full border border-edge-strong bg-panel px-3.5 text-[13px] font-medium transition duration-200 hover:-translate-y-px hover:border-primary hover:bg-primary-tint hover:text-primary active:translate-y-px"
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-fg-muted">Sent from your own number. Every message is logged on the lead card.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Roles                                                                */
/* ------------------------------------------------------------------ */
type Role = "owner" | "teacher" | "sales";
const ROLES: { id: Role; label: string; text: string }[] = [
  { id: "owner", label: "Owner / Admin", text: "Full access to everything." },
  { id: "teacher", label: "Teacher", text: "Courses, grading and materials for their sections." },
  { id: "sales", label: "Sales / Counsellor", text: "Leads, roster and payments only." },
];
const NAV: { label: string; Icon: LucideIcon; roles: Role[] }[] = [
  { label: "Courses", Icon: BookOpen, roles: ["owner", "teacher"] },
  { label: "Live classes", Icon: Video, roles: ["owner", "teacher"] },
  { label: "Tests & grading", Icon: ClipboardCheck, roles: ["owner", "teacher"] },
  { label: "Materials", Icon: FileText, roles: ["owner", "teacher"] },
  { label: "Leads", Icon: Funnel, roles: ["owner", "sales"] },
  { label: "Roster", Icon: Users, roles: ["owner", "sales"] },
  { label: "Payments", Icon: IndianRupee, roles: ["owner", "sales"] },
  { label: "Branding", Icon: Palette, roles: ["owner"] },
  { label: "Team & settings", Icon: Settings2, roles: ["owner"] },
];

export function RolesDemo() {
  const [role, setRole] = useState<Role>("sales");
  const cur = ROLES.find((r) => r.id === role)!;
  const allowed = NAV.filter((n) => n.roles.includes(role)).length;

  const onKey = (e: React.KeyboardEvent) => {
    const i = ROLES.findIndex((r) => r.id === role);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = ROLES[(i + (e.key === "ArrowRight" ? 1 : ROLES.length - 1)) % ROLES.length].id;
      setRole(next);
      document.getElementById(`role-${next}`)?.focus();
    }
  };

  return (
    <div className="rounded-[24px] border border-edge bg-panel p-4 shadow-window sm:p-5">
      <div role="radiogroup" aria-label="Team role" onKeyDown={onKey} className="grid grid-cols-3 gap-1 rounded-xl bg-canvas-alt p-1">
        {ROLES.map((r) => (
          <button
            key={r.id}
            id={`role-${r.id}`}
            type="button"
            role="radio"
            aria-checked={role === r.id}
            tabIndex={role === r.id ? 0 : -1}
            onClick={() => setRole(r.id)}
            className={clsx("flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-1.5 text-center text-[12.5px] font-semibold leading-tight transition duration-200 sm:text-[13px]", role === r.id ? "bg-panel text-fg shadow-sm ring-1 ring-edge" : "text-fg-muted hover:text-fg")}
          >
            <UsersRound aria-hidden className="hidden h-3.5 w-3.5 shrink-0 sm:block" /> {r.label}
          </button>
        ))}
      </div>

      <p className="mt-4 min-h-[24px] text-[14px] text-fg-muted" aria-live="polite">
        <b className="font-semibold text-fg">{cur.label}.</b> {cur.text}
      </p>

      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {NAV.map(({ label, Icon, roles }) => {
          const ok = roles.includes(role);
          return (
            <li
              key={label}
              className={clsx("flex min-h-[44px] items-center gap-2.5 rounded-xl border px-3 text-[13.5px] font-medium transition-all duration-300", ok ? "border-primary/40 bg-primary-tint text-primary" : "border-edge bg-canvas-alt/60 text-fg-faint")}
            >
              <Icon aria-hidden className="h-4 w-4 shrink-0" />
              <span className={clsx("flex-1 truncate", !ok && "line-through decoration-edge-strong")}>{label}</span>
              <span className="sr-only">{ok ? "visible" : "hidden"}</span>
              {ok ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Lock aria-hidden className="h-3 w-3" />}
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-fg-muted">
        <span>
          {allowed} of {NAV.length} sections visible
        </span>
        <Illustrative />
      </div>
    </div>
  );
}

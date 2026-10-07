"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { EvalScene, PayScene } from "@/components/marketing/screens/scenes";
import { Avatar, Pill } from "@/components/marketing/screens/primitives";
import { useAutoplay, useInView, useReducedMotion } from "@/components/marketing/motion";
import { EASE, swap } from "@/components/site-ui/motion-tokens";
import { MAX_LIMIT, PLANS, planById } from "../plans";

// Eight reasons, each with a small interactive visual. The list on the left
// is a proper tablist; the stage on the right swaps with the selection.

type Reason = { id: string; title: string; line: string; stage: React.ReactNode };

const note = "mt-4 text-[13.5px] leading-relaxed text-fg-muted";

/* --------------------------- 1 · your brand --------------------------- */
const TONES = [
  { id: "blue", label: "Blue", bg: "bg-primary", soft: "bg-primary-tint text-primary" },
  { id: "navy", label: "Navy", bg: "bg-navy", soft: "bg-navy-tint text-navy" },
  { id: "green", label: "Green", bg: "bg-green", soft: "bg-green-tint text-green" },
  { id: "red", label: "Red", bg: "bg-red", soft: "bg-red-tint text-red" },
] as const;
const onFill = "text-white";

function BrandStage() {
  const name = useId();
  const [tone, setTone] = useState<(typeof TONES)[number]>(TONES[0]);
  return (
    <div>
      <fieldset>
        <legend className="text-[13px] font-semibold">Pick your institute&apos;s colour</legend>
        <div className="mt-2 flex gap-2.5">
          {TONES.map((t) => (
            <label
              key={t.id}
              className={clsx(
                "relative grid h-9 w-9 cursor-pointer place-items-center rounded-full transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                t.bg,
                tone.id === t.id ? "ring-2 ring-fg ring-offset-2 ring-offset-panel" : "hover:scale-110",
              )}
            >
              <input type="radio" name={name} value={t.id} checked={tone.id === t.id} onChange={() => setTone(t)} className="sr-only" />
              <span className="sr-only">{t.label}</span>
              {tone.id === t.id ? <Check aria-hidden className={clsx("h-4 w-4", onFill)} strokeWidth={3} /> : null}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 overflow-hidden rounded-2xl border border-edge bg-canvas">
        <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
          <span className={clsx("grid h-8 w-8 place-items-center rounded-lg text-[11px] font-bold transition-colors duration-500", tone.bg, onFill)}>YA</span>
          <span className="text-[14px] font-semibold">Your Academy</span>
          <span className="ml-auto hidden gap-4 text-[12px] text-fg-muted sm:flex">
            <span>Courses</span>
            <span>Webinars</span>
            <span>Sign in</span>
          </span>
        </div>
        <div className="px-4 py-6">
          <p className={clsx("inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-500", tone.soft)}>Hybrid · recorded + live</p>
          <p className="mt-3 font-display text-[22px] font-medium leading-tight tracking-[-0.02em]">Prelims Foundation Batch</p>
          <div className="mt-5 flex items-center gap-4">
            <span className={clsx("rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-500", tone.bg, onFill)}>Enrol now</span>
            <span className="font-display text-[20px] font-medium tabular-nums">₹15,000</span>
          </div>
        </div>
      </div>
      <p className={note}>Logo, colours and emails come from you, so every screen and message carries your institute&apos;s name. Students never see VILMS.</p>
    </div>
  );
}

/* --------------------------- 2 · your domain -------------------------- */
function DomainStage() {
  const [own, setOwn] = useState(false);
  const url = own ? "learn.youracademy.in" : "yourname.vilms.in";
  return (
    <div>
      <div role="group" aria-label="Web address" className="inline-flex rounded-full border border-edge bg-canvas p-1 text-[13px] font-medium">
        {(
          [
            [false, "Every plan"],
            [true, "Growth and above"],
          ] as const
        ).map(([v, label]) => (
          <button
            key={label}
            type="button"
            aria-pressed={own === v}
            onClick={() => setOwn(v)}
            className={clsx("rounded-full px-3.5 py-1.5 transition-colors", own === v ? "bg-navy text-white" : "text-fg-muted hover:text-fg")}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-edge bg-canvas px-4 py-3">
        <Lock aria-hidden className="h-3.5 w-3.5 shrink-0 text-green" />
        <div className="relative h-[22px] min-w-0 flex-1 overflow-hidden font-mono text-[14px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={url} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="absolute inset-0 truncate">
              {url}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {[
          ["Certificate", "Issued by Your Academy"],
          ["Receipt", "Your Academy · GST invoice"],
          ["Email", "From Your Academy"],
        ].map(([k, v]) => (
          <li key={k} className="rounded-xl border border-edge bg-canvas px-3.5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">{k}</p>
            <p className="mt-1 text-[13px] font-medium leading-snug">{v}</p>
          </li>
        ))}
      </ul>
      <p className={note}>Not in the web address, not in the emails. Your own domain such as learn.youracademy.in is available from the Growth plan; you can move over without losing anything.</p>
    </div>
  );
}

/* --------------------------- 3 · one platform ------------------------- */
const RECORD = [
  ["Lead CRM", "Asked about Prelims Foundation", "Google Ads"],
  ["Payments", "₹15,000 paid via your Razorpay", "Paid"],
  ["Courses", "Prelims Foundation Batch", "In progress"],
  ["Evaluation", "Mock test 1 · mentor approved", "16/20"],
  ["Certificates", "Issued in your institute's name", "Ready"],
] as const;

function PlatformStage() {
  return (
    <div>
      <div className="rounded-2xl border border-edge bg-canvas p-4">
        <div className="flex items-center gap-3">
          <Avatar name="Rahul Kumar" size="lg" tone={0} />
          <div>
            <p className="text-[15px] font-semibold">Rahul Kumar</p>
            <p className="text-[12px] text-fg-muted">One student record</p>
          </div>
        </div>
        <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }} className="mt-4 divide-y divide-edge border-y border-edge">
          {RECORD.map(([module, text, tag]) => (
            <motion.li key={module} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } } }} className="flex items-center gap-3 py-2.5">
              <span className="w-[86px] shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-primary">{module}</span>
              <span className="min-w-0 flex-1 truncate text-[13px]">{text}</span>
              <Pill tone={tag === "Paid" || tag === "Ready" ? "green" : "muted"}>{tag}</Pill>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <p className={note}>The lead, the payment, the lessons, the grade and the certificate are one record in one database. Nothing is re-typed between tools.</p>
    </div>
  );
}

/* --------------------------- 4 · lead pipeline ------------------------ */
const COLUMNS = ["New enquiry", "Webinar RSVP", "Checkout started", "Enrolled"];

function LeadsStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [step, select] = useAutoplay(COLUMNS.length, { interval: 1500, running: inView && !reduced });
  const at = reduced ? COLUMNS.length - 1 : step;
  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {COLUMNS.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => select(i)}
            aria-label={`Move the lead to ${c}`}
            className={clsx("min-h-[132px] rounded-xl border p-2.5 text-left transition-colors", i === at ? "border-primary/50 bg-primary-tint/60" : "border-edge bg-canvas hover:border-edge-strong")}
          >
            <p className="truncate text-[11px] font-semibold text-fg-muted">{c}</p>
            <div className="mt-2.5 space-y-1.5">
              {i === at ? (
                <motion.div layoutId="lead-card" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="rounded-lg border border-edge bg-panel p-2 shadow-soft">
                  <div className="flex items-center gap-1.5">
                    <Avatar name="Priya Sharma" size="sm" />
                    <span className="truncate text-[11.5px] font-semibold">Priya S.</span>
                  </div>
                  <p className="mt-1 truncate text-[10.5px] text-fg-muted">{i === 3 ? "₹15,000 · Paid" : "Prelims Foundation"}</p>
                </motion.div>
              ) : null}
              <span aria-hidden className="block h-7 rounded-lg bg-sunken/70" />
              {i % 2 === 0 ? <span aria-hidden className="block h-7 rounded-lg bg-sunken/40" /> : null}
            </div>
          </button>
        ))}
      </div>
      <p className={note}>Enquiries, checkouts and webinar RSVPs land in one pipeline, so no lead is lost in a chat thread. Click a column to move the lead yourself.</p>
    </div>
  );
}

/* --------------------------- 5 · AI evaluation ------------------------ */
function EvalStage() {
  const [approved, setApproved] = useState(false);
  return (
    <div>
      <EvalScene approved={approved} />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setApproved((v) => !v)} className={clsx("cta cta-sm", approved ? "cta-ghost" : "cta-primary")}>
          {approved ? "Undo approval" : "Mentor approves"}
        </button>
        <p className="text-[13px] text-fg-muted">{approved ? "Now the student can see it." : "The student sees nothing yet."}</p>
      </div>
      <p className={note}>AI drafts against your rubric. A mentor approves before the student sees anything, and you can bring your own Anthropic or OpenAI key at cost.</p>
    </div>
  );
}

/* --------------------------- 6 · payments ----------------------------- */
function PaymentsStage() {
  return (
    <div>
      <PayScene />
      <p className={note}>Fees go straight to your own Razorpay account, with UPI and bank transfer as a fallback and GST-aware invoices in your name. Card details stay with your payment provider.</p>
    </div>
  );
}

/* --------------------------- 7 · scalability -------------------------- */
function ScaleStage() {
  const id = useId();
  const plan = planById("growth");
  const [pct, setPct] = useState(60);
  const students = Math.round((plan.limit * pct) / 100);
  const state = pct >= 100 ? "limit" : pct >= 80 ? "warn" : "ok";
  const MSG = {
    ok: "Within your plan.",
    warn: "Warning email at 80% of a limit.",
    limit: "At the limit, nothing switches off. Your site and classes keep running.",
  } as const;
  return (
    <div>
      <div className="flex items-end gap-2" aria-hidden>
        {PLANS.map((p) => (
          <div key={p.id} className="flex flex-1 flex-col items-center gap-1.5">
            <div className={clsx("w-full rounded-t-lg transition-colors duration-500", p.id === plan.id ? "bg-primary" : "bg-sunken")} style={{ height: `${Math.max(14, Math.sqrt(p.limit / MAX_LIMIT) * 96)}px` }} />
            <span className={clsx("text-[11.5px] font-medium", p.id === plan.id ? "text-primary" : "text-fg-muted")}>{p.name}</span>
            <span className="font-mono text-[10.5px] tabular-nums text-fg-faint">{p.limit.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-edge bg-canvas p-4">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={id} className="text-[13px] font-semibold">
            {plan.name} plan usage
          </label>
          <span className="font-mono text-[13px] tabular-nums">
            {students.toLocaleString("en-IN")} / {plan.limit.toLocaleString("en-IN")} students
          </span>
        </div>
        <div className="relative mt-3 h-3 overflow-hidden rounded-full bg-sunken">
          <motion.div
            initial={false}
            animate={{ width: `${Math.min(100, pct)}%` }}
            transition={{ duration: 0.25 }}
            className={clsx("h-full rounded-full transition-colors duration-300", state === "ok" ? "bg-primary" : state === "warn" ? "bg-yellow" : "bg-red")}
          />
          <span aria-hidden className="absolute inset-y-0 left-[80%] w-px bg-fg/40" />
        </div>
        <input id={id} type="range" min={10} max={110} step={1} value={pct} onChange={(e) => setPct(Number(e.target.value))} aria-valuetext={`${students} of ${plan.limit} students, ${MSG[state]}`} className="price-range mt-2 w-full" style={{ ["--fill" as string]: `${((pct - 10) / 100) * 100}%` }} />
        <p className="mt-1 flex items-center gap-2 text-[13px]" aria-live="polite">
          <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-green" /> {MSG[state]}
        </p>
      </div>
      <p className={note}>Four plans, each with a published student limit. Live usage meters warn you at 80% and 100%, and you upgrade when you need to.</p>
    </div>
  );
}
/* --------------------------- 8 · roles -------------------------------- */
const MODULES = ["Courses", "Grading", "Materials", "Leads", "Roster", "Payments", "Team & settings"] as const;
const ROLES: { id: string; name: string; sees: readonly (typeof MODULES)[number][] }[] = [
  { id: "owner", name: "Owner / Admin", sees: MODULES },
  { id: "teacher", name: "Teacher", sees: ["Courses", "Grading", "Materials"] },
  { id: "sales", name: "Sales / Counsellor", sees: ["Leads", "Roster", "Payments"] },
];

function RolesStage() {
  const [role, setRole] = useState(ROLES[1]);
  return (
    <div>
      <div role="radiogroup" aria-label="Role" className="flex flex-wrap gap-2">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={role.id === r.id}
            onClick={() => setRole(r)}
            className={clsx("rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors", role.id === r.id ? "border-navy bg-navy text-white" : "border-edge text-fg-muted hover:border-edge-strong hover:text-fg")}
          >
            {r.name}
          </button>
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {MODULES.map((m) => {
          const on = role.sees.includes(m);
          return (
            <li key={m} className={clsx("flex items-center gap-2 rounded-xl border px-3 py-3 text-[13px] font-medium transition-all duration-300", on ? "border-primary/40 bg-primary-tint text-primary" : "border-edge bg-canvas text-fg-faint")}>
              {on ? <Check aria-hidden className="h-4 w-4 shrink-0" strokeWidth={3} /> : <Lock aria-hidden className="h-3.5 w-3.5 shrink-0" />}
              <span className="truncate">{m}</span>
              <span className="sr-only">{on ? "(visible)" : "(hidden)"}</span>
            </li>
          );
        })}
      </ul>
      <p className={note}>One login for the whole team. Each person sees only what their role needs, so there is less to set up, explain and clean up.</p>
    </div>
  );
}

const REASONS: Reason[] = [
  { id: "brand", title: "Your brand", line: "Logo, colours, emails and certificates are yours.", stage: <BrandStage /> },
  { id: "domain", title: "Your domain", line: "Your own web address. Students never see VILMS.", stage: <DomainStage /> },
  { id: "one", title: "One platform", line: "Courses, classes, tests, payments and leads on one database.", stage: <PlatformStage /> },
  { id: "leads", title: "Lead management", line: "Every enquiry, checkout and RSVP in one pipeline.", stage: <LeadsStage /> },
  { id: "ai", title: "AI-assisted evaluation", line: "AI drafts against your rubric. A mentor approves.", stage: <EvalStage /> },
  { id: "pay", title: "Payments", line: "Your Razorpay, UPI fallback, GST-aware invoices.", stage: <PaymentsStage /> },
  { id: "scale", title: "Scalability", line: "Published limits, early warnings, nothing switches off.", stage: <ScaleStage /> },
  { id: "roles", title: "Less to run", line: "One login. Each role sees only what it needs.", stage: <RolesStage /> },
];

export function ReasonsExplorer() {
  const uid = useId();
  const [i, setI] = useState(0);
  const cur = REASONS[i];

  const onKey = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const n = (i + next + REASONS.length) % REASONS.length;
    setI(n);
    document.getElementById(`${uid}-tab-${n}`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
      {/* tablist: pills on phones, ruled list on desktop */}
      <div role="tablist" aria-label="Reasons to choose VILMS" aria-orientation="vertical" onKeyDown={onKey} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:block lg:overflow-visible lg:border-t lg:border-edge lg:px-0 lg:pb-0">
        {REASONS.map((r, n) => {
          const on = n === i;
          return (
            <button
              key={r.id}
              id={`${uid}-tab-${n}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setI(n)}
              className={clsx(
                "group relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-left text-[14px] font-medium transition-colors lg:block lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-b lg:border-edge lg:bg-transparent lg:px-0 lg:py-4",
                on ? "border-navy bg-navy text-white lg:text-fg" : "border-edge text-fg-muted hover:text-fg",
              )}
            >
              {on ? <motion.span layoutId={`${uid}-bar`} transition={{ type: "spring", stiffness: 400, damping: 36 }} aria-hidden className="absolute -bottom-px left-0 hidden h-[2px] w-full bg-primary lg:block" /> : null}
              <span className="flex items-baseline gap-4">
                <span className={clsx("hidden font-mono text-[12px] tabular-nums lg:inline", on ? "text-primary" : "text-fg-faint")}>{String(n + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className={clsx("block lg:text-[20px] lg:tracking-[-0.015em]", on ? "lg:text-fg" : "lg:text-fg-muted lg:group-hover:text-fg")}>{r.title}</span>
                  <span className={clsx("hidden max-w-[360px] text-[14px] font-normal leading-snug text-fg-muted lg:mt-1 lg:block", !on && "lg:hidden")}>{r.line}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${i}`} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 text-[15px] leading-snug text-fg-muted lg:hidden">{cur.line}</p>
        <div className="rounded-[24px] border border-edge bg-panel p-5 shadow-window sm:p-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={cur.id} {...swap}>
              {cur.stage}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Illustrative interface · sample data</p>
      </div>
    </div>
  );
}

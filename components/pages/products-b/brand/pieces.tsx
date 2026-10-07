"use client";

import clsx from "clsx";
import { Award, BookOpen, Check, Lock, Play } from "lucide-react";
import { Wordmark } from "@/components/marketing/BrandMark";
import { accentOf, addressOf, displayName, emailFrom, initialsOf, inkFor, vilmsPlaces, type Brand, type MarkStyle } from "./brand";

// The three things a student sees, drawn once and driven by a Brand. The
// accent colour travels as a CSS variable so every part fades to the new
// colour together. Arbitrary colours are fine here: the visitor picks them.

const accentStyle = (b: Brand) => ({ ["--b" as string]: accentOf(b), ["--bi" as string]: inkFor(accentOf(b)) });

/** An invented institute mark: initials in a shape. Never the VILMS logo. */
export function InstituteLogo({ name, mark, size = 28, className }: { name: string; mark: MarkStyle; size?: number; className?: string }) {
  const common = { width: size, height: size, background: "var(--b)", color: "var(--bi)", fontSize: size * 0.4 };
  const base = "grid shrink-0 place-items-center font-bold leading-none transition-colors duration-500";
  if (mark === "book")
    return (
      <span aria-hidden className={clsx(base, "rounded-[24%]", className)} style={common}>
        <BookOpen style={{ width: size * 0.56, height: size * 0.56 }} />
      </span>
    );
  return (
    <span
      aria-hidden
      className={clsx(base, mark === "circle" ? "rounded-full" : mark === "square" ? "rounded-[24%]" : "", className)}
      style={{ ...common, ...(mark === "shield" ? { clipPath: "polygon(0 0, 100% 0, 100% 58%, 50% 100%, 0 58%)", paddingBottom: size * 0.12 } : {}) }}
    >
      {initialsOf(name)}
    </span>
  );
}

/** Logo + name: VILMS (the real wordmark) before branding, the institute after. */
export function BrandLockup({ b, size = 28 }: { b: Brand; size?: number }) {
  if (!b.branded) return <Wordmark variant="light" className="[&>span:first-child]:h-6 [&>span:first-child]:w-[32px] [&>span:last-child]:text-[16px]" />;
  return (
    <span className="flex min-w-0 items-center gap-2">
      <InstituteLogo name={b.name} mark={b.mark} size={size} />
      <span className="truncate text-[14px] font-semibold tracking-tight">{displayName(b)}</span>
    </span>
  );
}

/** The student portal. */
export function BrandPortal({ b }: { b: Brand }) {
  const name = displayName(b);
  return (
    <div style={accentStyle(b)} className="bg-panel text-fg">
      <div className="flex items-center gap-4 border-b border-edge px-4 py-2.5">
        <BrandLockup b={b} />
        <nav aria-hidden className="ml-3 hidden gap-4 text-[12px] text-fg-muted sm:flex">
          <span className="font-semibold text-fg">Courses</span>
          <span>Live classes</span>
          <span>Results</span>
        </nav>
        <span aria-hidden className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-sunken text-[10px] font-semibold">
          RK
        </span>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-2xl p-4 transition-colors duration-500 sm:p-5" style={{ background: "var(--b)", color: "var(--bi)" }}>
          <p className="text-[11px] font-medium opacity-80">Welcome back, Rahul</p>
          <p className="mt-1 font-display text-[clamp(18px,2.4vw,24px)] font-semibold leading-tight tracking-tight">Prelims Foundation Batch</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0E1B2C]">
            <Play aria-hidden className="h-3 w-3" fill="currentColor" /> Continue lesson 4
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-edge p-3.5">
          <p className="text-[11px] text-fg-muted">Your progress</p>
          <p className="mt-0.5 text-[13px] font-semibold">Polity essentials</p>
          <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-sunken">
            <span className="block h-full w-[58%] rounded-full transition-colors duration-500" style={{ background: "var(--b)" }} />
          </span>
          <p className="mt-1.5 font-mono text-[10.5px] text-fg-faint">7 of 12 lessons</p>
        </div>
        <div className="rounded-xl border border-edge p-3.5">
          <p className="text-[11px] text-fg-muted">Next live class</p>
          <p className="mt-0.5 text-[13px] font-semibold">Doubt clearing</p>
          <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-fg-muted">
            <span className="h-2 w-2 rounded-full transition-colors duration-500" style={{ background: "var(--b)" }} /> Thu 7:00 PM
          </p>
        </div>
      </div>
      <p className="border-t border-edge px-4 py-2 font-mono text-[10px] text-fg-faint">© {name}</p>
    </div>
  );
}

/** The certificate a student is issued. */
export function BrandCertificate({ b }: { b: Brand }) {
  const name = displayName(b);
  return (
    <div style={accentStyle(b)} className="rounded-2xl border border-edge bg-panel p-1.5 shadow-window">
      <div className="relative rounded-xl border-2 px-4 py-4 text-center transition-colors duration-500" style={{ borderColor: "var(--b)" }}>
        <div className="flex justify-center">
          <BrandLockup b={b} size={26} />
        </div>
        <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-fg-muted">Certificate of completion</p>
        <p className="mt-1.5 font-serif text-[26px] italic leading-none">Rahul Kumar</p>
        <p className="mt-1.5 text-[11px] text-fg-muted">Prelims Foundation Batch</p>
        <div className="mt-3 flex items-end justify-between gap-3 text-left text-[9.5px] text-fg-muted">
          <span>
            Issued by
            <br />
            <b className="text-[11px] text-fg">{name}</b>
          </span>
          <Award aria-hidden className="h-7 w-7 shrink-0 transition-colors duration-500" style={{ color: "var(--b)" }} />
        </div>
      </div>
    </div>
  );
}

/** The email a student gets. */
export function BrandEmail({ b }: { b: Brand }) {
  const from = emailFrom(b);
  return (
    <div style={accentStyle(b)} className="overflow-hidden rounded-2xl border border-edge bg-panel shadow-window">
      <div className="border-b border-edge px-3.5 py-2.5 text-[11px]">
        <p className="truncate">
          <span className="text-fg-faint">From </span>
          <b className="font-semibold">{from.name}</b> <span className="text-fg-muted">&lt;{from.address}&gt;</span>
        </p>
        <p className="mt-0.5 truncate font-semibold">Your evaluated copy is ready</p>
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-500" style={{ background: "var(--b)", color: "var(--bi)" }}>
          <BrandLockupInverse b={b} />
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-fg-muted">Hi Rahul, your answer for Mock Test 1 has been evaluated. You scored 16 out of 20.</p>
        <span className="mt-3 inline-flex rounded-lg px-3.5 py-2 text-[12px] font-semibold transition-colors duration-500" style={{ background: "var(--b)", color: "var(--bi)" }}>
          View evaluated copy
        </span>
        <p className="mt-3 border-t border-edge pt-2 font-mono text-[9.5px] text-fg-faint">
          {displayName(b)} · {addressOf(b)}
        </p>
      </div>
    </div>
  );
}

function BrandLockupInverse({ b }: { b: Brand }) {
  // on the accent band: the name in the accent's ink colour (the real VILMS logo stays out of coloured bands)
  return (
    <span className="flex min-w-0 items-center gap-2">
      {b.branded ? <InstituteLogo name={b.name} mark={b.mark} size={22} className="ring-1 ring-current/40" /> : null}
      <span className="truncate font-logo text-[13px] font-semibold tracking-[0.06em]">{displayName(b)}</span>
    </span>
  );
}

/** "VILMS appears in N places" — the proof that it is gone. */
export function VilmsPlaces({ b }: { b: Brand }) {
  const places = vilmsPlaces(b);
  const n = places.filter((p) => p.on).length;
  return (
    <div className="rounded-2xl border border-edge bg-panel p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-semibold">Where a student can see &ldquo;VILMS&rdquo;</p>
        <p className={clsx("font-display text-[30px] font-semibold tabular-nums leading-none transition-colors duration-500", n === 0 ? "text-green" : "text-fg")} aria-live="polite">
          {n}
        </p>
      </div>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {places.map((p) => (
          <li key={p.label} className="flex items-center gap-2 text-[12.5px]">
            <span className={clsx("grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-500", p.on ? "bg-sunken text-fg-faint" : "bg-green-tint text-green")}>
              {p.on ? <Lock aria-hidden className="h-3 w-3" /> : <Check aria-hidden className="h-3 w-3" />}
            </span>
            <span className={clsx("transition-colors", p.on ? "text-fg-muted" : "text-fg")}>{p.label}</span>
            <span className="sr-only">{p.on ? "shows VILMS" : "shows only your brand"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

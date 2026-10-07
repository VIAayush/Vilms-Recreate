"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { EASE } from "@/components/site-ui/motion-tokens";
import { brand } from "@/lib/content";

type Option = {
  id: string;
  label: string;
  /** an inbox, or an on-site page */
  email?: string;
  inbox?: string;
  href?: string;
  action?: string;
};

// "Which email?" — plain routing from what you need to where it goes. Only the
// two real inboxes exist (general and support share one; billing has its own).
const OPTIONS: Option[] = [
  { id: "general", label: "A question about VILMS, or I need support", email: brand.emails.general, inbox: "General & support" },
  { id: "billing", label: "An invoice, payment or billing matter", email: brand.emails.billing, inbox: "Billing" },
  { id: "demo", label: "I'd like to see VILMS on my own setup", href: "/book-a-demo", action: "Book a 30-minute demo" },
  { id: "plans", label: "I'm still choosing a plan", href: "/pricing", action: "See the plans" },
];

export function EmailHelper() {
  const name = useId();
  const [picked, setPicked] = useState(OPTIONS[0]);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still on screen and in the mailto link */
    }
  };

  return (
    <div>
      <fieldset>
        <legend className="font-display text-[22px] font-medium tracking-[-0.025em]">Which email?</legend>
        <p className="mt-1 text-[14.5px] text-fg-muted">Pick what you need and we&apos;ll point you to the right place.</p>
        <div className="mt-5 divide-y divide-edge border-y border-edge">
          {OPTIONS.map((o) => {
            const on = picked.id === o.id;
            return (
              <label
                key={o.id}
                className={clsx(
                  "group relative flex cursor-pointer items-center gap-4 px-1 py-4 transition-colors duration-200 has-[:focus-visible]:bg-sunken",
                  on ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                <input type="radio" name={name} value={o.id} checked={on} onChange={() => {
                  setPicked(o);
                  setCopied(false);
                }} className="sr-only" />
                <span aria-hidden className={clsx("grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-200", on ? "border-navy bg-navy" : "border-edge-strong group-hover:border-primary")}>
                  <span className={clsx("h-1.5 w-1.5 rounded-full bg-white transition-transform duration-200", on ? "scale-100" : "scale-0")} />
                </span>
                <span className="min-w-0 flex-1 text-[16px] font-medium leading-snug">{o.label}</span>
                <span aria-hidden className={clsx("font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity", on ? "text-primary opacity-100" : "opacity-0")}>
                  Selected
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 min-h-[168px] rounded-2xl bg-canvas-alt p-5 sm:p-6" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={picked.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease: EASE }}>
            {picked.email ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">{picked.inbox}</p>
                <a href={`mailto:${picked.email}`} className="mt-2 block break-all font-display text-[clamp(22px,2.6vw,30px)] font-medium tracking-[-0.025em] transition-colors hover:text-primary">
                  {picked.email}
                </a>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a href={`mailto:${picked.email}`} className="cta cta-primary cta-sm">
                    <Mail aria-hidden className="h-4 w-4" /> Write an email
                  </a>
                  <button type="button" onClick={() => void copy(picked.email!)} className="cta cta-ghost cta-sm">
                    {copied ? <Check aria-hidden className="h-4 w-4 text-green" strokeWidth={3} /> : <Copy aria-hidden className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy address"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">On this site</p>
                <p className="mt-2 font-display text-[clamp(22px,2.6vw,30px)] font-medium tracking-[-0.025em]">{picked.action}</p>
                <p className="mt-2 text-[14.5px] text-fg-muted">No email needed. {picked.id === "demo" ? "Fill in the form and one person from our team will reach out." : "Compare the plans and slide to your student count."}</p>
                <Link href={picked.href!} className="cta cta-primary cta-sm mt-5">
                  {picked.action} <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

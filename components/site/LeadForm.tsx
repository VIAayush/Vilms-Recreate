"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarCheck, CheckCircle2, ChevronDown, Loader2, Rocket } from "lucide-react";
import { leadFormSchema, type LeadFormValues } from "@/lib/lead-schema";
import { INSTITUTE_TYPES, INTERESTS, STUDENT_COUNTS, type Interest } from "@/lib/lead-options";
import { getAttribution, track } from "@/lib/client/tracking";
import { DEMO_BOOKING_URL, TRIAL_URL, TURNSTILE_SITE_KEY } from "@/lib/env";

type Props = {
  interest: Interest;
  location: string;
  onClose?: () => void;
};

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "done" };

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(16)}-0000-4000-8000-${Math.random().toString(16).slice(2, 14).padEnd(12, "0")}`;
}

export function LeadForm({ interest, location, onClose }: Props) {
  const uid = useId();
  const submissionId = useRef(newId());
  const openedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [moreOpen, setMoreOpen] = useState(false);
  const [doneInterest, setDoneInterest] = useState<Interest>(interest);

  const openTracked = useRef(false);
  useEffect(() => {
    openedAt.current = Date.now();
    // Once per form instance, even when React re-runs effects (Strict Mode, fast refresh).
    if (openTracked.current) return;
    openTracked.current = true;
    track("demo_form_open", location);
  }, [location]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      institute_name: "",
      email: "",
      phone: "",
      city: "",
      website: "",
      current_lms: "",
      message: "",
      interest,
      consent: false as unknown as true,
    },
  });

  const submitLead = async (values: LeadFormValues) => {
    setStatus({ kind: "idle" });
    const turnstile = formRef.current?.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value;
    const honeypot = formRef.current?.querySelector<HTMLInputElement>('input[name="company_fax"]')?.value ?? "";

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          submission_id: submissionId.current,
          form_location: location,
          elapsed_ms: Date.now() - openedAt.current,
          company_fax: honeypot,
          turnstile_token: turnstile || undefined,
          attribution: getAttribution(),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string[] | undefined>;
      };

      if (res.ok && json.ok) {
        track("demo_form_submit", location);
        setDoneInterest(values.interest);
        setStatus({ kind: "done" });
        return;
      }
      if (json.fields) {
        Object.entries(json.fields).forEach(([name, msgs]) => {
          if (msgs?.[0]) setError(name as FieldPath<LeadFormValues>, { message: msgs[0] });
        });
      }
      setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  };

  if (status.kind === "done") {
    return <SuccessState interest={doneInterest} onClose={onClose} />;
  }

  const fieldId = (name: string) => `${uid}-${name}`;
  const err = (name: keyof LeadFormValues) =>
    errors[name]?.message ? (
      <p id={`${fieldId(name)}-error`} className="v-error" role="alert">
        {String(errors[name]?.message)}
      </p>
    ) : null;
  const a11y = (name: keyof LeadFormValues) => ({
    id: fieldId(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={(e) => void handleSubmit(submitLead)(e)} noValidate className="space-y-4" data-lead-form>
      {TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      ) : null}

      {/* Honeypot — hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={fieldId("company_fax")}>Company fax</label>
        <input id={fieldId("company_fax")} name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("full_name")} className="v-label">Full name</label>
          <input {...register("full_name")} {...a11y("full_name")} className="v-field" autoComplete="name" placeholder="Priya Sharma" />
          {err("full_name")}
        </div>
        <div>
          <label htmlFor={fieldId("institute_name")} className="v-label">Institute name</label>
          <input {...register("institute_name")} {...a11y("institute_name")} className="v-field" autoComplete="organization" placeholder="ABC Coaching Institute" />
          {err("institute_name")}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className="v-label">Work email</label>
          <input {...register("email")} {...a11y("email")} type="email" inputMode="email" className="v-field" autoComplete="email" placeholder="you@yourinstitute.in" />
          {err("email")}
        </div>
        <div>
          <label htmlFor={fieldId("phone")} className="v-label">Phone / WhatsApp</label>
          <input {...register("phone")} {...a11y("phone")} type="tel" inputMode="tel" className="v-field" autoComplete="tel" placeholder="98765 43210" />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={fieldId("city")} className="v-label">City</label>
          <input {...register("city")} {...a11y("city")} className="v-field" autoComplete="address-level2" placeholder="Jaipur" />
          {err("city")}
        </div>
        <div>
          <label htmlFor={fieldId("institute_type")} className="v-label">Institute type</label>
          <select {...register("institute_type")} {...a11y("institute_type")} className="v-field" defaultValue="">
            <option value="" disabled>Choose one</option>
            {INSTITUTE_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {err("institute_type")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={fieldId("student_count")} className="v-label">Number of students</label>
          <select {...register("student_count")} {...a11y("student_count")} className="v-field" defaultValue="">
            <option value="" disabled>Choose a range</option>
            {STUDENT_COUNTS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {err("student_count")}
        </div>
      </div>

      <div className="rounded-2xl border border-edge bg-canvas-alt">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[14px] font-semibold text-fg"
          aria-expanded={moreOpen}
          aria-controls={fieldId("more")}
          onClick={() => setMoreOpen((v) => !v)}
        >
          Add more details <span className="ml-1 font-normal text-fg-muted">(optional)</span>
          <ChevronDown aria-hidden className={`ml-auto h-4 w-4 transition ${moreOpen ? "rotate-180" : ""}`} />
        </button>
        <div
          id={fieldId("more")}
          hidden={!moreOpen}
          className={`${moreOpen ? "grid" : "hidden"} gap-4 border-t border-edge px-4 pb-4 pt-4 sm:grid-cols-2`}
        >
          <div>
            <label htmlFor={fieldId("interest")} className="v-label">What are you interested in?</label>
            <select {...register("interest")} {...a11y("interest")} className="v-field">
              {INTERESTS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {err("interest")}
          </div>
          <div>
            <label htmlFor={fieldId("current_lms")} className="v-label">Current LMS / platform</label>
            <input {...register("current_lms")} {...a11y("current_lms")} className="v-field" placeholder="e.g. WhatsApp + Zoom" />
            {err("current_lms")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={fieldId("website")} className="v-label">Website</label>
            <input {...register("website")} {...a11y("website")} className="v-field" autoComplete="url" placeholder="yourinstitute.in" />
            {err("website")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={fieldId("message")} className="v-label">Message</label>
            <textarea {...register("message")} {...a11y("message")} rows={3} className="v-field resize-y" placeholder="Tell us about your batches, tests or what you'd like to see in the demo." />
            {err("message")}
          </div>
        </div>
      </div>

      {TURNSTILE_SITE_KEY ? <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="auto" /> : null}

      <div>
        <label className="flex items-start gap-3 text-[13.5px] leading-snug text-fg-muted">
          <input
            type="checkbox"
            {...register("consent")}
            {...a11y("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[rgb(var(--primary))]"
          />
          <span>
            I agree to be contacted by VILMS about my enquiry by phone, WhatsApp or email, and to the{" "}
            <a href="/privacy" target="_blank" className="link underline">privacy policy</a>.
          </span>
        </label>
        {err("consent")}
      </div>

      {status.kind === "error" ? (
        <div role="alert" className="rounded-xl border border-red/30 bg-red-tint px-4 py-3 text-[14px] text-red">
          {status.message}
        </div>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="cta cta-primary cta-lg w-full">
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            {interest === "free_trial" ? "Continue to my free trial" : "Book my VILMS demo"} <ArrowRight aria-hidden className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-center text-[12.5px] text-fg-faint">No spam. One person from our team will reach out.</p>
    </form>
  );
}

function SuccessState({ interest, onClose }: { interest: Interest; onClose?: () => void }) {
  const isTrial = interest === "free_trial";
  return (
    <div className="py-4 text-center" role="status" aria-live="polite">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-green-tint text-green">
        <CheckCircle2 aria-hidden className="h-8 w-8" />
      </div>
      <h3 className="font-display text-[30px] font-semibold leading-tight tracking-tight">You&apos;re on the list.</h3>
      <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-fg-muted">
        {isTrial
          ? "Thanks for your interest in VILMS. Your institute can be online in about a minute — continue below to start your free trial. Our team will also check in to help you set up."
          : "Thank you! Your VILMS demo request has been received. Our team will get in touch with you shortly to set up a 30-minute walkthrough."}
      </p>

      <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
        {isTrial ? (
          <a href={TRIAL_URL} className="cta cta-primary" target="_blank" rel="noopener">
            <Rocket aria-hidden className="h-4 w-4" /> Start your 14-day free trial
          </a>
        ) : DEMO_BOOKING_URL ? (
          <a href={DEMO_BOOKING_URL} className="cta cta-primary" target="_blank" rel="noopener">
            <CalendarCheck aria-hidden className="h-4 w-4" /> Pick a demo time now
          </a>
        ) : (
          <a href={TRIAL_URL} className="cta cta-ghost" target="_blank" rel="noopener">
            <Rocket aria-hidden className="h-4 w-4" /> Start your 14-day free trial
          </a>
        )}
        {onClose ? (
          <button type="button" className="cta cta-ink" onClick={onClose}>
            Back to VILMS
          </button>
        ) : (
          <Link href="/" className="cta cta-ink">Back to VILMS</Link>
        )}
      </div>
    </div>
  );
}

import { FileClock, Mail } from "lucide-react";
import { brand } from "@/lib/content";

/** The "Full text to be published" notice shown on the terms and refund pages. */
export function PlaceholderNotice({ what }: { what: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-gold/60 bg-sunken p-6 sm:p-9">
      <div aria-hidden className="absolute inset-y-0 left-0 w-[5px] bg-gold" />
      <p className="flex items-center gap-2.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-gold-text">
        <FileClock aria-hidden className="h-4 w-4" />
        Full text to be published
      </p>
      <p className="mt-4 max-w-[640px] text-balance font-display text-[clamp(24px,3vw,36px)] font-medium leading-[1.1] tracking-[-0.035em]">The complete {what} is being finalised.</p>
      <p className="mt-4 max-w-[620px] text-[16.5px] leading-relaxed text-fg-muted">
        Until it is published here, nothing on this page should be read as the final text. The facts listed below are already true and stated elsewhere on this website, and we are happy to answer questions in the meantime.
      </p>
    </div>
  );
}

/** Facts that are already true elsewhere on the site, as a ledger. */
export function KnownFacts({ items }: { items: { label: string; text: string }[] }) {
  return (
    <dl className="divide-y divide-edge border-y border-edge">
      {items.map((f) => (
        <div key={f.label} className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[210px_minmax(0,1fr)]">
          <dt className="font-display text-[18px] font-medium tracking-[-0.02em] text-fg">{f.label}</dt>
          <dd className="text-[16px] leading-relaxed text-fg-muted">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Contact emails: general and billing. */
export function ContactPanel({ lead }: { lead: string }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[24px] border border-edge bg-edge sm:grid-cols-2">
      {[
        { label: "General and support", email: brand.emails.general },
        { label: "Billing", email: brand.emails.billing },
      ].map((c) => (
        <a key={c.email} href={`mailto:${c.email}`} className="group flex items-center gap-4 bg-panel p-6 transition-colors hover:bg-sunken">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-tint text-primary transition-colors group-hover:bg-navy group-hover:text-canvas">
            <Mail aria-hidden className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">{c.label}</span>
            <span className="mt-0.5 block truncate text-[17px] font-medium text-fg group-hover:text-primary">{c.email}</span>
          </span>
        </a>
      ))}
      <p className="bg-panel px-6 pb-6 pt-1 text-[14.5px] text-fg-muted sm:col-span-2">{lead}</p>
    </div>
  );
}

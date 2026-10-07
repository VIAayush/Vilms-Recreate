import { Check } from "lucide-react";
import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { PlanSelectionProvider } from "@/components/pages/business/pricing/PlanSelection";
import { PlanPicker } from "@/components/pages/business/pricing/PlanPicker";
import { CompareTable } from "@/components/pages/business/pricing/CompareTable";
import { BILLING_STEPS, OWN_ACCOUNTS } from "@/components/pages/business/data";
import { PLANS } from "@/components/pages/business/plans";
import { pricing } from "@/lib/content";
import { faqGroup } from "@/lib/site/faq";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";

export const metadata = pageMetadata("pricing");

// Pricing questions come from the shared FAQ data, so this page and /faq agree.
const PRICING_FAQ = [...faqGroup("pricing").items, ...faqGroup("trial").items.slice(1, 3)];
const EVERY_PLAN = pricing.compare.filter((r) => r.values.every((v) => v === true)).map((r) => r.label);

export default function PricingPage() {
  return (
    <PlanSelectionProvider>
      <JsonLd
        data={softwareLd({
          description: "VILMS is an all-in-one learning platform for coaching institutes: courses, live classes, AI-assisted answer evaluation, payments and a lead CRM under your own brand, with 0% revenue share.",
          offers: PLANS.map((p) => ({ name: `VILMS ${p.name}`, price: p.price, description: `${p.students}. Per month, excluding 18% GST. 0% revenue share. 14-day free trial.` })),
        })}
      />
      <JsonLd data={faqLd(PRICING_FAQ)} />

      <PageHero
        page="pricing"
        layout="stack"
        kicker="Pricing"
        title={
          <>
            Priced per plan. <span className="serif-accent text-fg-muted">Never per sale.</span>
          </>
        }
        lead="Four monthly plans, chosen by how many students you teach. 0% revenue share on every one, and a 14-day free trial with no card."
        ctas="none"
        micro={[...pricing.notes]}
        visual={<PlanPicker />}
      />

      <Section
        id="included"
        tone="alt"
        kicker="On every plan"
        title="The whole platform, from the smallest plan up."
        lead="Bigger plans add students, branches, apps and support on top."
      >
        <ul className="grid gap-x-12 border-t border-edge md:grid-cols-2">
          {EVERY_PLAN.map((label, i) => (
            <Reveal key={label} as="li" delay={(i % 2) * 60} className="flex items-center gap-4 border-b border-edge py-5 text-[18px] font-medium tracking-[-0.01em] sm:text-[20px]">
              <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green-tint text-green">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              {label}
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="compare" kicker="Compare plans" title="Every feature, plan by plan." lead="Slide the student count above and the plan that fits lights up here. Hover a column to read down it.">
        <CompareTable />
      </Section>

      <Section id="billing" tone="alt" kicker="How billing works" title="No surprises on the invoice.">
        <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {BILLING_STEPS.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 70} className="border-t-2 border-navy pt-5">
              <span className="font-mono text-[12px] tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 grid items-start gap-6 border-t border-edge pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <h3 className="font-display text-[24px] font-medium tracking-[-0.025em]">Your own accounts, at cost.</h3>
            <p className="mt-2 max-w-[400px] text-[15px] leading-relaxed text-fg-muted">
              Payments, WhatsApp, AI, email and video run on accounts you bring. VILMS connects to them with no markup, so what you pay them is exactly what they charge.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {OWN_ACCOUNTS.map((a) => (
              <li key={a} className="rounded-full border border-edge-strong bg-panel px-4 py-2 text-[14px] font-medium transition-colors hover:border-primary hover:text-primary">
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="faq" kicker="Pricing questions" title="The small print, in plain words.">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <Reveal>
            <p className="sub max-w-[380px]">All prices exclude 18% GST. Anything not answered here is in the full FAQ, or one email away.</p>
          </Reveal>
          <FaqAccordion items={PRICING_FAQ} />
        </div>
      </Section>

      <RelatedPages keys={["why", "demo", "faq", "whiteLabel"]} tone="alt" title="Before you choose" />
      <CtaBand />
    </PlanSelectionProvider>
  );
}

import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/site-ui/Section";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";
import { CrmHero } from "@/components/pages/products-b/crm/CrmHero";
import { Chain } from "@/components/pages/products-b/crm/Chain";
import { LeadStory } from "@/components/pages/products-b/crm/LeadStage";
import { Attribution } from "@/components/pages/products-b/crm/Attribution";
import { PipelineSim } from "@/components/pages/products-b/crm/PipelineSim";
import { RolesDemo, WhatsAppDemo } from "@/components/pages/products-b/crm/TeamTools";
import {
  CRM_FAQ,
  CRM_FEATURES,
  CRM_H1,
  CRM_HELPS,
  CRM_HELPS_INTRO,
  CRM_LEAD,
  CRM_WHAT,
  CRM_WHO,
  CRM_WHY,
  CRM_WHY_INTRO,
  CRM_WHY_VILMS,
} from "@/components/pages/products-b/crm/data";

export const metadata = pageMetadata("leadCrm");

const Ticks = ({ items }: { items: string[] }) => (
  <ul className="grid gap-x-10 sm:grid-cols-2">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-3 border-b border-edge py-3.5 text-[16px]">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-tint text-green">
          <Check aria-hidden className="h-3 w-3" />
        </span>
        {t}
      </li>
    ))}
  </ul>
);

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "VILMS Lead CRM", description: "Lead management software for coaching institutes: capture, organize, track and follow up student enquiries through to admission." })} />
      <JsonLd data={faqLd(CRM_FAQ)} />

      <PageHero page="leadCrm" kicker="Lead CRM" title={CRM_H1} lead={CRM_LEAD} visual={<CrmHero />} />

      <Section id="what-is" kicker="What is lead management software?">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">What Is Lead Management Software?</h2>
          </Reveal>
          <Reveal delay={80} className="space-y-5 text-[18px] leading-relaxed text-fg-muted">
            {CRM_WHAT.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section id="chain" tone="alt" kicker="The whole chain" title="From the first ad click to a paid seat" lead="Hover or tap any step. Nothing on this chain is re-typed: the lead you capture is the lead you call, follow up and enrol.">
        <Chain />
      </Section>

      <Section id="why-needed" kicker="Why lead management?" title="Why Do Coaching Institutes Need Lead Management?" lead={CRM_WHY_INTRO}>
        <p className="mb-4 text-[15px] font-medium">With VILMS, you can:</p>
        <Ticks items={CRM_WHY} />
      </Section>

      <Section tone="alt" id="follow-a-lead" kicker="Follow one lead" title="Scroll, and watch a lead cross the pipeline" lead="One lead, seven moments. The card, the counters and the revenue all move as you scroll.">
        <LeadStory />
      </Section>

      <Section id="features" kicker="Key features of VILMS" title="Key Features of VILMS">
        <ol className="divide-y divide-edge border-y border-edge">
          {CRM_FEATURES.map((f, i) => (
            <li key={f.t} className="group grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.1fr)] sm:py-7">
              <span className="font-mono text-[12px] text-fg-faint transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[clamp(22px,2.5vw,30px)] font-medium tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{f.t}</h3>
              <p className="text-[15.5px] leading-relaxed text-fg-muted">{f.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="alt"
        id="attribution"
        kicker="Landing pages and sources"
        title="Know which ad filled the seat"
        lead="Course pages are built for paid traffic. Free PDFs and webinars grow your list. Every lead keeps the source and campaign it arrived with, and you can export the lot to CSV."
      >
        <Attribution />
      </Section>

      <Section id="try-it" kicker="Your turn" title="Move a lead. Watch the revenue." lead="Press the arrow on any card to advance it. Add a new lead, or reset and start again.">
        <PipelineSim />
      </Section>

      <Section id="follow-up" tone="alt" kicker="Follow-up and team">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">WhatsApp, from your own number.</h2>
            <p className="sub mt-5 max-w-[440px]">Connect your own Wati account and follow up where students already are. Messages are logged on the lead, so the next person sees what was said.</p>
          </Reveal>
          <Reveal delay={80} className="mx-auto w-full min-w-0 max-w-[520px] lg:mx-0 lg:max-w-none">
            <WhatsAppDemo />
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal delay={80} className="order-2 min-w-0 lg:order-1">
            <RolesDemo />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <h2 className="text-balance font-display text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.05] tracking-[-0.035em]">Your counsellors see leads, not your accounts.</h2>
            <p className="sub mt-5 max-w-[440px]">A Sales or Counsellor login sees leads, the roster and payments only.</p>
          </Reveal>
        </div>
      </Section>

      <Section id="who" kicker="Who can use VILMS?" title="Who Can Use VILMS?" lead="VILMS can support different education and training organizations:">
        <ul className="divide-y divide-edge border-y border-edge">
          {CRM_WHO.map((w) => (
            <li key={w.t} className="group grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] sm:py-7">
              <h3 className="font-display text-[clamp(22px,2.5vw,32px)] font-medium tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{w.t}</h3>
              <p className="text-[15.5px] leading-relaxed text-fg-muted">{w.d}</p>
              <ArrowUpRight aria-hidden className="hidden h-5 w-5 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="admission-team" tone="navy" kicker="Your admission team" title="How VILMS Helps Your Admission Team" lead={CRM_HELPS_INTRO}>
        <p className="mb-4 text-[15px] font-medium">VILMS helps your team:</p>
        <Ticks items={CRM_HELPS} />
        <div className="mt-10 max-w-[760px] space-y-4 text-[17px] leading-relaxed text-fg-muted">
          {CRM_WHY_VILMS.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="faq" kicker="Frequently asked questions" title="Frequently Asked Questions">
        <FaqAccordion items={CRM_FAQ} />
      </Section>

      <RelatedPages keys={["lmsPlatform", "onlineCourses", "coaching", "pricing"]} tone="alt" />
      <CtaBand />
    </>
  );
}

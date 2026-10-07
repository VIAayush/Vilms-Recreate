import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { TrackView } from "@/components/site/TrackView";
import { pricing } from "@/lib/content";
import { JsonLd, faqLd, softwareLd } from "@/lib/site/seo";
import type { PageKey } from "@/lib/site/pages";
import { CapabilityExplorer } from "./CapabilityExplorer";
import { Choose, TipsList, WhatIs, WhoList, WhyNeeded } from "./DocSections";
import { Showcase } from "./Showcase";
import { WorkflowDiagram } from "./WorkflowDiagram";
import type { SolutionData } from "./types";

const SOLUTIONS: PageKey[] = ["coaching", "testPrep", "onlineCoaching", "training", "schoolsColleges"];

/**
 * One template for the five solution pages. The words come from the project
 * owner's content document; each page brings its own hero composition,
 * feature visuals, diagram shape and product views. The anatomy is shared:
 *
 *   hero → what it is → why it is needed → key features (explorer) →
 *   how VILMS helps (diagram) → who can use it → how to choose (optional) →
 *   product views → why choose VILMS → FAQ → related → other institutes → CTA
 */
export function SolutionTemplate({ data: d }: { data: SolutionData }) {
  const others = SOLUTIONS.filter((k) => k !== d.key);

  return (
    <>
      <JsonLd
        data={[
          softwareLd({
            description: d.schemaDescription,
            offers: pricing.plans.map((p) => ({ name: p.name, price: p.price, description: `${p.students}. Price per month, excluding GST.` })),
          }),
          faqLd(d.faq.items),
        ]}
      />

      <PageHero page={d.key} kicker={d.kicker} title={d.title} lead={d.lead} visual={d.hero} micro={[]} />

      <Section id="what" kicker="Overview" title={d.what.title} className="pt-8 sm:pt-12">
        <WhatIs what={d.what} />
      </Section>

      <Section id="why" tone="alt" kicker="Why it matters" title={d.why.title}>
        <WhyNeeded why={d.why} />
      </Section>

      <Section id="features" kicker="Key features" title={d.features.title} lead={d.features.lead}>
        <TrackView name="feature_view" label={d.key} />
        <CapabilityExplorer items={d.features.items} variant={d.features.variant} flip={d.features.flip} />
      </Section>

      <Section id="how" tone="navy" kicker={d.how.kicker} title={d.how.title} lead={d.how.lead}>
        <WorkflowDiagram steps={d.how.steps} variant={d.how.variant} />
      </Section>

      <Section id="who" kicker="Who it is for" title={d.who.title} lead={d.who.lead}>
        <WhoList who={d.who} />
      </Section>

      {d.tips ? (
        <Section id="choose-right" tone="alt" kicker="Choosing well" title={d.tips.title} lead={d.tips.lead}>
          <TipsList tips={d.tips} />
        </Section>
      ) : null}

      <Section id="inside" tone={d.tips ? "plain" : "alt"} kicker={d.showcase.kicker} title={d.showcase.title} lead={d.showcase.lead}>
        <Showcase admin={d.showcase.admin} student={d.showcase.student} />
      </Section>

      <Section id="why-vilms" tone={d.tips ? "alt" : "plain"} kicker="Why VILMS" title={d.choose.title}>
        <Choose choose={d.choose} />
      </Section>

      <Section id="faq" tone={d.tips ? "plain" : "alt"}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">{d.faq.kicker}</p>
            <h2 className="mt-4 text-balance font-display text-[clamp(30px,4vw,50px)] font-medium leading-[1.05] tracking-[-0.035em]">{d.faq.title}</h2>
          </Reveal>
          <FaqAccordion items={d.faq.items} />
        </div>
      </Section>

      <RelatedPages keys={d.related} tone={d.tips ? "alt" : "plain"} kicker="Go deeper" title="The parts of VILMS behind this" />
      <RelatedPages keys={others} tone={d.tips ? "plain" : "alt"} kicker="Other institutes" title="Running a different kind of institute?" />
      <CtaBand title={d.cta.title} lead={d.cta.lead} />
    </>
  );
}

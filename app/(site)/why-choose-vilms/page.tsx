import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { CutCalculator } from "@/components/pages/business/why/CutCalculator";
import { ReasonsExplorer } from "@/components/pages/business/why/ReasonsExplorer";
import { ApproachTable } from "@/components/pages/business/why/ApproachTable";
import { WHY_FAQ } from "@/components/pages/business/data";
import { JsonLd, faqLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("why");

export default function WhyPage() {
  return (
    <>
      <JsonLd data={faqLd(WHY_FAQ)} />
      <PageHero
        page="why"
        kicker="Why choose VILMS"
        title={
          <>
            The cut <span className="serif-accent text-fg-muted">is the cost.</span>
          </>
        }
        lead="Most course platforms bill a monthly fee and take a percentage of every enrolment. VILMS is a flat monthly plan, and your students' fees go to your own account. Set your own numbers and see the difference."
        visual={<CutCalculator />}
      />

      <Section
        id="reasons"
        tone="alt"
        kicker="Eight reasons"
        title="What you get besides keeping your fees."
        lead="Pick a reason and see it. Each follows from how the platform is built, for coaching institutes, educational institutions and businesses that train their teams."
      >
        <ReasonsExplorer />
      </Section>

      <Section
        id="compare"
        kicker="Three approaches"
        title="Platform, patchwork, or one platform."
        lead="The three ways institutes run online today, described in general terms: no product is named, because features differ between products."
      >
        <ApproachTable />
        <Reveal>
          <p className="mt-6 max-w-[720px] text-[13px] leading-relaxed text-fg-faint">
            Where a cell says &ldquo;varies&rdquo; or &ldquo;depends&rdquo;, it genuinely does. Check any vendor you are considering against these rows, including VILMS.
          </p>
        </Reveal>
      </Section>

      <Section id="faq" tone="alt" kicker="Fair questions" title="Before you decide.">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <Reveal>
            <p className="sub max-w-[380px]">
              The honest version of the pitch: where a flat plan wins, where it does not, and what stays yours either way.
            </p>
          </Reveal>
          <FaqAccordion items={WHY_FAQ} />
        </div>
      </Section>

      <RelatedPages keys={["pricing", "whiteLabel", "comparison", "demo"]} title="See the numbers, then the product" />
      <CtaBand />
    </>
  );
}

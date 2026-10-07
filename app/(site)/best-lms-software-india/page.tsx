import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Reveal } from "@/components/site-ui/Reveal";
import { BEST_FAQ, VERIFY_STEPS } from "@/components/pages/resources/criteria-data";
import { CriteriaList } from "@/components/pages/resources/CriteriaList";
import { CriteriaScorer } from "@/components/pages/resources/CriteriaScorer";
import { GuideFrame } from "@/components/pages/resources/GuideFrame";
import { GuideSection } from "@/components/pages/resources/GuideSection";
import { ScorerHero } from "@/components/pages/resources/ScorerHero";
import { Toc } from "@/components/pages/resources/Toc";
import { articleLd, faqLd, JsonLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("bestLms");

const TOC = [
  { id: "meaning", label: "What “best” means" },
  { id: "criteria", label: "Eight criteria" },
  { id: "scorer", label: "Weigh them yourself" },
  { id: "verify", label: "Check any claim" },
  { id: "faq", label: "FAQ" },
];

export default function BestLmsPage() {
  return (
    <>
      <JsonLd data={[articleLd("bestLms"), faqLd(BEST_FAQ)]} />
      <PageHero
        page="bestLms"
        kicker="Best LMS software in India"
        title={
          <>
            What makes the best LMS for an <span className="text-primary">Indian coaching institute</span>
          </>
        }
        lead="No league table. Eight criteria that decide the fit, a scorer where you set the weights, and a plain statement of what VILMS covers and what it only partly does."
        ctas="none"
        micro={["No vendor is ranked", "Gaps are stated, not hidden"]}
        visual={<ScorerHero />}
      />

      <GuideFrame>
        <div className="wrap pb-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-16 lg:pb-24">
          <Toc items={TOC} title="In this guide" />
          <div className="min-w-0 pt-10 lg:pt-4">
            <GuideSection id="meaning" kicker="Start here" title="“Best” depends on what your institute sells">
              <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14">
                <Reveal className="text-[17px] leading-[1.75] text-fg/85">
                  <p>
                    A test-prep centre grading handwritten answers needs a different platform from an online academy selling recorded courses. So this page does not crown a winner. It lists what an Indian coaching institute should check, and lets you decide how much each thing matters.
                  </p>
                  <p className="mt-4">VILMS is built for coaching institutes and also suits training institutes, educational institutions and businesses running employee training. The criteria are the same ones we would use ourselves. Where VILMS covers one fully we say so; where it covers one only in part, we say that too.</p>
                </Reveal>
                <Reveal delay={80}>
                  <ol className="divide-y divide-edge border-y border-edge">
                    {["Read the eight criteria and the questions to ask.", "Set your own weights in the scorer.", "Use the buying guide checklist to score any vendor."].map((t, i) => (
                      <li key={t} className="flex items-baseline gap-4 py-4 text-[15.5px]">
                        <span className="font-mono text-[12px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </GuideSection>

            <GuideSection id="criteria" kicker="The criteria" title="Eight things that decide the fit">
              <CriteriaList />
            </GuideSection>

            <GuideSection id="scorer" kicker="Your weights" title="How much of what you need does VILMS cover?" lead="Tell us how much each criterion matters to your institute. The score is the share of that weight VILMS covers, counting partly covered criteria as half.">
              <CriteriaScorer />
            </GuideSection>

            <GuideSection id="verify" kicker="Trust, but check" title="How to check any vendor’s claims">
              <ol className="grid gap-px overflow-hidden rounded-[24px] border border-edge bg-edge md:grid-cols-3">
                {VERIFY_STEPS.map((s, i) => (
                  <li key={s.title} className="bg-panel">
                    <Reveal delay={i * 70} className="h-full p-6 sm:p-7">
                      <span className="font-mono text-[12px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 font-display text-[21px] font-medium leading-snug tracking-[-0.025em]">{s.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </GuideSection>

            <GuideSection id="faq" kicker="Questions" title="Best LMS in India: frequently asked">
              <FaqAccordion items={BEST_FAQ} defaultOpen={0} />
            </GuideSection>
          </div>
        </div>
      </GuideFrame>

      <RelatedPages keys={["buyingGuide", "comparison", "coaching", "pricing"]} tone="alt" />
      <CtaBand />
    </>
  );
}

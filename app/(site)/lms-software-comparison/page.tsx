import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Reveal } from "@/components/site-ui/Reveal";
import { Section } from "@/components/site-ui/Section";
import { TrackView } from "@/components/site/TrackView";
import { APPROACHES, COMPARISON_FAQ } from "@/components/pages/resources/comparison-data";
import { ComparisonTable } from "@/components/pages/resources/ComparisonTable";
import { CostCalculator } from "@/components/pages/resources/CostCalculator";
import { CostCurves } from "@/components/pages/resources/CostCurves";
import { GuideFrame } from "@/components/pages/resources/GuideFrame";
import { Toc } from "@/components/pages/resources/Toc";
import { articleLd, faqLd, JsonLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("comparison");

const TOC = [
  { id: "approaches", label: "Three approaches" },
  { id: "table", label: "Side by side" },
  { id: "calculator", label: "Cost calculator" },
  { id: "faq", label: "FAQ" },
];

const HONEST = [
  { title: "Small fee income.", text: "When fee income is low, a percentage can cost less than any flat plan. The calculator shows where the lines cross." },
  { title: "A quiet month still has a bill.", text: "A flat plan is fixed. If your intake is irregular, that predictability cuts both ways." },
  { title: "Live classes use your own video account.", text: "VILMS ties Zoom or Meet links to the course rather than running a video room of its own." },
];

export default function ComparisonPage() {
  return (
    <>
      <JsonLd data={[articleLd("comparison"), faqLd(COMPARISON_FAQ)]} />
      <PageHero
        page="comparison"
        layout="stack"
        kicker="LMS software comparison"
        title={
          <>
            Three ways to run an institute online. <span className="text-primary">One cost curve each.</span>
          </>
        }
        lead="A revenue-share course platform, a stack of separate tools, or a flat-fee white-label LMS. Compared side by side, then priced with your own numbers."
        ctas="none"
        micro={["No platform is named", "Fair to every approach"]}
        visual={<CostCurves />}
      />

      <GuideFrame>
        <Toc items={TOC} variant="bar" title="On this page" />

        <Section id="approaches" className="scroll-mt-40" kicker="The three approaches" title="Pick the shape of your bill and your stack">
          <ol className="divide-y divide-edge border-y border-edge">
            {APPROACHES.map((a, i) => (
              <li key={a.id}>
                <Reveal delay={i * 60} className={`group grid items-baseline gap-x-8 gap-y-3 px-0 py-8 transition-colors duration-300 hover:bg-sunken/60 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:px-5 sm:py-10 ${a.id === "flat" ? "bg-primary-tint/30" : ""}`}>
                  <span className="font-display text-[clamp(64px,8vw,104px)] font-medium leading-none tracking-[-0.06em] text-edge-strong transition-colors duration-300 group-hover:text-primary">{a.letter}</span>
                  <div className="max-w-[640px]">
                    <h3 className="font-display text-[clamp(24px,3vw,36px)] font-medium leading-[1.08] tracking-[-0.035em]">{a.name}</h3>
                    <p className="mt-3 text-[16.5px] leading-relaxed text-fg-muted">{a.line}</p>
                  </div>
                  {a.id === "flat" ? <span className="tag self-start border-primary/40 bg-primary-tint text-primary">VILMS is this kind</span> : <span />}
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="table" className="scroll-mt-40" tone="alt" kicker="Side by side" title="Where the three differ" lead="Hover a row to read it across. Filter by theme to focus on money, product or practicalities.">
          <ComparisonTable />
        </Section>

        <Section id="calculator" className="scroll-mt-40" kicker="Calculator" title="What does the percentage really cost you?" lead="Enter your annual fee income and the other platform’s cut. Pick the VILMS plan that fits your student count. It is plain arithmetic, in your browser.">
          <TrackView name="pricing_view" label="comparison_calculator" />
          <CostCalculator />

          <div className="mt-14 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
            <Reveal>
              <h3 className="font-display text-[clamp(22px,2.4vw,28px)] font-medium leading-tight tracking-[-0.03em]">When the flat plan is not the obvious choice</h3>
            </Reveal>
            <ul className="divide-y divide-edge border-y border-edge">
              {HONEST.map((h, i) => (
                <li key={h.title}>
                  <Reveal delay={i * 60} className="py-5">
                    <p className="text-[16.5px] leading-relaxed">
                      <span className="font-medium">{h.title} </span>
                      <span className="text-fg-muted">{h.text}</span>
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="faq" className="scroll-mt-40" tone="alt" kicker="Questions" title="LMS comparison: frequently asked">
          <FaqAccordion items={COMPARISON_FAQ} defaultOpen={0} className="max-w-[860px]" />
        </Section>
      </GuideFrame>

      <RelatedPages keys={["why", "pricing", "buyingGuide", "whiteLabel"]} />
      <CtaBand />
    </>
  );
}

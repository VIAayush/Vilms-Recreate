import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Reveal } from "@/components/site-ui/Reveal";
import { BuyingChecklist } from "@/components/pages/resources/BuyingChecklist";
import { BuyingHero } from "@/components/pages/resources/BuyingHero";
import { BUYING_FAQ, BY_TYPE, CHECK_GROUPS, DEMO_QUESTIONS, PRINCIPLES, RED_FLAGS, YELLOW_FLAGS } from "@/components/pages/resources/buying-data";
import { GuideFrame } from "@/components/pages/resources/GuideFrame";
import { GuideSection } from "@/components/pages/resources/GuideSection";
import { Toc } from "@/components/pages/resources/Toc";
import { articleLd, faqLd, JsonLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("buyingGuide");

const TOC = [
  { id: "principles", label: "Three rules first" },
  { id: "checklist", label: "Score the checklist" },
  { id: "by-type", label: "Tips by organisation" },
  { id: "flags", label: "Red and yellow flags" },
  { id: "demo", label: "Questions for the demo" },
  { id: "faq", label: "FAQ" },
];

const ITEM_COUNT = CHECK_GROUPS.reduce((t, g) => t + g.items.length, 0);

export default function BuyingGuidePage() {
  return (
    <>
      <JsonLd data={[articleLd("buyingGuide"), faqLd(BUYING_FAQ)]} />
      <PageHero
        page="buyingGuide"
        kicker="LMS buying guide"
        title={
          <>
            How to choose an LMS for a <span className="text-primary">coaching institute</span>
          </>
        }
        lead="Three rules, a checklist you can score and the questions that separate a good demo from the truth. Written to work on any vendor, including us, and for coaching institutes, training institutes, schools and colleges, and businesses alike."
        ctas="none"
        micro={[`${ITEM_COUNT} checks across ${CHECK_GROUPS.length} areas`, "Nothing you tick is stored or sent"]}
        visual={<BuyingHero />}
      />

      <GuideFrame>
        <div className="wrap pb-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-16 lg:pb-24">
          <Toc items={TOC} title="In this guide" />
          <div className="min-w-0 pt-10 lg:pt-4">
            <GuideSection id="principles" kicker="Before you compare" title="Three rules that save you a bad contract">
              <ol className="divide-y divide-edge border-y border-edge">
                {PRINCIPLES.map((p, i) => (
                  <li key={p.title}>
                    <Reveal delay={i * 70} className="grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[88px_minmax(0,1fr)] sm:py-9">
                      <span className="font-display text-[clamp(44px,6vw,72px)] font-medium leading-none tracking-[-0.05em] text-edge-strong">{String(i + 1).padStart(2, "0")}</span>
                      <div className="max-w-[620px]">
                        <h3 className="font-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.12] tracking-[-0.03em]">{p.title}</h3>
                        <p className="mt-3 text-[16.5px] leading-relaxed text-fg-muted">{p.text}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </GuideSection>

            <GuideSection
              id="checklist"
              kicker="The checklist"
              title="Score a vendor in five minutes"
              lead="Tick only what the vendor has shown you. Must-haves count double. Do it once per vendor and copy each result to compare them side by side."
            >
              <BuyingChecklist />
            </GuideSection>

            <GuideSection id="by-type" kicker="Your kind of organisation" title="What to look for, by type" lead="The checklist covers the money-and-marking basics. Beyond it, the right list depends on who you teach. The same logic applies to businesses running employee training.">
              <div className="divide-y divide-edge border-y border-edge">
                {BY_TYPE.map((t, i) => (
                  <Reveal key={t.type} delay={i * 60} className="grid gap-x-10 gap-y-4 py-8 md:grid-cols-[200px_minmax(0,1fr)]">
                    <h3 className="font-display text-[clamp(22px,2.4vw,28px)] font-medium leading-tight tracking-[-0.03em]">{t.type}</h3>
                    <div>
                      <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {t.items.map((it) => (
                          <li key={it} className="relative pl-5 text-[15.5px] leading-snug before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                            {it}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[14.5px] text-fg-muted">{t.close}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </GuideSection>

            <GuideSection id="flags" kicker="Know when to walk" title="Red flags, and yellow ones worth a question">
              <div className="grid gap-px overflow-hidden rounded-[24px] border border-edge bg-edge md:grid-cols-2">
                <Reveal className="bg-panel p-6 sm:p-8">
                  <p className="flex items-center gap-2.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-red">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-red" />
                    Red: walk away unless explained
                  </p>
                  <ul className="mt-5 space-y-4">
                    {RED_FLAGS.map((f) => (
                      <li key={f} className="border-l-2 border-red pl-4 text-[16px] leading-snug">
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={80} className="bg-panel p-6 sm:p-8">
                  <p className="flex items-center gap-2.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-gold-text">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
                    Yellow: ask why
                  </p>
                  <ul className="mt-5 space-y-4">
                    {YELLOW_FLAGS.map((f) => (
                      <li key={f} className="border-l-2 border-gold pl-4 text-[16px] leading-snug">
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </GuideSection>

            <GuideSection id="demo" kicker="On the call" title="Six things to ask for in the demo" lead="A demo is a performance. These requests turn it into a test. Under each is what a good answer sounds like.">
              <FaqAccordion items={DEMO_QUESTIONS} multiple defaultOpen={0} />
            </GuideSection>

            <GuideSection id="faq" kicker="Questions" title="Buying an LMS: frequently asked">
              <FaqAccordion items={BUYING_FAQ} defaultOpen={0} />
            </GuideSection>
          </div>
        </div>
      </GuideFrame>

      <RelatedPages keys={["bestLms", "comparison", "whiteLabel", "pricing"]} tone="alt" />
      <CtaBand />
    </>
  );
}

import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Reveal } from "@/components/site-ui/Reveal";
import { Section } from "@/components/site-ui/Section";
import { VS_FAQ } from "@/components/pages/resources/day-data";
import { DayAtInstitute } from "@/components/pages/resources/DayAtInstitute";
import { FlipHero } from "@/components/pages/resources/FlipHero";
import { GuideFrame } from "@/components/pages/resources/GuideFrame";
import { ModePicker } from "@/components/pages/resources/ModePicker";
import { Toc } from "@/components/pages/resources/Toc";
import { articleLd, faqLd, JsonLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("vsTraditional");

const TOC = [
  { id: "day", label: "A day at the institute" },
  { id: "stays", label: "What stays the same" },
  { id: "mode", label: "Where you sit" },
  { id: "faq", label: "FAQ" },
];

const STAYS = [
  { title: "Your faculty stay your faculty.", text: "Batches, syllabus and the pace of a lesson remain yours." },
  { title: "Mentors still judge.", text: "AI drafts an evaluation; a mentor approves it before the student sees it." },
  { title: "Counsellors still call.", text: "The pipeline makes sure nobody is forgotten. It does not make the call." },
  { title: "The room still matters.", text: "Recordings and live links can extend a classroom. They do not have to replace it." },
];

export default function VsTraditionalPage() {
  return (
    <>
      <JsonLd data={[articleLd("vsTraditional"), faqLd(VS_FAQ)]} />
      <PageHero
        page="vsTraditional"
        kicker="LMS vs traditional classroom teaching"
        title={
          <>
            The same day at your institute, <span className="text-primary">run two ways</span>
          </>
        }
        lead="Admissions, classes, tests, evaluation, fees and follow-up, once the traditional way and once with an LMS. The classroom stays. The paperwork around it changes."
        ctas="none"
        micro={["Fair to the classroom", "Hybrid is a real mode"]}
        visual={<FlipHero />}
      />

      <GuideFrame>
        <Toc items={TOC} variant="bar" title="On this page" />

        <Section id="day" className="scroll-mt-40" kicker="Flip it yourself" title="Six stages, two ways to run each" lead="Pick a stage, then switch sides. Each stage also says what the traditional way does well, because it does some things very well.">
          <DayAtInstitute />
        </Section>

        <Section id="stays" className="scroll-mt-40" tone="navy">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="kicker">A fair comparison</p>
              <h2 className="mt-5 text-balance font-display text-[clamp(38px,5.4vw,72px)] font-medium leading-[0.98] tracking-[-0.045em]">Teaching is still teaching.</h2>
              <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-fg-muted">An LMS is not a replacement for a good teacher or a good room. It is the administration and the record-keeping around them.</p>
            </Reveal>
            <ul className="divide-y divide-edge border-y border-edge self-center">
              {STAYS.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 70} className="py-6">
                    <h3 className="font-display text-[clamp(21px,2.2vw,27px)] font-medium tracking-[-0.03em]">{s.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-fg-muted">{s.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="mode" className="scroll-mt-40" kicker="Hybrid is a real mode" title="Where does your institute sit?" lead="There is no single right setup. Pick the one closest to yours and see what an LMS does for it.">
          <ModePicker />
        </Section>

        <Section id="faq" className="scroll-mt-40" tone="alt" kicker="Questions" title="LMS vs classroom teaching: frequently asked">
          <FaqAccordion items={VS_FAQ} defaultOpen={0} className="max-w-[860px]" />
        </Section>
      </GuideFrame>

      <RelatedPages keys={["coaching", "onlineCoaching", "lmsPlatform", "pricing"]} />
      <CtaBand />
    </>
  );
}

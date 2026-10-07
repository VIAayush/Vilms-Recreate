import { ArrowUpRight, ClipboardPenLine, FileStack, NotebookPen, ScrollText } from "lucide-react";
import { PageHero } from "@/components/site-ui/PageHero";
import { Section } from "@/components/site-ui/Section";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { JsonLd, faqLd, pageMetadata, softwareLd } from "@/lib/site/seo";
import { AiHero } from "@/components/pages/products-b/ai/AiHero";
import { EvalStory } from "@/components/pages/products-b/ai/EvalStory";
import { SignOff } from "@/components/pages/products-b/ai/SignOff";
import { Capabilities } from "@/components/pages/products-b/ai/Capabilities";
import { AiTerms } from "@/components/pages/products-b/ai/AiTerms";
import { AI_FAQ } from "@/components/pages/products-b/ai/data";

export const metadata = pageMetadata("aiEvaluation");

const TERMS = [
  { t: "Your own AI key", d: "Connect Anthropic or OpenAI and pay them directly, at cost. VILMS adds no markup." },
  { t: "An allowance, by plan", d: "AI evaluations are a yearly allowance that depends on your plan. Usage meters warn you at 80% and 100%." },
  { t: "Never used for training", d: "Your students' data is not used to train AI models." },
];

const USES = [
  { Icon: NotebookPen, t: "Answer-writing practice", d: "Long answers written by hand, every week" },
  { Icon: ClipboardPenLine, t: "Descriptive tests", d: "Rubric-marked, with comments on the page" },
  { Icon: FileStack, t: "Mock tests with long answers", d: "MCQs mark themselves, the rest go to a mentor" },
  { Icon: ScrollText, t: "Assignments and worksheets", d: "Anything a student writes and a mentor reads" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "VILMS AI Answer Evaluation", description: "AI drafts evaluations of handwritten answers against your rubric. A mentor reviews and approves every one before the student sees it." })} />
      <JsonLd data={faqLd(AI_FAQ)} />

      <PageHero
        page="aiEvaluation"
        kicker="AI answer evaluation"
        title={<>AI does the first read. Your mentor has the last word.</>}
        lead="Handwritten answers pile up, and every copy starts from a blank page. Here the AI drafts marks and comments against your rubric, and nothing reaches a student until a mentor approves it."
        visual={<AiHero />}
      />

      <Section
        tone="navy"
        id="how-it-works"
        kicker="How it works"
        title="From a photo of handwriting to an evaluated copy"
        lead="Scroll. Each step below is a step in the product: what the student does, what the AI does, and where the mentor takes over."
      >
        <EvalStory />
      </Section>

      <Section
        id="you-decide"
        kicker="You decide"
        title={<>The AI never signs. A person does.</>}
        lead="Flip between the two. In VILMS an AI draft stays a draft until a mentor approves it, and until then the student sees nothing."
      >
        <SignOff />
      </Section>

      <Section tone="alt" id="inside" kicker="Inside the evaluation" title="Rubrics, MCQs, copies and grades, in one place" lead="Pick one. Some of these you can change right here.">
        <Capabilities />
      </Section>

      <Section id="ai-terms" kicker="AI on your terms">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(32px,4.4vw,56px)] font-medium leading-[1.04] tracking-[-0.035em]">Your key. Your limit. Your students&apos; data.</h2>
            <ul className="mt-9 divide-y divide-edge border-y border-edge">
              {TERMS.map((x) => (
                <li key={x.t} className="py-5">
                  <h3 className="text-[18px] font-medium tracking-[-0.01em]">{x.t}</h3>
                  <p className="mt-1.5 max-w-[460px] text-[15px] leading-relaxed text-fg-muted">{x.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="min-w-0">
            <AiTerms />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" id="where" kicker="Where mentors use it" title="Anything a student writes and a mentor has to read">
        <ul className="divide-y divide-edge border-y border-edge">
          {USES.map(({ Icon, t, d }) => (
            <li key={t}>
              <div className="group grid items-center gap-x-8 gap-y-1 py-6 transition-colors sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.8fr)_auto] sm:py-7">
                <span className="hidden h-11 w-11 place-items-center rounded-xl bg-primary-tint text-primary transition-colors group-hover:bg-navy group-hover:text-white  sm:grid">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="font-display text-[clamp(22px,2.6vw,32px)] font-medium tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1">{t}</h3>
                <p className="text-[15px] text-fg-muted">{d}</p>
                <ArrowUpRight aria-hidden className="hidden h-5 w-5 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" kicker="Questions" title="Answer evaluation, answered">
        <FaqAccordion items={AI_FAQ} />
      </Section>

      <RelatedPages keys={["onlineExams", "testPrep", "lmsPlatform", "pricing"]} tone="alt" />
      <CtaBand />
    </>
  );
}

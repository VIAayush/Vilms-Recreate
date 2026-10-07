import Link from "next/link";
import { FaqAccordion } from "@/components/site-ui/FaqAccordion";
import { Reveal } from "@/components/site-ui/Reveal";
import { FEATURED_FAQ } from "@/lib/site/faq";
import { PAGES } from "@/lib/site/pages";
import { JsonLd, faqLd } from "@/lib/site/seo";

// Six of the questions institute owners ask first; the rest live on /faq.
export function HomeFaq() {
  return (
    <section className="py-16 sm:py-24">
      <JsonLd data={faqLd(FEATURED_FAQ)} />
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <Reveal>
          <p className="kicker">Questions</p>
          <h2 className="mt-4 text-balance font-display text-[clamp(32px,4.4vw,56px)] font-medium leading-[1.04] tracking-[-0.035em]">Asked before every demo</h2>
          <Link href={PAGES.faq.path} className="link mt-6 inline-block text-[15px]">
            All questions →
          </Link>
        </Reveal>
        <Reveal delay={80}>
          <FaqAccordion items={FEATURED_FAQ} />
        </Reveal>
      </div>
    </section>
  );
}

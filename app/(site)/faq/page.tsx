import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/site-ui/PageHero";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { Reveal } from "@/components/site-ui/Reveal";
import { FaqExplorer } from "@/components/pages/business/faq/FaqExplorer";
import { TopicTiles } from "@/components/pages/business/faq/TopicTiles";
import { brand } from "@/lib/content";
import { ALL_FAQ, FAQ_GROUPS } from "@/lib/site/faq";
import { JsonLd, faqLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("faq");

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(ALL_FAQ)} />
      <PageHero
        page="faq"
        kicker="FAQ"
        title={
          <>
            Answers, <span className="serif-accent text-fg-muted">before you ask.</span>
          </>
        }
        lead={`${ALL_FAQ.length} answers in plain sentences, on the product, pricing, payments, AI evaluation and the rest. Search them, or jump to a topic.`}
        ctas="none"
        micro={[]}
        visual={<TopicTiles groups={FAQ_GROUPS} />}
      />

      <section id="answers" className="scroll-mt-20 pb-16 pt-6 sm:pb-24">
        <div className="wrap">
          <FaqExplorer groups={FAQ_GROUPS} />
        </div>
      </section>

      <section className="bg-canvas-alt py-14 sm:py-20">
        <div className="wrap">
          <Reveal className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <h2 className="text-balance font-display text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">Not on the list?</h2>
              <p className="sub mt-3 max-w-[520px]">Write to us and a person on the team will answer. Or see VILMS on your own setup in a 30-minute demo.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`mailto:${brand.emails.general}`} className="cta cta-primary cta-lg">
                <Mail aria-hidden className="h-4 w-4" /> {brand.emails.general}
              </a>
              <Link href="/book-a-demo" className="cta cta-ghost cta-lg">
                Book a Demo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedPages keys={["pricing", "why", "lmsPlatform", "contact"]} title="Keep reading" />
      <CtaBand />
    </>
  );
}

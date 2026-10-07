import { Breadcrumbs } from "@/components/site-ui/Breadcrumbs";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { BlogIndex } from "@/components/pages/resources/BlogIndex";
import { ARTICLES } from "@/lib/site/articles";
import { absoluteUrl, JsonLd, pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "VILMS Blog",
          url: absoluteUrl("/blog"),
          hasPart: ARTICLES.map((a) => ({ "@type": "Article", headline: a.title, url: absoluteUrl(a.href) })),
        }}
      />
      <header className="relative isolate overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="wrap">
          <Breadcrumbs page="blog" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-16">
            <div>
              <p className="kicker">VILMS Blog</p>
              <h1 className="mt-5 text-balance font-display text-[clamp(40px,6.4vw,92px)] font-medium leading-[0.98] tracking-[-0.045em]">
                LMS guides for the people who <span className="text-primary">run institutes</span>.
              </h1>
            </div>
            <p className="sub max-w-[420px] lg:pb-3">
              Plain-language pieces on choosing an LMS, grading handwritten answers and keeping courses, tests and payments in one place. No fluff, no made-up numbers.
            </p>
          </div>
        </div>
      </header>

      <section aria-label="Articles" className="pb-16 sm:pb-24">
        <div className="wrap">
          <BlogIndex />
        </div>
      </section>

      <RelatedPages keys={["lmsPlatform", "aiEvaluation", "coaching", "pricing"]} tone="alt" />
      <CtaBand />
    </>
  );
}

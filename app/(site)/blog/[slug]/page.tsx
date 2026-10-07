import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/site-ui/Breadcrumbs";
import { CtaBand } from "@/components/site-ui/CtaBand";
import { RelatedPages } from "@/components/site-ui/RelatedPages";
import { Section } from "@/components/site-ui/Section";
import { ArticleBody, tocOf } from "@/components/pages/resources/ArticleBody";
import { ArticleCard } from "@/components/pages/resources/ArticleCard";
import { GuideFrame } from "@/components/pages/resources/GuideFrame";
import { Toc } from "@/components/pages/resources/Toc";
import { articleBySlug, nextReads, REAL_ARTICLES } from "@/lib/site/articles";
import { articleLd, JsonLd, pageMetadata } from "@/lib/site/seo";
import type { PageKey } from "@/lib/site/pages";

// Only the two real articles exist here. The other three blog topics live on
// their own canonical pages (/best-lms-software-india, /lms-buying-guide,
// /lms-vs-traditional-teaching) so there is never a duplicate of them.
export const dynamicParams = false;

export function generateStaticParams() {
  return REAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  return article ? pageMetadata(article.pageKey) : {};
}

const RELATED: Record<string, PageKey[]> = {
  blogAiEvaluation: ["aiEvaluation", "onlineExams", "testPrep", "pricing"],
  blogOnePlatform: ["lmsPlatform", "coaching", "leadCrm", "pricing"],
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article?.body) notFound();

  const toc = tocOf(article.body);
  const more = nextReads(article.slug);

  return (
    <>
      <JsonLd data={articleLd(article.pageKey)} />
      <header className="relative isolate overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="wrap">
          <Breadcrumbs page={article.pageKey} />
          <div className="mt-8 max-w-[980px]">
            <p className="kicker">{article.category}</p>
            <h1 className="mt-5 text-balance font-display text-[clamp(36px,5.6vw,76px)] font-medium leading-[1] tracking-[-0.045em]">{article.title}</h1>
            <p className="sub mt-6 max-w-[680px]">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-edge pt-5">
              <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                <Clock aria-hidden className="h-3.5 w-3.5" />
                {article.readingMinutes} min read
              </span>
              <ul className="flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <GuideFrame>
        <div className="wrap pb-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-16 lg:pb-24">
          <Toc items={toc} title="In this article" />
          <article className="min-w-0 pt-10 lg:pt-4">
            <ArticleBody blocks={article.body} />
          </article>
        </div>
      </GuideFrame>

      <Section tone="alt" kicker="Keep reading" title="Two more to read next">
        <div className="grid gap-6 md:grid-cols-2">
          {more.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
      <RelatedPages keys={RELATED[article.pageKey] ?? ["lmsPlatform", "pricing"]} kicker="Explore VILMS" title="Where this fits in the product" />
      <CtaBand />
    </>
  );
}

import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Article } from "@/lib/site/articles";
import { ArticleCover } from "./ArticleCover";

/** A blog card: cover, category, title, excerpt, topic tags and reading time. No author, no date. */
export function ArticleCard({
  article,
  variant = "card",
  className,
}: {
  article: Article;
  variant?: "card" | "featured" | "row";
  className?: string;
}) {
  const feat = variant === "featured";
  return (
    <Link
      href={article.href}
      className={clsx(
        "group relative flex min-w-0 overflow-hidden border border-edge bg-panel transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_22px_48px_-26px_rgb(14_27_44/0.45)]",
        feat ? "flex-col rounded-[28px] lg:grid lg:grid-cols-[1.15fr_1fr]" : "flex-col rounded-[24px]",
        className,
      )}
    >
      <div className={clsx("overflow-hidden", feat ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" : "aspect-[16/8]")}>
        <ArticleCover kind={article.cover} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className={clsx("flex min-w-0 flex-1 flex-col", feat ? "p-6 sm:p-9 lg:p-11" : "p-5 sm:p-6")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg-faint">
          <span className="text-primary">{article.category}</span>
          <span aria-hidden className="h-px w-4 bg-edge-strong" />
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="h-3 w-3" />
            {article.readingMinutes} min read
          </span>
        </div>
        <h3
          className={clsx(
            "mt-4 text-balance font-display font-medium leading-[1.08] tracking-[-0.035em] text-fg",
            feat ? "text-[clamp(28px,3.4vw,44px)]" : "text-[clamp(21px,2vw,26px)]",
          )}
        >
          {article.title}
        </h3>
        <p className={clsx("mt-3 leading-relaxed text-fg-muted", feat ? "text-[16.5px]" : "text-[15px]")}>{article.excerpt}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {article.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-[15px] font-medium text-primary">
          {article.kind === "article" ? "Read the article" : "Read the guide"}
          <ArrowUpRight aria-hidden className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

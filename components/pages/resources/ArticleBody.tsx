import { EvalFlow } from "@/components/marketing/screens/EvalFlow";
import type { Block } from "@/lib/site/articles";
import { Callout, FactRow, Inline, LinkRows, PullQuote } from "./blocks";
import { Handoffs } from "./Handoffs";

/** Table-of-contents entries for an article: its h2 blocks. */
export const tocOf = (blocks: Block[]) => blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, label: b.text }] : []));

/**
 * Editorial body: a 720px measure, generous leading, hairline-ruled h2s with
 * a section number, and the richer blocks (callouts, pull-quotes, fact rows,
 * figures) breaking the column rhythm.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  let h2n = 0;
  return (
    <div className="max-w-[720px] text-[17.5px] leading-[1.8] text-fg/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            h2n += 1;
            return (
              <h2
                key={i}
                id={b.id}
                className="mt-16 scroll-mt-32 border-t border-edge pt-8 font-display text-[clamp(26px,3.2vw,36px)] font-medium leading-[1.1] tracking-[-0.035em] text-fg first:mt-0 first:border-t-0 first:pt-0"
              >
                <span className="mb-3 block font-mono text-[12px] font-medium tracking-[0.14em] text-primary">{String(h2n).padStart(2, "0")}</span>
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-9 font-display text-[22px] font-medium tracking-[-0.025em] text-fg">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={b.lead ? "mt-6 text-[clamp(19px,2vw,22px)] leading-[1.6] text-fg" : "mt-5"}>
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-6 space-y-3.5">
                {b.items.map((it) => (
                  <li key={it} className="relative pl-6 before:absolute before:left-0 before:top-[0.78em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-6 space-y-3.5 [counter-reset:step]">
                {b.items.map((it) => (
                  <li key={it} className="relative pl-11 [counter-increment:step] before:absolute before:left-0 before:top-[0.22em] before:grid before:h-7 before:w-7 before:place-items-center before:rounded-full before:border before:border-edge-strong before:font-mono before:text-[12px] before:text-navy before:content-[counter(step)]">
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return <Callout key={i} tone={b.tone} title={b.title} text={b.text} />;
          case "quote":
            return <PullQuote key={i} text={b.text} source={b.source} />;
          case "facts":
            return <FactRow key={i} items={b.items} />;
          case "figure":
            return (
              <figure key={i} className="my-12 xl:-mr-24">
                {b.kind === "evalFlow" ? (
                  <div className="rounded-[24px] border border-edge bg-canvas-alt p-3 sm:p-5">
                    <EvalFlow />
                  </div>
                ) : (
                  <Handoffs />
                )}
                <figcaption className="mt-3 text-[13px] text-fg-faint">{b.caption}</figcaption>
              </figure>
            );
          case "links":
            return <LinkRows key={i} title={b.title} keys={b.keys} />;
        }
      })}
    </div>
  );
}

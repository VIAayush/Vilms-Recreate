import { Reveal } from "@/components/site-ui/Reveal";

export type BenefitItem = { n: string; title: string; how?: string; tag?: string };

/**
 * Benefits as a hairline-divided list: big numerals, a title, how the product
 * makes it true, and a tag. Meant to sit in a `band-navy` or plain section.
 */
export function Benefits({ items }: { items: BenefitItem[] }) {
  return (
    <ol className="border-t border-edge-strong">
      {items.map((b, i) => (
        <Reveal as="li" key={b.n} delay={i * 40} className="group relative border-b border-edge-strong">
          <div className="grid items-baseline gap-x-8 gap-y-2 py-6 transition-colors duration-300 group-hover:bg-primary-tint/40 sm:grid-cols-[64px_minmax(0,1fr)] sm:px-3 sm:py-7">
            <span className="font-mono text-[13px] tabular-nums text-fg-faint transition-colors group-hover:text-primary">{b.n}</span>
            <div className="min-w-0">
              <h3 className="font-display text-[clamp(24px,2.6vw,34px)] font-medium leading-tight tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1">{b.title}</h3>
              {b.how ? <p className="mt-1.5 max-w-[560px] text-[15.5px] leading-relaxed text-fg-muted">{b.how}</p> : null}
            </div>
            {b.tag ? (
              <span className="mt-1 inline-flex w-fit items-center rounded-full border border-edge-strong px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-fg-muted transition-colors duration-300 group-hover:border-primary group-hover:text-primary sm:mt-0">
                {b.tag}
              </span>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

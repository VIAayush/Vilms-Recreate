import { Database, IndianRupee, Gauge, LockKeyhole, Palette, Percent, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";

const ICONS: Record<string, LucideIcon> = { percent: Percent, rupee: IndianRupee, brand: Palette, limits: Gauge, data: Database, ai: LockKeyhole };

export type Principle = { icon: keyof typeof ICONS; title: string; text: string };

/**
 * A numbered list ruled with hairlines. Hovering (or focusing) a row draws a
 * blue rule along its top edge and nudges the title; nothing is clickable, so
 * the interaction is only there to guide the eye down the list.
 */
export function Principles({ items }: { items: readonly Principle[] }) {
  return (
    <ol className="border-b border-edge">
      {items.map((p, i) => {
        const Icon = ICONS[p.icon];
        return (
          <Reveal key={p.title} as="li" delay={Math.min(i, 3) * 60} className="group relative border-t border-edge">
            <span aria-hidden className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <div className="grid gap-x-8 gap-y-3 py-7 sm:py-9 md:grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)] md:items-start lg:grid-cols-[88px_minmax(0,1fr)_minmax(0,1fr)]">
              <div className="flex items-center gap-4 md:block">
                <span className="font-mono text-[12.5px] tabular-nums text-fg-faint transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-tint text-primary md:mt-4">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
              </div>
              <h3 className="font-display text-[clamp(26px,3.2vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-1.5">{p.title}</h3>
              <p className="max-w-[460px] text-[16px] leading-relaxed text-fg-muted md:pt-1.5">{p.text}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

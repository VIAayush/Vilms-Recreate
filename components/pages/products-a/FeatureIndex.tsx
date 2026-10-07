import { Reveal } from "@/components/site-ui/Reveal";

/**
 * Everything a page covers, as an indexed two-column list: plain, scannable
 * text (good for people and for search), with a quiet hover.
 */
export function FeatureIndex({ items }: { items: { t: string; d?: string }[] }) {
  return (
    <ul className="grid gap-x-14 border-t border-edge-strong md:grid-cols-2">
      {items.map((it, i) => (
        <Reveal as="li" key={it.t} delay={(i % 2) * 40} className="group border-b border-edge">
          <div className="flex items-baseline gap-4 py-4 transition-colors duration-300 group-hover:bg-primary-tint/40 sm:px-2">
            <span className="font-mono text-[11.5px] tabular-nums text-fg-faint transition-colors group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
            <p className="min-w-0 text-[15px] leading-snug text-fg-muted">
              <b className="block text-[17px] font-medium text-fg transition-transform duration-300 group-hover:translate-x-1">{it.t}</b>
              {it.d}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

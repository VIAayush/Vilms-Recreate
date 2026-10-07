import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site-ui/Reveal";
import type { FaqGroup } from "@/lib/site/faq";

/**
 * The hero visual for the FAQ: every topic as a tile that deep-links to its
 * group (#payments). The FAQ explorer reads the hash and selects the chip.
 */
export function TopicTiles({ groups }: { groups: FaqGroup[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
      {groups.map((g, i) => (
        <Reveal key={g.id} as="li" delay={Math.min(i, 8) * 40}>
          <a
            href={`#${g.id}`}
            className="group flex h-full min-h-[104px] flex-col justify-between rounded-2xl border border-edge bg-panel p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-24px_rgb(14_27_44/0.4)] sm:min-h-[120px]"
          >
            <span className="flex items-start justify-between">
              <span className="font-mono text-[11px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
              <ArrowUpRight aria-hidden className="h-4 w-4 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </span>
            <span>
              <span className="block text-[17px] font-medium leading-tight tracking-[-0.015em]">{g.label}</span>
              <span className="mt-0.5 block text-[12.5px] text-fg-muted">
                {g.items.length} {g.items.length === 1 ? "answer" : "answers"}
              </span>
            </span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ICONS } from "@/components/site-ui/icons";
import { PAGES, type PageKey } from "@/lib/site/pages";

/**
 * "Who it's for": the solution pages as a strip of columns. On desktop the
 * hovered or focused column widens and fills with the brand tint; on phones
 * the strip is a ruled list. Every column is a real link.
 */
export function WhoStrip({ keys }: { keys: PageKey[] }) {
  return (
    <ul className="flex flex-col divide-y divide-edge border-y border-edge lg:flex-row lg:divide-x lg:divide-y-0">
      {keys.map((k, i) => {
        const p = PAGES[k];
        const Icon = ICONS[p.icon];
        return (
          <li key={k} className="min-w-0 transition-[flex-grow] duration-500 ease-out lg:flex-1 lg:hover:flex-[1.55] lg:has-[:focus-visible]:flex-[1.55]">
            <Link
              href={p.path}
              className="group flex h-full flex-col gap-6 px-1 py-6 transition-colors duration-300 hover:bg-primary-tint/60 sm:px-3 lg:min-h-[320px] lg:justify-between lg:px-6 lg:py-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[12px] tabular-nums text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-edge-strong text-fg-muted transition duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-ink">
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </div>
              <div>
                <Icon aria-hidden className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-display text-[clamp(22px,2vw,28px)] font-medium leading-tight tracking-[-0.025em]">{p.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">{p.blurb}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

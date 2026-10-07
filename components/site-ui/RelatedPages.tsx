import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PAGES, type PageKey } from "@/lib/site/pages";
import { ICONS } from "./icons";
import { Section } from "./Section";

/**
 * Internal links as a row of cards: the topic cluster that ties product,
 * solution, resource and pricing pages together. Pass 3–4 keys.
 */
export function RelatedPages({
  keys,
  title = "Keep exploring",
  kicker = "Related",
  tone = "plain",
}: {
  keys: PageKey[];
  title?: React.ReactNode;
  kicker?: string;
  tone?: "plain" | "alt";
}) {
  return (
    <Section kicker={kicker} title={title} tone={tone}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keys.map((k) => {
          const p = PAGES[k];
          const Icon = ICONS[p.icon];
          return (
            <li key={k}>
              <Link
                href={p.path}
                className="group flex h-full flex-col rounded-2xl border border-edge bg-panel p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-24px_rgb(14_27_44/0.4)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-tint text-primary transition-colors group-hover:bg-navy group-hover:text-white ">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="mt-4 flex items-center gap-1.5 text-[16.5px] font-medium">
                  {p.name}
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </span>
                <span className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{p.blurb}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

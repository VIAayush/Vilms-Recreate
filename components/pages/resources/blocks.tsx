import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Info, TriangleAlert, BadgeCheck } from "lucide-react";
import { PAGES, type PageKey } from "@/lib/site/pages";

/** Renders **bold** and [label](/path) inside a string. Internal links use next/link. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p);
        if (link) {
          return (
            <Link key={i} href={link[2]} className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary">
              {link[1]}
            </Link>
          );
        }
        const bold = /^\*\*([^*]+)\*\*$/.exec(p);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return p;
      })}
    </>
  );
}

const TONES = {
  note: { icon: Info, label: "Worth knowing", bar: "border-primary", tint: "bg-primary-tint/60", ink: "text-primary" },
  watch: { icon: TriangleAlert, label: "Watch for", bar: "border-gold", tint: "bg-sunken", ink: "text-gold-text" },
  fact: { icon: BadgeCheck, label: "Product fact", bar: "border-green", tint: "bg-green-tint/70", ink: "text-green" },
} as const;

export function Callout({ tone, title, text }: { tone: keyof typeof TONES; title: string; text: string }) {
  const t = TONES[tone];
  const Icon = t.icon;
  return (
    <aside className={clsx("my-9 rounded-r-2xl border-l-[3px] py-5 pl-5 pr-5 sm:pl-6", t.bar, t.tint)}>
      <p className={clsx("flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em]", t.ink)}>
        <Icon aria-hidden className="h-3.5 w-3.5" />
        {t.label}
      </p>
      <p className="mt-2 font-display text-[19px] font-medium leading-snug tracking-[-0.02em] text-fg">{title}</p>
      <p className="mt-1.5 text-[16px] leading-relaxed text-fg-muted">
        <Inline text={text} />
      </p>
    </aside>
  );
}

export function PullQuote({ text, source }: { text: string; source: string }) {
  return (
    <figure className="my-14 xl:-mx-12">
      <blockquote className="relative border-y border-edge-strong py-9 sm:py-11">
        <span aria-hidden className="absolute -top-[22px] left-0 bg-canvas pr-4 font-display text-[64px] leading-none text-primary sm:text-[76px]">
          “
        </span>
        <p className="text-balance font-display text-[clamp(24px,3.2vw,38px)] font-medium leading-[1.16] tracking-[-0.035em] text-fg">{text}</p>
        <figcaption className="mt-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg-faint">{source}</figcaption>
      </blockquote>
    </figure>
  );
}

export function FactRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="my-12 grid divide-y divide-edge border-y border-edge sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((it) => (
        <div key={it.value} className="px-0 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <dt className="font-display text-[clamp(26px,3vw,36px)] font-medium leading-none tracking-[-0.04em] text-navy">{it.value}</dt>
          <dd className="mt-3 text-[14.5px] leading-snug text-fg-muted">{it.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Hairline-divided internal links: the topic cluster inside an article. */
export function LinkRows({ title, keys }: { title: string; keys: PageKey[] }) {
  return (
    <nav aria-label={title} className="my-10 rounded-2xl border border-edge bg-panel p-2 sm:p-3">
      <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{title}</p>
      <ul>
        {keys.map((k) => (
          <li key={k}>
            <Link href={PAGES[k].path} className="group flex items-center justify-between gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-sunken">
              <span className="min-w-0">
                <span className="block text-[16.5px] font-medium text-fg">{PAGES[k].name}</span>
                <span className="mt-0.5 block text-[14px] leading-snug text-fg-muted">{PAGES[k].blurb}</span>
              </span>
              <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

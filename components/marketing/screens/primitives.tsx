import clsx from "clsx";

// Small, theme-aware pieces that the illustrated VILMS screens are made of.
// They render real text (readable, selectable, crisp at any size) rather than
// screenshots, so they follow light/dark mode and stay light on the network.

export function BrowserFrame({
  url,
  children,
  className,
  bodyClassName,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={clsx("window flex flex-col", className)}>
      <div className="flex items-center gap-3 border-b border-edge/10 px-3.5 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-edge/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-edge/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-edge/15" />
        </span>
        <span className="mx-auto flex min-w-0 max-w-[340px] flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-canvas/70 px-3 py-1 font-mono text-[10.5px] text-fg-muted">
          <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 opacity-60">
            <path d="M3 5V3.8a3 3 0 0 1 6 0V5M2.5 5h7v5.5h-7z" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <span className="truncate">{url}</span>
        </span>
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className={clsx("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}

const AVATAR_TONES = ["bg-primary/15 text-primary", "bg-cyan/15 text-cyan", "bg-accent/20 text-[rgb(170_90_0)] dark:text-accent", "bg-mint/15 text-mint", "bg-rose/15 text-rose", "bg-secondary/15 text-secondary"];

export function Avatar({ name, size = "md", tone }: { name: string; size?: "sm" | "md" | "lg"; tone?: number }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const t = tone ?? [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_TONES.length;
  return (
    <span
      aria-hidden
      className={clsx(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        AVATAR_TONES[t],
        size === "sm" && "h-6 w-6 text-[9.5px]",
        size === "md" && "h-8 w-8 text-[11px]",
        size === "lg" && "h-11 w-11 text-[14px]",
      )}
    >
      {initials}
    </span>
  );
}

type Tone = "primary" | "mint" | "accent" | "cyan" | "rose" | "muted";
const PILL: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  mint: "bg-mint/10 text-mint",
  accent: "bg-accent/20 text-[rgb(150_80_0)] dark:text-accent",
  cyan: "bg-cyan/10 text-cyan",
  rose: "bg-rose/10 text-rose",
  muted: "bg-edge/[0.07] text-fg-muted",
};

export function Pill({ tone = "muted", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold", PILL[tone], className)}>
      {children}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={clsx("relative inline-flex h-2 w-2", className)}>
      <span className="absolute inset-0 animate-ping rounded-full bg-rose/60" />
      <span className="relative h-2 w-2 rounded-full bg-rose" />
    </span>
  );
}

/** A labelled score bar, e.g. a rubric criterion. */
export function Meter({ label, value, max, tone = "primary" }: { label: string; value: number; max: number; tone?: "primary" | "mint" | "accent" }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-[64px] shrink-0 text-fg-muted">{label}</span>
      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-edge/10">
        <span
          className={clsx(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out",
            tone === "primary" && "bg-primary",
            tone === "mint" && "bg-mint",
            tone === "accent" && "bg-accent",
          )}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </span>
      <span className="w-8 shrink-0 text-right font-mono tabular-nums text-fg">
        {value}/{max}
      </span>
    </div>
  );
}

/** Institute logo placeholder: initials on the brand colour. */
export function InstituteMark({ name = "Your Institute", color, className }: { name?: string; color?: string; className?: string }) {
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "YI";
  return (
    <span
      aria-hidden
      className={clsx("grid shrink-0 place-items-center rounded-lg font-bold text-white", !color && "bg-primary", className)}
      style={color ? { background: color } : undefined}
    >
      {initials}
    </span>
  );
}

export function Illustrative({ className }: { className?: string }) {
  return <p className={clsx("font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint", className)}>Illustrative interface · sample data</p>;
}

import clsx from "clsx";

// The VILMS mark from vilms.in (the V with the marigold dot), redrawn to
// follow the theme: the tile takes the text colour, the V the background.
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={clsx("shrink-0", className)}>
      <rect width="64" height="64" rx="16" className="fill-fg" />
      <path d="M18 18h8.6L32 36.2 37.4 18H46L35.6 46h-7.2z" className="fill-canvas" />
      <circle cx="48" cy="48" r="5" className="fill-accent" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <BrandMark className="h-8 w-8" />
      <span className="font-display text-[19px] font-semibold tracking-[-0.03em]">VILMS</span>
    </span>
  );
}

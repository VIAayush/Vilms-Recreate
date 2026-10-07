import clsx from "clsx";

/**
 * Fades its children up as they scroll into view. Pure CSS: SiteProviders
 * arms an IntersectionObserver for every [data-reveal] element, a timer
 * guarantees nothing stays hidden, and prefers-reduced-motion skips it.
 * `delay` (ms) staggers siblings.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "header";
}) {
  return (
    <Tag data-reveal className={clsx(className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}

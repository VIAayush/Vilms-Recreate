import Image from "next/image";
import clsx from "clsx";
import markDark from "@/public/brand/mark-dark.png";
import markLight from "@/public/brand/mark-light.png";

// The VILMS mark, from the brand artwork: navy and gold on light surfaces,
// silver and blue on dark ones. "auto" follows the site theme; force "dark"
// inside sections that stay dark in both themes.
export function BrandMark({ className, variant = "auto", priority }: { className?: string; variant?: "auto" | "light" | "dark"; priority?: boolean }) {
  const img = "h-full w-full object-contain";
  return (
    <span aria-hidden className={clsx("relative inline-block shrink-0", className)}>
      {variant !== "dark" ? (
        <Image src={markLight} alt="" sizes="160px" priority={priority} className={clsx(img, variant === "auto" && "dark:hidden")} />
      ) : null}
      {variant !== "light" ? (
        <Image src={markDark} alt="" sizes="160px" priority={priority} className={clsx(img, "absolute inset-0", variant === "auto" && "hidden dark:block")} />
      ) : null}
    </span>
  );
}

export function Wordmark({ className, variant = "auto" }: { className?: string; variant?: "auto" | "light" | "dark" }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <BrandMark className="h-7 w-[38px]" variant={variant} priority />
      <span
        className={clsx(
          "font-logo text-[19px] font-semibold tracking-[0.06em]",
          variant === "dark" ? "text-[rgb(220_224_230)]" : variant === "light" ? "text-[rgb(0_48_86)]" : "text-[rgb(0_48_86)] dark:text-[rgb(220_224_230)]",
        )}
      >
        VILMS
      </span>
    </span>
  );
}

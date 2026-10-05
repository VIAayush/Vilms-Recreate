import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

// The round prev / next buttons used by every carousel.
export function ArrowButton({
  dir,
  onClick,
  label,
  disabled,
  tone = "light",
}: {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
  disabled?: boolean;
  tone?: "light" | "dark";
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={clsx(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition duration-200 disabled:pointer-events-none disabled:opacity-35",
        tone === "dark"
          ? "border-white/25 text-white hover:border-white/60 hover:bg-white/10"
          : "border-edge-strong text-fg hover:border-navy hover:bg-navy hover:text-white dark:hover:text-[rgb(12_18_26)]",
      )}
    >
      <Icon aria-hidden className="h-[18px] w-[18px]" />
    </button>
  );
}

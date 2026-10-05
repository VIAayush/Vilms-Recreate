import clsx from "clsx";

// Soft geometric shapes in the logo's colours — the site's illustration
// language. Pure SVG, coloured with `fill-*` / `text-*` via currentColor.

export type ShapeKind = "circle" | "squircle" | "hexagon" | "flower" | "blob" | "pentagon";

const PATHS: Record<ShapeKind, string> = {
  circle: "M100 0a100 100 0 1 1 0 200a100 100 0 1 1 0-200Z",
  squircle: "M100 2c74 0 98 24 98 98s-24 98-98 98S2 174 2 100 26 2 100 2Z",
  hexagon:
    "M58 8h84c10 0 19 5 24 14l30 56c5 9 5 21 0 30l-30 56c-5 9-14 14-24 14H58c-10 0-19-5-24-14L4 108c-5-9-5-21 0-30l30-56c5-9 14-14 24-14Z",
  flower:
    "M100 52c0-28 18-50 46-50s50 22 50 50-22 46-50 46c28 0 50 18 50 46s-22 50-50 50-46-22-46-50c0 28-18 50-46 50S4 172 4 144s22-46 50-46C26 98 4 80 4 52S26 2 54 2s46 22 46 50Z",
  blob: "M112 4c48 4 86 40 84 92-2 48-30 92-88 100C52 204 6 168 4 112 2 54 50 0 112 4Z",
  pentagon: "M88 6c7-5 17-5 24 0l78 56c7 5 10 14 7 22l-30 96c-3 8-10 14-19 14H52c-9 0-16-6-19-14L3 84c-3-8 0-17 7-22L88 6Z",
};

export function Shape({ kind, className, style }: { kind: ShapeKind; className?: string; style?: React.CSSProperties }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={clsx("block", className)} style={style}>
      <path d={PATHS[kind]} fill="currentColor" />
    </svg>
  );
}

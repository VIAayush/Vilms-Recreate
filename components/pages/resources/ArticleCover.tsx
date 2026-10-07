import clsx from "clsx";
import type { CoverKind } from "@/lib/site/articles";

// Editorial "covers" for blog cards: small vector compositions on the deep
// navy band, one per topic. Decorative only (aria-hidden); every colour is a
// theme token, so they hold in light and dark.

const W = 640;
const H = 400;

function radar(values: number[], r: number, cx: number, cy: number) {
  const n = values.length;
  const pt = (i: number, k: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k] as const;
  };
  const poly = (k: number | number[]) =>
    values
      .map((_, i) => pt(i, Array.isArray(k) ? k[i] : k))
      .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");
  return { pt, poly };
}

function Best() {
  const vals = [0.95, 0.8, 1, 0.9, 0.85, 0.95, 0.6];
  const { pt, poly } = radar(vals, 138, 320, 200);
  return (
    <>
      {[1, 0.66, 0.33].map((k) => (
        <polygon key={k} points={poly(k)} className="fill-none stroke-edge-strong" strokeWidth={1} />
      ))}
      {vals.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={320} y1={200} x2={x} y2={y} className="stroke-edge" strokeWidth={1} />;
      })}
      <polygon points={poly(vals)} className="fill-primary/25 stroke-primary" strokeWidth={2.5} strokeLinejoin="round" />
      {vals.map((v, i) => {
        const [x, y] = pt(i, v);
        return <circle key={i} cx={x} cy={y} r={5} className="fill-canvas stroke-primary" strokeWidth={2.5} />;
      })}
    </>
  );
}

function Checklist() {
  const rows = [90, 150, 210, 270];
  const circ = 2 * Math.PI * 70;
  return (
    <>
      {rows.map((y, i) => (
        <g key={y}>
          <rect x={70} y={y} width={30} height={30} rx={8} className={clsx(i < 3 ? "fill-green/20 stroke-green" : "fill-none stroke-edge-strong")} strokeWidth={2} />
          {i < 3 ? <path d={`M78 ${y + 15} l6 6 l11 -12`} className="fill-none stroke-green" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /> : null}
          <rect x={118} y={y + 5} width={[150, 120, 160, 100][i]} height={8} rx={4} className="fill-fg/70" />
          <rect x={118} y={y + 19} width={[100, 130, 90, 120][i]} height={6} rx={3} className="fill-edge-strong" />
        </g>
      ))}
      <circle cx={470} cy={200} r={70} className="fill-none stroke-edge" strokeWidth={14} />
      <circle cx={470} cy={200} r={70} className="fill-none stroke-primary" strokeWidth={14} strokeLinecap="round" strokeDasharray={`${circ * 0.72} ${circ}`} transform="rotate(-90 470 200)" />
      <text x={470} y={212} textAnchor="middle" className="fill-fg font-display text-[36px] font-medium">
        72%
      </text>
    </>
  );
}

function Classroom() {
  return (
    <>
      {/* the paper register */}
      <rect x={52} y={70} width={226} height={260} rx={14} className="fill-sunken stroke-edge-strong" strokeWidth={1.5} />
      {[104, 132, 160, 188, 216, 244, 272, 300].map((y) => (
        <line key={y} x1={68} y1={y} x2={262} y2={y} className="stroke-edge-strong" strokeWidth={1} />
      ))}
      <path d="M72 98 q12 -14 24 0 t24 0 t24 0 M72 154 q18 -12 30 0 t30 0" className="fill-none stroke-fg-faint" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={90} y1={70} x2={90} y2={330} className="stroke-red" strokeOpacity={0.5} strokeWidth={1} />
      {/* the dashboard */}
      <rect x={362} y={70} width={226} height={260} rx={14} className="fill-panel stroke-edge-strong" strokeWidth={1.5} />
      <rect x={380} y={90} width={80} height={46} rx={8} className="fill-primary-tint" />
      <rect x={472} y={90} width={98} height={46} rx={8} className="fill-primary-tint" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={382 + i * 31} y={310 - (40 + i * 22)} width={20} height={40 + i * 22} rx={4} className={i === 5 ? "fill-primary" : "fill-primary/40"} />
      ))}
      {/* the switch between them */}
      <line x1={320} y1={60} x2={320} y2={340} className="stroke-edge-strong" strokeDasharray="4 6" strokeWidth={1.5} />
      <rect x={290} y={184} width={60} height={32} rx={16} className="fill-canvas stroke-edge-strong" strokeWidth={1.5} />
      <circle cx={334} cy={200} r={11} className="fill-primary" />
    </>
  );
}

function Ai() {
  const lines = [112, 138, 164, 190, 216, 242, 268, 294];
  return (
    <>
      <rect x={60} y={54} width={270} height={292} rx={14} className="fill-panel-raised stroke-edge-strong" strokeWidth={1.5} />
      {lines.map((y) => (
        <line key={y} x1={78} y1={y} x2={312} y2={y} className="stroke-edge" strokeWidth={1} />
      ))}
      <path d="M80 104 q10 -14 20 0 t20 0 t20 0 t20 0 t20 0 M80 130 q12 -12 24 0 t24 0 t24 0 t24 0 M80 156 q9 -13 18 0 t18 0 t18 0 t18 0 t18 0 t18 0" className="fill-none stroke-fg" strokeOpacity={0.7} strokeWidth={2.5} strokeLinecap="round" />
      <rect x={72} y={118} width={170} height={24} rx={5} className="fill-primary/25" />
      <rect x={60} y={196} width={270} height={3} className="fill-primary" />
      {/* the rubric and the approval */}
      {[
        ["Content", 0.75],
        ["Structure", 0.6],
        ["Examples", 0.35],
      ].map(([label, v], i) => (
        <g key={label as string}>
          <text x={372} y={106 + i * 52} className="fill-fg-muted text-[15px]">
            {label as string}
          </text>
          <rect x={372} y={116 + i * 52} width={200} height={10} rx={5} className="fill-edge" />
          <rect x={372} y={116 + i * 52} width={200 * (v as number)} height={10} rx={5} className="fill-primary" />
        </g>
      ))}
      <circle cx={398} cy={290} r={22} className="fill-green/20 stroke-green" strokeWidth={2} />
      <path d="M388 290 l7 7 l13 -14" className="fill-none stroke-green" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x={434} y={288} className="fill-fg text-[15px] font-medium">
        Mentor approved
      </text>
      <text x={434} y={308} className="fill-fg-muted text-[13px]">
        before it is sent
      </text>
    </>
  );
}

function Platform() {
  const ys = [74, 150, 226, 302];
  return (
    <>
      {ys.map((y) => (
        <g key={y}>
          <rect x={52} y={y} width={132} height={46} rx={10} className="fill-panel stroke-edge-strong" strokeWidth={1.5} />
          <rect x={68} y={y + 19} width={70} height={8} rx={4} className="fill-edge-strong" />
          <path d={`M184 ${y + 23} C 270 ${y + 23}, 290 200, 352 200`} className="fill-none stroke-edge-strong" strokeWidth={2} strokeDasharray="5 6" />
        </g>
      ))}
      <circle cx={400} cy={200} r={64} className="fill-primary-tint stroke-primary" strokeWidth={2.5} />
      <circle cx={400} cy={200} r={82} className="fill-none stroke-edge-strong" strokeWidth={1.5} strokeDasharray="3 7" />
      <ellipse cx={400} cy={178} rx={26} ry={9} className="fill-none stroke-primary" strokeWidth={3} />
      <path d="M374 178 v44 c0 5 12 9 26 9 s26 -4 26 -9 v-44 M374 200 c0 5 12 9 26 9 s26 -4 26 -9" className="fill-none stroke-primary" strokeWidth={3} />
      {[132, 200, 268].map((y) => (
        <g key={y}>
          <path d={`M482 200 C 520 200, 520 ${y}, 548 ${y}`} className="fill-none stroke-primary" strokeWidth={2} />
          <circle cx={556} cy={y} r={7} className="fill-primary" />
        </g>
      ))}
    </>
  );
}

const SCENES: Record<CoverKind, () => React.ReactNode> = { best: Best, checklist: Checklist, classroom: Classroom, ai: Ai, platform: Platform };

export function ArticleCover({ kind, className }: { kind: CoverKind; className?: string }) {
  const Scene = SCENES[kind];
  return (
    <div aria-hidden className={clsx("band-navy relative overflow-hidden", className)}>
      <div className="grid-bg-dark pointer-events-none absolute inset-0" />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative h-full w-full" preserveAspectRatio="xMidYMid slice" fontFamily="var(--font-sans)">
        <Scene />
      </svg>
    </div>
  );
}

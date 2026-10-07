import clsx from "clsx";

// The handwritten answer sheet used across the AI page. It is a physical
// object, so it keeps paper colours in both themes (the .answer-sheet and
// .paper-* classes live in site.css). Every state is a prop, so the story, the
// hero loop and the sign-off demo drive the same sheet.

export type MarkKey = "content" | "structure" | "examples" | "gap" | "mentor";
export type NoteKey = "content" | "examples" | "gap" | "mentor";

type Seg = { t: string; k?: MarkKey };

// One line per row of the ruled sheet (28px rows).
export const SHEET_LINES: Seg[][] = [
  [{ t: "Directive Principles guide" }],
  [{ t: "the state in making " }, { t: "laws", k: "content" }],
  [{ t: "for social welfare.", k: "content" }],
  [{ t: "Art. 38", k: "examples" }, { t: ": a just social" }],
  [{ t: "order. " }, { t: "Art. 39", k: "mentor" }, { t: ": equal pay" }],
  [{ t: "Not court-enforceable,", k: "gap" }],
  [{ t: "yet " }, { t: "fundamental to", k: "structure" }],
  [{ t: "governance." }],
];

const NOTES: { key: NoteKey; line: number; tone: "ai" | "mentor"; text: string }[] = [
  { key: "content", line: 1, tone: "ai", text: "Core idea stated" },
  { key: "examples", line: 3, tone: "ai", text: "1 example found: Art. 38" },
  { key: "gap", line: 5, tone: "ai", text: "Add a case or recent example" },
  { key: "mentor", line: 7, tone: "mentor", text: "Art. 39 counts too" },
];

const MARK_CLASS: Record<MarkKey, string> = {
  content: "paper-mark-ai",
  structure: "paper-mark-ai",
  examples: "paper-mark-ai",
  gap: "paper-mark-warn",
  mentor: "",
};
const MENTOR_MARK = { backgroundImage: "linear-gradient(rgb(25 128 86 / 0.24), rgb(25 128 86 / 0.24))" } as const;

export type SheetProps = {
  className?: string;
  /** which highlights are lit */
  lit?: Partial<Record<MarkKey, boolean>>;
  /** a highlight being pointed at (strongest) */
  hot?: MarkKey | null;
  /** 0–1: the scan line; null hides it */
  scan?: number | null;
  /** margin notes that are visible */
  notes?: Partial<Record<NoteKey, boolean>>;
  /** stamp the evaluated score on the sheet */
  stamp?: number | null;
  /** hover a marked phrase (linked highlighting) */
  onHot?: (k: MarkKey | null) => void;
  caption?: string;
  student?: string;
  /** smaller type and tighter margin column */
  compact?: boolean;
};

export function AnswerSheet({ className, lit = {}, hot = null, scan = null, notes = {}, stamp = null, onHot, caption = "Q3 · page 1 of 2", student = "Rahul K.", compact }: SheetProps) {
  const row = 28;
  return (
    <figure
      className={clsx(
        "answer-sheet with-margin relative m-0 overflow-hidden rounded-2xl border border-edge shadow-window [--rule:28px]",
        className,
      )}
      style={{ ["--rule" as string]: `${row}px` }}
    >
      {/* caption row = one ruled line */}
      <figcaption className="paper-muted flex h-[28px] items-center justify-between pl-12 pr-3 font-sans text-[10.5px] sm:pl-14">
        <span>{caption}</span>
        <span>{student}</span>
      </figcaption>
      <div className="relative pl-12 sm:pl-14">
        <div className={clsx("font-hand", compact ? "pr-[92px] text-[17px] leading-[28px]" : "pr-[104px] text-[17px] leading-[28px] sm:pr-[118px] sm:text-[19px]")}>
          {SHEET_LINES.map((segs, i) => {
            const read = scan != null && i * row + row / 2 < scan * SHEET_LINES.length * row;
            return (
              <p key={i} className={clsx("m-0 h-[28px] whitespace-nowrap transition-colors duration-300", read && "bg-[rgb(29_99_180/0.06)]")}>
                {segs.map((s, j) =>
                  s.k ? (
                    <Mark key={j} k={s.k} on={!!lit[s.k]} hot={hot === s.k} onHot={onHot}>
                      {s.t}
                    </Mark>
                  ) : (
                    <span key={j}>{s.t}</span>
                  ),
                )}
              </p>
            );
          })}
        </div>

        {/* margin notes, aligned to their line */}
        {NOTES.map((n) => (
          <div
            key={n.key}
            aria-hidden
            className={clsx(
              "absolute right-1.5 rounded-md border-l-2 px-1.5 py-1 font-sans text-[10px] font-medium leading-[1.25] shadow-sm transition duration-500 sm:right-2",
              compact ? "w-[84px]" : "w-[92px] sm:w-[108px]",
              n.tone === "ai" ? "paper-note-ai" : "paper-note-mentor",
              notes[n.key] ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
              hot === n.key && "ring-2 ring-[rgb(29_99_180/0.5)]",
            )}
            style={{ top: n.line * row - 5 }}
          >
            {n.text}
          </div>
        ))}
      </div>

      {/* trailing ruled space (the stamp lands here) so it reads as a page, not a card */}
      <div aria-hidden className="h-[56px]" />

      {scan != null && scan > 0 && scan < 1 ? (
        <span aria-hidden className="pointer-events-none absolute inset-x-0 z-10" style={{ top: `${28 + scan * SHEET_LINES.length * row}px`, transform: "translateY(-50%)" }}>
          <span className="block h-16 bg-gradient-to-b from-transparent via-[rgb(29_99_180/0.22)] to-transparent" />
          <span className="absolute inset-x-0 top-1/2 block h-[2px] bg-[rgb(29_99_180)] shadow-[0_0_10px_rgb(29_99_180/0.7)]" />
        </span>
      ) : null}

      <div
        aria-hidden
        className={clsx(
          "paper-stamp absolute bottom-1.5 left-12 z-20 rounded-xl border-[3px] bg-white/70 px-2.5 py-1 text-center sm:left-14 font-sans transition duration-500",
          stamp != null ? "-rotate-[8deg] scale-100 opacity-100" : "-rotate-[16deg] scale-[1.6] opacity-0",
        )}
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.18em]">Evaluated</p>
        <p className="font-display text-[20px] font-bold leading-none">{stamp ?? 0}/20</p>
      </div>
    </figure>
  );
}

function Mark({ k, on, hot, onHot, children }: { k: MarkKey; on: boolean; hot: boolean; onHot?: (k: MarkKey | null) => void; children: React.ReactNode }) {
  return (
    <span
      onMouseEnter={onHot ? () => onHot(k) : undefined}
      onMouseLeave={onHot ? () => onHot(null) : undefined}
      className={clsx(
        "bg-no-repeat transition-[background-size] duration-500 ease-out [background-position:0_88%]",
        MARK_CLASS[k],
        on ? (hot ? "[background-size:100%_100%]" : "[background-size:100%_42%]") : "[background-size:0%_42%]",
      )}
      style={k === "mentor" ? MENTOR_MARK : undefined}
    >
      {children}
    </span>
  );
}

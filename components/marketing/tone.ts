// One colour language for every illustrated screen, diagram and module chip:
//   blue   — a lead, learning, anything active or selected
//   green  — done: enrolled, paid, approved
//   yellow — waiting on a person: in review, awaiting evaluation
//   red    — live right now (or refunded)
// Blue stays dominant; the others are small dots, bars and badges.

export const MODULE_DOT: Record<string, string> = {
  "Live classes": "bg-red",
  Payments: "bg-green",
  Tests: "bg-yellow",
  Certificates: "bg-yellow",
};

export const moduleDot = (module: string) => MODULE_DOT[module] ?? "bg-primary";

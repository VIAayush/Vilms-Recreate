export type MarkStyle = "square" | "circle" | "shield" | "book";

/** Everything a visitor can change in the customiser. */
export type Brand = {
  /** false = how it looks before branding: VILMS everywhere */
  branded: boolean;
  name: string;
  color: string;
  mark: MarkStyle;
  /** "sub" = yourname.vilms.in, "custom" = your own domain */
  domainMode: "sub" | "custom";
  customDomain: string;
};

export const DEFAULT_BRAND: Brand = { branded: true, name: "ABC Academy", color: "#1D63B4", mark: "square", domainMode: "custom", customDomain: "abcacademy.in" };

export const VILMS_NAVY = "#003056";

export const SWATCHES = [
  { name: "Blue", hex: "#1D63B4" },
  { name: "Teal", hex: "#0F7B8A" },
  { name: "Green", hex: "#1B8A4B" },
  { name: "Red", hex: "#C8352E" },
  { name: "Orange", hex: "#D9731A" },
  { name: "Ink", hex: "#25303F" },
];

export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourinstitute";

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "YI";

/** White or near-black text, whichever reads on this colour. */
export function inkFor(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "#FFFFFF";
  const n = parseInt(m[1], 16);
  const lin = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  return L > 0.42 ? "#0E1B2C" : "#FFFFFF";
}

export const accentOf = (b: Brand) => (b.branded ? b.color : VILMS_NAVY);
export const displayName = (b: Brand) => (b.branded ? b.name.trim() || "Your Institute" : "VILMS");

export function addressOf(b: Brand) {
  if (!b.branded) return "app.vilms.in";
  if (b.domainMode === "custom") return b.customDomain.trim() || `${slugOf(b.name)}.in`;
  return `${slugOf(b.name)}.vilms.in`;
}

export function emailFrom(b: Brand) {
  if (!b.branded) return { name: "VILMS", address: "no-reply@vilms.in" };
  return { name: displayName(b), address: b.domainMode === "custom" ? `hello@${addressOf(b)}` : `no-reply@${addressOf(b)}` };
}

/** The places a student could still see "VILMS". */
export function vilmsPlaces(b: Brand) {
  const all = [
    { label: "Logo and portal", on: !b.branded },
    { label: "Certificates", on: !b.branded },
    { label: "Emails", on: !b.branded },
    { label: "Receipts", on: !b.branded },
    { label: "Web address", on: !b.branded || b.domainMode === "sub" },
  ];
  return all;
}

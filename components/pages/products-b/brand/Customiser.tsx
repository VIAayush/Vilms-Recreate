"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { BrowserFrame, Illustrative } from "@/components/marketing/screens/primitives";
import { useInView } from "@/components/marketing/motion";
import { BrandCertificate, BrandEmail, BrandPortal, InstituteLogo, VilmsPlaces } from "./pieces";
import { addressOf, DEFAULT_BRAND, inkFor, slugOf, SWATCHES, type Brand, type MarkStyle } from "./brand";

const MARKS: { id: MarkStyle; label: string }[] = [
  { id: "square", label: "Square" },
  { id: "circle", label: "Circle" },
  { id: "shield", label: "Shield" },
  { id: "book", label: "Book" },
];

/**
 * The branding customiser. Type a name, pick a colour, a logo mark and a
 * domain; the portal, certificate, email and address bar all change with it.
 * It starts as VILMS and brands itself the first time it scrolls into view.
 */
export function Customiser() {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const [brand, setBrand] = useState<Brand>({ ...DEFAULT_BRAND, branded: false });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || touched) return;
    const t = window.setTimeout(() => setBrand((b) => ({ ...b, branded: true })), 900);
    return () => window.clearTimeout(t);
  }, [inView, touched]);

  const edit = (patch: Partial<Brand>) => {
    setTouched(true);
    setBrand((b) => ({ ...b, branded: true, ...patch }));
  };
  const customHex = !SWATCHES.some((s) => s.hex.toLowerCase() === brand.color.toLowerCase());

  return (
    <div ref={ref} className="grid items-start gap-6 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-8">
      {/* controls */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 rounded-[24px] border border-edge bg-panel p-5 shadow-soft sm:p-6 lg:sticky lg:top-24">
        <div role="radiogroup" aria-label="Preview" className="grid grid-cols-2 gap-1 rounded-xl bg-canvas-alt p-1">
          {([false, true] as const).map((on) => (
            <button
              key={String(on)}
              type="button"
              role="radio"
              aria-checked={brand.branded === on}
              onClick={() => {
                setTouched(true);
                setBrand((b) => ({ ...b, branded: on }));
              }}
              className={clsx("min-h-[40px] rounded-lg text-[13px] font-semibold transition duration-200", brand.branded === on ? "bg-panel text-fg shadow-sm ring-1 ring-edge" : "text-fg-muted hover:text-fg")}
            >
              {on ? "Your brand" : "VILMS default"}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor={`${uid}-name`} className="v-label">
            Institute name
          </label>
          <input id={`${uid}-name`} className="v-field" value={brand.name} maxLength={26} onChange={(e) => edit({ name: e.target.value })} placeholder="ABC Academy" autoComplete="off" />
        </div>

        <fieldset>
          <legend className="v-label">Colour</legend>
          <div role="radiogroup" aria-label="Brand colour" className="flex flex-wrap items-center gap-2.5">
            {SWATCHES.map((s) => {
              const on = brand.branded && brand.color.toLowerCase() === s.hex.toLowerCase();
              return (
                <button
                  key={s.hex}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={s.name}
                  onClick={() => edit({ color: s.hex })}
                  className={clsx("grid h-9 w-9 place-items-center rounded-full ring-offset-2 ring-offset-[rgb(var(--surface))] transition duration-200 hover:scale-110", on && "ring-2 ring-fg")}
                  style={{ background: s.hex, color: inkFor(s.hex) }}
                >
                  {on ? <Check aria-hidden className="h-4 w-4" /> : null}
                </button>
              );
            })}
            <label className={clsx("relative grid h-9 w-9 cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-edge-strong text-[11px] font-semibold text-fg-muted transition hover:scale-110", brand.branded && customHex && "ring-2 ring-fg ring-offset-2 ring-offset-[rgb(var(--surface))]")} style={brand.branded && customHex ? { background: brand.color, color: inkFor(brand.color) } : undefined}>
              <span aria-hidden>+</span>
              <span className="sr-only">Pick a custom colour</span>
              <input type="color" value={brand.color} onChange={(e) => edit({ color: e.target.value })} className="absolute inset-0 cursor-pointer opacity-0" />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="v-label">Logo mark</legend>
          <div role="radiogroup" aria-label="Logo mark" className="grid grid-cols-4 gap-2">
            {MARKS.map((m) => {
              const on = brand.branded && brand.mark === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => edit({ mark: m.id })}
                  className={clsx("flex flex-col items-center gap-1.5 rounded-xl border py-2.5 text-[11.5px] font-medium transition duration-200 hover:-translate-y-px", on ? "border-fg bg-canvas-alt text-fg" : "border-edge text-fg-muted hover:border-edge-strong")}
                >
                  <span style={{ ["--b" as string]: brand.color, ["--bi" as string]: inkFor(brand.color) }}>
                    <InstituteLogo name={brand.name} mark={m.id} size={30} />
                  </span>
                  {m.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="v-label">Web address</legend>
          <div role="radiogroup" aria-label="Web address" className="space-y-2">
            {(
              [
                ["sub", `${slugOf(brand.name)}.vilms.in`, "Your own address, on every plan"],
                ["custom", "Your own domain", "Only your name in the address"],
              ] as const
            ).map(([id, title, sub]) => {
              const on = brand.branded && brand.domainMode === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => edit({ domainMode: id })}
                  className={clsx("flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left transition duration-200 hover:-translate-y-px", on ? "border-fg bg-canvas-alt" : "border-edge hover:border-edge-strong")}
                >
                  <span className={clsx("mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2", on ? "border-fg" : "border-edge-strong")}>{on ? <span className="h-1.5 w-1.5 rounded-full bg-fg" /> : null}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-[13px] font-medium">{title}</span>
                    <span className="block text-[12px] text-fg-muted">{sub}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {brand.branded && brand.domainMode === "custom" ? (
            <div className="mt-2">
              <label htmlFor={`${uid}-dom`} className="sr-only">
                Your domain
              </label>
              <input
                id={`${uid}-dom`}
                className="v-field font-mono text-[13.5px]"
                value={brand.customDomain}
                maxLength={40}
                onChange={(e) => edit({ customDomain: e.target.value.toLowerCase().replace(/[^a-z0-9.-]/g, "") })}
                placeholder="abcacademy.in"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          ) : null}
        </fieldset>
      </form>

      {/* preview */}
      <div className="min-w-0 space-y-4">
        <BrowserFrame url={addressOf(brand)} className="rounded-[20px]">
          <BrandPortal b={brand} />
        </BrowserFrame>
        <div className="grid gap-4 md:grid-cols-2">
          <BrandCertificate b={brand} />
          <BrandEmail b={brand} />
        </div>
        <VilmsPlaces b={brand} />
        <Illustrative />
      </div>
    </div>
  );
}

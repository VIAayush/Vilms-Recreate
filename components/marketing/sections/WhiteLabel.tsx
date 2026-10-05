"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Check, Mail } from "lucide-react";
import { whiteLabel } from "@/lib/content";
import { useInView } from "../motion";
import { CertScene } from "../screens/scenes";
import { InstituteMark } from "../screens/primitives";

type SurfaceId = (typeof whiteLabel.surfaces)[number]["id"];
const NEUTRAL = "#808A97"; // the unbranded preview, before it "changes hands"

/** "#1560A8" → "21 96 168", for the CSS colour effects. */
const triplet = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourinstitute";

// Type a name, pick a colour, switch on your domain — and watch the website,
// certificate and email change hands. Nothing typed here leaves the browser.
export function WhiteLabel() {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const [name, setName] = useState("");
  const [color, setColor] = useState(whiteLabel.swatches[0]);
  const [ownDomain, setOwnDomain] = useState(false);
  const [surface, setSurface] = useState<SurfaceId>("site");
  const [branded, setBranded] = useState(false);

  // The first time the preview comes into view, it "changes hands".
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setBranded(true), 700);
    return () => window.clearTimeout(t);
  }, [inView]);

  const display = name.trim() || "Your Institute";
  const host = ownDomain ? `learn.${slug(display)}.in` : `${slug(display)}.vilms.in`;
  const brand = branded ? color : NEUTRAL;
  const shownName = branded ? display : "VILMS";
  const order = [surface, ...whiteLabel.surfaces.map((s) => s.id).filter((s) => s !== surface)] as SurfaceId[];

  return (
    // The whole section takes on the visitor's brand colour as they choose it.
    <section
      id="brand"
      aria-labelledby="brand-title"
      data-glow
      style={{ "--glow": triplet(brand), backgroundColor: `rgb(${triplet(brand)} / 0.07)` } as React.CSSProperties}
      className="glow-section overflow-hidden py-24 transition-colors duration-700 sm:py-32"
    >
      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        {/* Preview: three surfaces fanned out; the chosen one in front. */}
        <div ref={ref} className="relative order-2 lg:order-1">
          <div className="relative mx-auto grid w-full max-w-[640px] px-[4%] pt-[9%]" data-tilt="3">
            {order.map((id, depth) => (
              <button
                key={id}
                type="button"
                tabIndex={depth === 0 ? -1 : 0}
                aria-label={depth === 0 ? undefined : `Show the ${whiteLabel.surfaces.find((s) => s.id === id)?.label.toLowerCase()} preview`}
                aria-hidden={depth === 0 ? true : undefined}
                onClick={() => setSurface(id)}
                className={clsx(
                  "origin-bottom self-start text-left transition-[transform,opacity] duration-500 ease-out [grid-area:1/1]",
                  depth === 0 && "z-30 cursor-default",
                  depth === 1 && "z-20 translate-x-[5%] translate-y-[-5%] rotate-[3deg] scale-[0.94] opacity-80 hover:translate-y-[-8%]",
                  depth === 2 && "z-10 -translate-x-[5%] translate-y-[-9%] -rotate-[4deg] scale-[0.88] opacity-50 hover:translate-y-[-12%]",
                )}
              >
                <Surface id={id} brand={brand} name={shownName} host={branded ? host : "app.vilms.in"} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">Illustrative preview · nothing you type is saved</p>
        </div>

        {/* Controls */}
        <div className="order-1 lg:order-2">
          <p className="kicker">{whiteLabel.kicker}</p>
          <h2 id="brand-title" className="h2 mt-4">
            {whiteLabel.title}
          </h2>
          <p className="mt-3 font-display text-[clamp(22px,2.4vw,30px)] font-semibold tracking-tight">
            Students never see{" "}
            <span className="relative inline-block text-fg-muted">
              VILMS
              <span aria-hidden className={clsx("absolute inset-x-[-4px] top-[55%] h-[3px] origin-left rounded bg-red transition-transform duration-700 ease-out", branded ? "scale-x-100" : "scale-x-0")} />
            </span>
            .
          </p>
          <p className="sub mt-5 max-w-[440px]">{whiteLabel.sub}</p>

          <div className="mt-9 space-y-6">
            <div>
              <label htmlFor={`${uid}-name`} className="v-label">
                Your institute&apos;s name
              </label>
              <input
                id={`${uid}-name`}
                value={name}
                maxLength={32}
                onChange={(e) => {
                  setName(e.target.value);
                  setBranded(true);
                }}
                placeholder="Your Institute"
                autoComplete="off"
                className="v-field"
              />
            </div>

            <fieldset>
              <legend className="v-label">Brand colour</legend>
              <div className="flex flex-wrap gap-2.5">
                {whiteLabel.swatches.map((c) => (
                  <label key={c} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name={`${uid}-colour`}
                      value={c}
                      checked={color === c}
                      onChange={() => {
                        setColor(c);
                        setBranded(true);
                      }}
                      className="peer sr-only"
                    />
                    <span className="sr-only">{c}</span>
                    <span
                      aria-hidden
                      className="grid h-9 w-9 place-items-center rounded-full text-white shadow-[inset_0_0_0_1px_rgb(var(--border-strong))] ring-offset-2 ring-offset-[rgb(var(--background))] transition-transform duration-200 hover:scale-110 peer-checked:ring-2 peer-focus-visible:ring-2"
                      style={{ background: c, ["--tw-ring-color" as string]: c }}
                    >
                      {color === c ? <Check className="h-4 w-4" /> : null}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-6">
              <label className="flex cursor-pointer items-center gap-3 text-[14.5px] font-medium">
                <input
                  type="checkbox"
                  role="switch"
                  checked={ownDomain}
                  onChange={(e) => {
                    setOwnDomain(e.target.checked);
                    setBranded(true);
                  }}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="relative h-6 w-11 rounded-full bg-edge-strong transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                />
                Use my own domain
              </label>
              <div role="group" aria-label="Preview" className="flex rounded-full border border-edge p-1">
                {whiteLabel.surfaces.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={surface === s.id}
                    onClick={() => setSurface(s.id)}
                    className={clsx("rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors", surface === s.id ? "bg-primary-tint text-primary" : "text-fg-muted hover:text-fg")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Surface({ id, brand, name, host }: { id: SurfaceId; brand: string; name: string; host: string }) {
  const frame = "overflow-hidden rounded-[14px] border border-edge bg-panel shadow-window";
  if (id === "certificate") {
    return (
      <div className={clsx(frame, "p-4 sm:p-8")}>
        <CertScene name={name} color={brand} />
      </div>
    );
  }
  if (id === "email") {
    return (
      <div className={frame}>
        <div className="border-b border-edge px-5 py-3.5 text-[12.5px]">
          <p className="flex items-center gap-2 text-fg-muted">
            <Mail aria-hidden className="h-3.5 w-3.5" /> Inbox
          </p>
          <p className="mt-2">
            <b>{name}</b> <span className="text-fg-muted">&lt;hello@{host.replace(/^learn\./, "")}&gt;</span>
          </p>
          <p className="mt-0.5 font-semibold">Your class starts in 10 minutes</p>
        </div>
        <div className="px-5 py-5 text-[13.5px] leading-relaxed">
          <InstituteMark name={name} color={brand} className="h-9 w-9 text-[12px] transition-colors duration-700" />
          <p className="mt-4">Hi Rahul,</p>
          <p className="mt-2 text-fg-muted">Polity · Batch A goes live at 7:00 PM. Your notes for lesson 3 are attached.</p>
          <span className="mt-4 inline-block rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-700" style={{ background: brand }}>
            Join class
          </span>
          <p className="mt-5 text-[11px] text-fg-faint">Sent by {name}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={frame}>
      <div className="flex items-center gap-2 border-b border-edge px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-edge" />
          <i className="h-2 w-2 rounded-full bg-edge" />
          <i className="h-2 w-2 rounded-full bg-edge" />
        </span>
        <span className="mx-auto truncate rounded-md bg-canvas-alt px-3 py-1 font-mono text-[10.5px] text-fg-muted">{host}</span>
      </div>
      <div className="flex items-center gap-2.5 px-5 py-3.5">
        <InstituteMark name={name} color={brand} className="h-8 w-8 text-[11px] transition-colors duration-700" />
        <span className="truncate text-[14px] font-semibold">{name}</span>
        <span className="ml-auto hidden gap-4 text-[12px] text-fg-muted sm:flex">
          <span>Courses</span>
          <span>Free materials</span>
          <span>Webinars</span>
        </span>
      </div>
      <div className="px-5 pb-6">
        <div className="rounded-2xl p-5 text-white transition-colors duration-700 sm:p-6" style={{ background: brand }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">Hybrid · recorded + live</p>
          <p className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-semibold leading-tight tracking-tight">Prelims Foundation Batch</p>
          <p className="mt-1.5 max-w-[340px] text-[12.5px] text-white/80">Weekly live classes, answer writing with mentor evaluation, certificate on completion.</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-white px-4 py-1.5 text-[12.5px] font-semibold text-[rgb(27_32_38)]">Enrol · ₹15,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

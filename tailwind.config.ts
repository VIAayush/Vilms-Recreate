import type { Config } from "tailwindcss";

// Two systems live here (the public site's palette comes from the VILMS logo):
//  * the CRM's evergreen + marigold tokens (ink, brass, paper, …), unchanged;
//  * the public site's themeable tokens, which read CSS variables defined in
//    components/marketing/site.css so one class works in light and dark mode.
const themed = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["selector", "[data-theme=\"dark\"]"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        hand: ["var(--font-hand)", "cursive"],
        logo: ["var(--font-logo)", "var(--font-sans)", "sans-serif"],
      },
      colors: {
        // ---- CRM ----
        ink: {
          DEFAULT: "#0A2E25",
          900: "#072219",
          800: "#0A2E25",
          700: "#14483A",
          600: "#1D5B49",
          500: "#2A6E59",
          100: "#DCEAE3",
          50: "#EEF5F1",
        },
        brass: {
          DEFAULT: "#E8A33D",
          600: "#D18C26",
          soft: "#EFBB6B",
          tint: "#FBF1DE",
          text: "#8A6520",
        },
        paper: { DEFAULT: "#F6F5F0", 2: "#F1EFE8" },
        surface: { DEFAULT: "#FFFFFF", 2: "#FBFAF6" },
        line: { DEFAULT: "#E7E4DB", strong: "#DDD9CE" },
        body: "#1D2A26",
        muted: "#5F6B66",
        faint: "#98A19C",
        ok: { DEFAULT: "#2E7D5B", bg: "#E4F0EA" },
        warn: { DEFAULT: "#B0833A", bg: "#F7EBD6" },
        err: { DEFAULT: "#B23B3B", bg: "#F7E5E3" },
        info: { DEFAULT: "#33628C", bg: "#E6EDF4" },
        ai: { DEFAULT: "#6B4FA0", bg: "#EEE9F6" },

        // ---- Public site (themeable). Values live in components/marketing/site.css. ----
        canvas: { DEFAULT: themed("background"), alt: themed("background-alt") },
        fg: { DEFAULT: themed("foreground"), muted: themed("muted"), faint: themed("faint") },
        panel: { DEFAULT: themed("surface"), raised: themed("surface-elevated") },
        sunken: themed("sunken"),
        edge: { DEFAULT: themed("border"), strong: themed("border-strong") },
        primary: { DEFAULT: themed("primary"), hover: themed("primary-hover"), tint: themed("primary-tint"), ink: themed("primary-ink") },
        green: { DEFAULT: themed("green"), tint: themed("green-tint") },
        gold: { DEFAULT: themed("gold"), text: themed("gold-text") },
        navy: { DEFAULT: themed("navy"), tint: themed("navy-tint") },
        red: { DEFAULT: themed("red"), tint: themed("red-tint") },
        indigo: themed("indigo"),
        steel: { DEFAULT: themed("steel"), tint: themed("steel-tint") },
        yellow: { DEFAULT: themed("yellow"), text: themed("yellow-text") },
        purple: { DEFAULT: themed("purple"), tint: themed("purple-tint") },
        silver: themed("silver"),
        sky: themed("sky"),
        wash: { blue: themed("wash-blue"), green: themed("wash-green") },
      },
      boxShadow: {
        card: "0 1px 3px rgba(10,46,37,.06)",
        lift: "0 12px 32px -8px rgba(10,46,37,.16)",
        float: "0 24px 60px -16px rgba(10,46,37,.35)",
        window: "var(--shadow-window)",
        soft: "var(--shadow-soft)",
      },
      borderRadius: { xl2: "1.25rem" },
      transitionTimingFunction: {
        out: "cubic-bezier(.16,1,.3,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },
      keyframes: {
        "rise-in": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        "pop-in": { from: { opacity: "0", transform: "scale(.94)" }, to: { opacity: "1", transform: "none" } },
        pulse: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        ping: { "75%,100%": { transform: "scale(2.2)", opacity: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        flow: { to: { strokeDashoffset: "-28" } },
      },
      animation: {
        "rise-in": "rise-in .5s cubic-bezier(.16,1,.3,1) both",
        "pop-in": "pop-in .35s cubic-bezier(.16,1,.3,1) both",
        blink: "pulse 1.6s ease-in-out infinite",
        ping: "ping 1.6s cubic-bezier(0,0,.2,1) infinite",
        marquee: "marquee 38s linear infinite",
        flow: "flow 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

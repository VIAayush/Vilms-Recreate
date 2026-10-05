import { ImageResponse } from "next/og";

export const alt = "VILMS — Your students pay you. Not your software.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#F2F0F7",
          fontFamily: "sans-serif",
          background:
            "radial-gradient(800px 520px at 100% 0%, rgba(91,61,245,.55), transparent 60%), radial-gradient(600px 420px at 90% 100%, rgba(37,99,235,.35), transparent 60%), radial-gradient(420px 300px at 70% 60%, rgba(255,155,47,.16), transparent 70%), #0B0A10",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#F2F0F7" />
            <path d="M18 18h8.6L32 36.2 37.4 18H46L35.6 46h-7.2z" fill="#0B0A10" />
            <circle cx="48" cy="48" r="5" fill="#FFB23F" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>VILMS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1, letterSpacing: -3.5 }}>Your students pay you.</div>
          <div style={{ fontSize: 86, fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, letterSpacing: -2, color: "#A6A1B8" }}>Not your software.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(242,240,247,0.72)" }}>
          Courses · Live classes · Answer evaluation · Payments · Leads — 0% revenue share
        </div>
      </div>
    ),
    size,
  );
}

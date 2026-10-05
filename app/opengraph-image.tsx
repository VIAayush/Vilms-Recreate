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
          color: "#202124",
          fontFamily: "sans-serif",
          background: "#FFFFFF",
          borderTop: "12px solid #1A73E8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#202124" />
            <path d="M18 18h8.6L32 36.2 37.4 18H46L35.6 46h-7.2z" fill="#FFFFFF" />
            <circle cx="48" cy="48" r="5" fill="#FBBC04" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>VILMS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1, letterSpacing: -3.5 }}>Your students pay you.</div>
          <div style={{ fontSize: 86, fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, letterSpacing: -2, color: "#5F6368" }}>Not your software.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#5F6368" }}>
          Courses · Live classes · Answer evaluation · Payments · Leads —
          <span style={{ color: "#1A73E8", fontWeight: 700 }}>0% revenue share</span>
        </div>
      </div>
    ),
    size,
  );
}

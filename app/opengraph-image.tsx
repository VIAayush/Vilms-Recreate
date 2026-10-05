import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "VILMS — Your students pay you. Not your software.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card in the brand's light pairing: navy type, the gold-and-navy
// mark, a gold rule. White background — no warm tints.
export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/mark-light.png"));
  const src = `data:image/png;base64,${mark.toString("base64")}`;
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
          color: "#111C2B",
          fontFamily: "sans-serif",
          background: "#FFFFFF",
          borderTop: "14px solid #003056",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={96} height={70} alt="" />
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: 4, color: "#003056" }}>VILMS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1, letterSpacing: -3.5 }}>Your students pay you.</div>
          <div style={{ fontSize: 86, fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, letterSpacing: -2, color: "#546070" }}>Not your software.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 25, color: "#546070" }}>
          <div style={{ width: 48, height: 4, background: "#C9A24B" }} />
          Courses · Live classes · Evaluation · Payments · Leads
          <span style={{ color: "#003056", fontWeight: 700, whiteSpace: "nowrap" }}>— 0% revenue share</span>
        </div>
      </div>
    ),
    size,
  );
}

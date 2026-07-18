import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BETWEEN — AI care for everything that happens between appointments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "stretch", background: "#07110f", color: "#f6f6ed", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
      <div style={{ alignItems: "center", display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 3 }}>
        <span style={{ color: "#d8ff77", fontSize: 38, marginRight: 16 }}>(•)</span> BETWEEN
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
        <span style={{ color: "#d8ff77", fontSize: 17, fontWeight: 700, letterSpacing: 3, marginBottom: 24 }}>AT-HOME CHRONIC CARE, REIMAGINED</span>
        <span style={{ fontSize: 72, fontWeight: 620, letterSpacing: -4, lineHeight: 1.04 }}>AI care for everything that happens between appointments.</span>
      </div>
      <div style={{ alignItems: "center", borderTop: "1px solid #33413d", display: "flex", fontSize: 18, justifyContent: "space-between", paddingTop: 25 }}>
        <span style={{ color: "#aebbb6" }}>Notice drift · Adapt one approved step · Connect the human</span>
        <span style={{ color: "#d8ff77" }}>Interactive prototype →</span>
      </div>
    </div>,
    size,
  );
}

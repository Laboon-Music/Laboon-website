import { ImageResponse } from "next/og";
import { HOME_CONTENT } from "@/content/home";
import { SITE_CONTENT } from "@/content/site";

// Social share image (Facebook, Instagram, WhatsApp, X…), generated at build
// time from the brand colours and texts — no image asset needed. Replace with
// a designed visual once the brand assets exist. See docs/features/seo.md.

export const alt = SITE_CONTENT.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background:
          "radial-gradient(circle at 0% 0%, rgba(124,92,255,0.55), transparent 55%), radial-gradient(circle at 100% 30%, rgba(255,92,168,0.45), transparent 50%), #0a0a0f",
        color: "#f4f4f8",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
        {SITE_CONTENT.name}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 40,
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        <span>{HOME_CONTENT.hero.title}</span>
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #7c5cff, #ff5ca8)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {HOME_CONTENT.hero.titleHighlight}
        </span>
      </div>
      <div style={{ marginTop: 40, fontSize: 30, color: "#a6a6ba" }}>
        {HOME_CONTENT.hero.badge}
      </div>
    </div>,
    size,
  );
}

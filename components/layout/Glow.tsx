import type { CSSProperties } from "react";

// Blurred decorative light blob (see `.glow` in app/globals.css).
export function Glow({ style }: { style: CSSProperties }) {
  return <div aria-hidden="true" className="glow" style={style} />;
}

/** The two default blobs (violet top-left, pink top-right) used on every page. */
export function GlowBackground() {
  return (
    <>
      <Glow
        style={{
          top: "-120px",
          left: "-80px",
          width: "420px",
          height: "420px",
          background: "var(--color-brand)",
        }}
      />
      <Glow
        style={{
          top: "120px",
          right: "-120px",
          width: "380px",
          height: "380px",
          background: "var(--color-brand-2)",
        }}
      />
    </>
  );
}

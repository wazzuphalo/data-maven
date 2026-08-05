import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static route with no dynamic params, so Next.js renders this once at
// build time into a static PNG — not on-demand at request time. Avoids the
// most common Netlify portability snag with next/og.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#100f0c",
          color: "#f5f6f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 64,
              height: 8,
              background: "#3fd9bf",
              marginBottom: 32,
              display: "flex",
            }}
          />
          <div style={{ fontSize: 64, fontWeight: 700, display: "flex" }}>
            {siteConfig.studioName}
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a7acb9",
            maxWidth: 900,
            display: "flex",
          }}
        >
          A six-lens digital presence audit for {siteConfig.serviceArea.name}{" "}
          businesses
        </div>
      </div>
    ),
    { ...size }
  );
}

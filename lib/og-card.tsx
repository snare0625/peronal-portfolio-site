import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

/**
 * Link-preview card for LinkedIn, WhatsApp, Slack, X: availability, name, role and tagline on ink.
 * Shared by app/opengraph-image.tsx and app/twitter-image.tsx; text comes from the site content.
 */
export async function renderOgCard() {
  const { site } = await getContent();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#171717",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            alignSelf: "flex-start",
            padding: "12px 24px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            fontSize: 24,
            color: "#EDEDED",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 999, background: site.available ? "#22C35F" : "#9C9C9C" }} />
          {site.availabilityLabel}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, letterSpacing: 6, lineHeight: 1 }}>{(site.firstName + " " + site.lastName).toUpperCase()}</div>
          <div style={{ marginTop: 30, fontSize: 46, color: "#EDEDED" }}>{site.role}</div>
          <div style={{ marginTop: 18, maxWidth: 960, fontSize: 28, lineHeight: 1.4, color: "#9C9C9C" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

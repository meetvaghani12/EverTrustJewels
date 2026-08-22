import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social share card. Individual product pages override this with the
 * product photograph via their own metadata.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A0A0A 0%, #2A1215 100%)",
          color: "#F5EDE3",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#8B1A2B",
          }}
        >
          Est. Diamonds
        </div>
        <div style={{ fontSize: 88, marginTop: 24, fontWeight: 300 }}>
          {SITE_CONFIG.name}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#A89585",
          }}
        >
          {SITE_CONFIG.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            width: 160,
            height: 2,
            background: "#8B1A2B",
          }}
        />
      </div>
    ),
    size
  );
}

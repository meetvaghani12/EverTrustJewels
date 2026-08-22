import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1A0A0A",
    theme_color: "#8B1A2B",
    icons: [{ src: "/icon.jpg", sizes: "512x512", type: "image/jpeg" }],
  };
}

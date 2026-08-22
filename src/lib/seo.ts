import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Canonical origin for the site. Override per-environment with
 * NEXT_PUBLIC_SITE_URL (e.g. a Vercel preview URL) — never leave a trailing slash.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://evertrustjewels.com"
).replace(/\/+$/, "");

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const BRAND_LOGO = "/images/brand/logo.jpg";

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/evertrust__jewels",
  "https://www.linkedin.com/company/evertrust-jewels",
  "https://facebook.com/share/14eBKf83T32",
];

/**
 * Trim a description to a length search engines will actually render
 * (~155 chars) without cutting mid-word.
 */
export function truncateDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\-\s]+$/, "")}…`;
}

interface BuildMetadataArgs {
  /** Page title WITHOUT the brand suffix — the root template appends it. */
  title: string;
  description: string;
  /** Site-relative path, used for the canonical tag. */
  path: string;
  /** Site-relative image paths. Falls back to the root opengraph-image. */
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

/**
 * Single source of truth for page metadata: title, description, canonical,
 * OpenGraph and Twitter cards all stay in sync.
 */
export function buildMetadata({
  title,
  description,
  path,
  images,
  type = "website",
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const desc = truncateDescription(description);
  const ogImages = images?.map((src) => ({ url: absoluteUrl(src) }));

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE_CONFIG.name,
      title: `${title} | ${SITE_CONFIG.name}`,
      description: desc,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description: desc,
      ...(ogImages ? { images: ogImages.map((i) => i.url) } : {}),
    },
  };
}

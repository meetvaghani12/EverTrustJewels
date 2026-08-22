import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getThemeClass } from "@/lib/theme";
import { SITE_CONFIG } from "@/lib/constants";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Required for canonical + OpenGraph URLs to resolve absolutely.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false },
  // Verification tokens come from the environment so they can differ per
  // deployment and are never committed. Absent vars simply emit nothing.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    url: SITE_URL,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeClass = getThemeClass();

  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable} ${themeClass}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-body antialiased">
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

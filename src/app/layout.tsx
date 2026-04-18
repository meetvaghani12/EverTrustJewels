import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getThemeClass } from "@/lib/theme";
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
  title: {
    default: "EverTrust Jewels — Timeless Brilliance, Trusted Forever",
    template: "%s | EverTrust Jewels",
  },
  description:
    "Discover exquisite diamonds handpicked for perfection. Every stone tells a story of brilliance, fire, and enduring trust.",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

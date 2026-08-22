import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDiamonds from "@/components/home/FeaturedDiamonds";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import BrandStory from "@/components/home/BrandStory";
import TrustBadges from "@/components/home/TrustBadges";
import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  // The root layout already supplies the default title/description; the home
  // page only needs its own canonical so "/" never resolves to a duplicate.
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { url: absoluteUrl("/"), title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}` },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense>
        <FeaturedDiamonds />
      </Suspense>
      <Suspense>
        <CategoryShowcase />
      </Suspense>
      <Suspense>
        <BrandStory />
      </Suspense>
      <Suspense>
        <TrustBadges />
      </Suspense>
    </>
  );
}

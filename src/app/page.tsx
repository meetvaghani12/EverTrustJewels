import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDiamonds from "@/components/home/FeaturedDiamonds";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import BrandStory from "@/components/home/BrandStory";
import TrustBadges from "@/components/home/TrustBadges";

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

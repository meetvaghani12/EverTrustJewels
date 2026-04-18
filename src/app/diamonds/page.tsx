import { Suspense } from "react";
import type { Metadata } from "next";
import DiamondsClient from "./DiamondsClient";

export const metadata: Metadata = {
  title: "Our Diamonds",
  description:
    "Explore our curated collection of GIA-certified diamonds. Filter by shape, carat, cut, clarity, color, and price.",
};

export default function DiamondsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm uppercase tracking-[0.15em] text-text-secondary">
            Loading diamonds...
          </p>
        </div>
      }
    >
      <DiamondsClient />
    </Suspense>
  );
}

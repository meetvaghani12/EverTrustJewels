"use client";

import { useInView } from "@/lib/useInView";
import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  const { ref: leftRef, inView: leftInView } = useInView();
  const { ref: rightRef, inView: rightInView } = useInView();

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Image Placeholder */}
          <div
            ref={leftRef}
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            }}
          >
            <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden border border-border">
              <Image
                src="/images/brand/fancy-bear.jpg"
                alt="EverTrust Jewels — Our Story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right — Text */}
          <div
            ref={rightRef}
            className="flex flex-col gap-6"
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
            }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-platinum">
              Our Legacy
            </p>

            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Crafted with Passion, Delivered with Trust
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>
                At EverTrust Jewels, every diamond is a promise. We source our
                stones exclusively through ethical channels, ensuring each gem
                meets the highest standards of responsible mining and fair trade
                practices.
              </p>
              <p>
                Our team of expert gemologists hand-selects every diamond for its
                unique fire, brilliance, and character. From classic solitaires
                to bespoke creations, we believe that timeless elegance should
                never be compromised.
              </p>
              <p>
                With decades of heritage in the diamond industry, we have built
                our reputation on one simple principle: your trust is our most
                precious asset.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-platinum"
              >
                Learn More
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

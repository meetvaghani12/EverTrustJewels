"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { categories } from "@/data/categories";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { DiamondShape } from "@/types/diamond";

export default function ShapesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Education", href: "/education" },
            { label: "Diamond Shapes" },
          ]}
        />

        <section className="mt-12 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Diamond Shapes
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary leading-relaxed">
            Each diamond shape has its own character and personality. The shape you choose
            is a reflection of your individual style.
          </p>
        </section>

        <div className="mt-16 space-y-12">
          {categories.map((cat, i) => {
            const shape = cat.shape.toLowerCase() as DiamondShape;
            return (
              <div
                key={cat.shape}
                className={`flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Diamond shape — video plays inline */}
                <div className="flex-shrink-0 md:w-1/3">
                  <div className="aspect-square w-full overflow-hidden border border-border">
                    <video
                      src={getShapeVideo(shape)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={getShapeImage(shape)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="font-heading text-2xl sm:text-3xl font-light">
                    {cat.label}
                  </h2>
                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {cat.longDescription}
                  </p>
                  <Link
                    href={`/diamonds?shapes=${cat.shape}`}
                    className="mt-6 inline-block text-sm uppercase tracking-[0.15em] text-foreground hover:underline"
                  >
                    View {cat.label} Diamonds &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-24 mb-16 text-center">
          <a
            href="/diamonds"
            className="inline-flex h-12 items-center justify-center bg-foreground px-8 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
          >
            Explore All Diamonds
          </a>
        </section>
      </div>
    </div>
  );
}

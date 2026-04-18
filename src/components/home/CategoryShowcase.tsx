"use client";

import { useInView } from "@/lib/useInView";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";

export default function CategoryShowcase() {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  return (
    <section className="bg-background-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={headingRef}
          className="mb-16 text-center"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-platinum">
            Find Your Shape
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Diamond Shapes
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <div
              key={cat.shape}
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease-out ${i * 0.06}s, transform 0.5s ease-out ${i * 0.06}s`,
              }}
            >
              <Link
                href={`/diamonds?shapes=${cat.shape.toLowerCase()}`}
                className="group flex flex-col items-center border border-border bg-card p-4 sm:p-6 text-center transition-all duration-300 hover:border-foreground"
              >
                {/* Diamond shape — video default, photo on hover */}
                <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full">
                  <HoverVideo
                    imageSrc={getShapeImage(cat.shape.toLowerCase() as any)}
                    videoSrc={getShapeVideo(cat.shape.toLowerCase() as any)}
                    alt={cat.label}
                    sizes="80px"
                    className="h-full w-full"
                  />
                </div>

                <h3 className="mb-2 font-heading text-base sm:text-lg font-semibold text-foreground">
                  {cat.label}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                  {cat.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

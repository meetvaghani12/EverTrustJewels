"use client";

import { useInView } from "@/lib/useInView";
import Link from "next/link";
import { diamonds } from "@/data/diamonds";
import { formatCarat, formatGrade } from "@/lib/formatters";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";

const featured = diamonds.filter((d) => d.isFeatured);

export default function FeaturedDiamonds() {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  return (
    <section className="py-24 lg:py-32">
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
            Handpicked Excellence
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Featured Collection
          </h2>
        </div>

        <div
          ref={gridRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {featured.map((diamond, i) => (
            <div
              key={diamond.id}
              className="min-w-[260px] snap-start sm:min-w-[280px] lg:min-w-0"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <Link
                href={`/diamonds/${diamond.slug}`}
                className="group flex h-full flex-col border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-foreground"
              >
                {/* Diamond — photo with video on hover */}
                <div className="relative mb-6 h-40 overflow-hidden bg-background">
                  <HoverVideo
                    imageSrc={getShapeImage(diamond.shape)}
                    videoSrc={getShapeVideo(diamond.shape)}
                    alt={diamond.title}
                    sizes="280px"
                    className="h-full w-full"
                  />
                </div>

                <h3 className="mb-2 font-heading text-lg font-light text-foreground">
                  {diamond.title}
                </h3>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-block border border-border px-2 py-0.5 text-xs uppercase tracking-wider text-text-secondary">
                    {formatCarat(diamond.caratWeight)}
                  </span>
                  <span className="inline-block border border-border px-2 py-0.5 text-xs uppercase tracking-wider text-text-secondary">
                    {formatGrade(diamond.cutGrade)}
                  </span>
                  <span className="inline-block border border-border px-2 py-0.5 text-xs uppercase tracking-wider text-text-secondary">
                    {diamond.clarity}
                  </span>
                </div>

                <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-secondary group-hover:text-foreground transition-colors">
                  View Details &rarr;
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

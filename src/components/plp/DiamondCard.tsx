"use client";

import Link from "next/link";
import { Diamond } from "@/types/diamond";
import { formatGrade } from "@/lib/formatters";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";

interface DiamondCardProps {
  diamond: Diamond;
}

export function DiamondCard({ diamond }: DiamondCardProps) {
  return (
    <Link
      href={`/diamonds/${diamond.slug}`}
      className="group block border border-border bg-card transition-all hover:border-foreground hover:shadow-lg"
    >
      {/* Image with video on hover */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-background to-ice-blue/10">
        <HoverVideo
          imageSrc={getShapeImage(diamond.shape)}
          videoSrc={getShapeVideo(diamond.shape)}
          alt={diamond.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-full w-full"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2 z-10">
          {diamond.isNew && (
            <span className="bg-foreground px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
              New
            </span>
          )}
          {diamond.isFeatured && (
            <span className="bg-platinum px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-light group-hover:text-foreground">
          {diamond.title}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs uppercase tracking-[0.1em] text-text-secondary">
            {formatGrade(diamond.shape)}
          </span>
        </div>

        <div className="mt-4">
          <span className="text-xs uppercase tracking-[0.1em] text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

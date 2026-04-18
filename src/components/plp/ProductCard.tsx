"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showYellow, setShowYellow] = useState(false);
  const currentImage = showYellow && product.imageYellow ? product.imageYellow : product.imageWhite;

  return (
    <Link
      href={`/jewelry/${product.slug}`}
      className="group block border border-border bg-card transition-all hover:border-foreground hover:shadow-lg"
    >
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-background to-ice-blue/10"
        onMouseEnter={() => setShowYellow(true)}
        onMouseLeave={() => setShowYellow(false)}
      >
        {currentImage && (
          <Image
            src={currentImage}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2 z-10">
          {product.isNew && (
            <span className="bg-foreground px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-platinum px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white">
              Bestseller
            </span>
          )}
        </div>
        {/* Metal toggle hint */}
        {product.imageYellow && (
          <div className="absolute right-3 bottom-3 flex gap-1.5 z-10">
            <span className={`h-4 w-4 rounded-full border-2 transition-all ${!showYellow ? "border-foreground scale-110" : "border-border"}`} style={{ background: "#E8E8E8" }} />
            <span className={`h-4 w-4 rounded-full border-2 transition-all ${showYellow ? "border-foreground scale-110" : "border-border"}`} style={{ background: "#D4A853" }} />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-sm sm:text-base font-light leading-snug group-hover:text-foreground line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {product.shape && (
            <span className="text-[11px] text-text-secondary uppercase tracking-wider">
              {product.shape.split(",")[0]}
            </span>
          )}
          {product.setting && (
            <>
              <span className="text-platinum">·</span>
              <span className="text-[11px] text-text-secondary uppercase tracking-wider">
                {product.setting.split(",")[0]}
              </span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.1em] text-text-secondary">
            {product.styleNumber}
          </span>
          <span className="text-xs uppercase tracking-[0.1em] text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

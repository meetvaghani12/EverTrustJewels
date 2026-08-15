"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/plp/ProductCard";
import { JewelryConfigurator } from "@/components/pdp/JewelryConfigurator";

export default function JewelryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [metal, setMetal] = useState<"white" | "yellow">("white");
  const [inquiryOpen, setInquiryOpen] = useState(false);

  if (!product) notFound();

  const currentImage = metal === "yellow" && product.imageYellow ? product.imageYellow : product.imageWhite;

  const similar = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category &&
        p.subCategory === product.subCategory
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Jewelry", href: "/jewelry" },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Left — Image */}
          <div className="lg:sticky lg:top-24">
            <div
              onClick={() => setInquiryOpen(true)}
              className="relative aspect-square w-full cursor-pointer overflow-hidden border border-border bg-gradient-to-br from-background to-ice-blue/10"
            >
              {currentImage && (
                <div className="relative h-full w-full">
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
              {/* Inquire hint */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/45 to-transparent py-3 text-[10px] uppercase tracking-[0.2em] text-white opacity-90">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/70 text-[9px]">
                  +
                </span>
                Click to inquire
              </div>
            </div>

            {/* Metal Toggle */}
            {product.imageYellow && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setMetal("white")}
                  className={`flex-1 flex items-center justify-center gap-2 border py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
                    metal === "white"
                      ? "border-foreground text-foreground"
                      : "border-border text-text-secondary hover:border-foreground"
                  }`}
                >
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#E8E8E8", border: "1px solid #ccc" }} />
                  White Gold
                </button>
                <button
                  onClick={() => setMetal("yellow")}
                  className={`flex-1 flex items-center justify-center gap-2 border py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
                    metal === "yellow"
                      ? "border-foreground text-foreground"
                      : "border-border text-text-secondary hover:border-foreground"
                  }`}
                >
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#D4A853", border: "1px solid #b89640" }} />
                  Yellow Gold
                </button>
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div>
            <div className="flex gap-2">
              {product.isNew && (
                <span className="border border-foreground px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                  New
                </span>
              )}
              {product.isBestSeller && (
                <span className="border border-platinum px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-platinum">
                  Bestseller
                </span>
              )}
              <span className="border border-border px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-text-secondary">
                {product.category}
              </span>
            </div>

            <h1 className="mt-4 font-heading text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
              {product.name}
            </h1>

            {/* Specs */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-text-secondary">
              {product.shape && <span>{product.shape}</span>}
              {product.setting && (
                <>
                  <span className="text-platinum">·</span>
                  <span>{product.setting}</span>
                </>
              )}
              {product.caratMin && (
                <>
                  <span className="text-platinum">·</span>
                  <span>{product.caratMin} - {product.caratMax} ct</span>
                </>
              )}
            </div>

            <div className="mt-4 text-xs text-text-secondary uppercase tracking-widest">
              Style: {product.styleNumber}
            </div>

            <div className="mt-8 border-t border-border" />

            {/* Description */}
            {product.description && (
              <div className="mt-8">
                <h2 className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
                  Description
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {product.description}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setInquiryOpen(true)}
                className="flex h-12 w-full items-center justify-center bg-foreground text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
              >
                Inquire About This Piece
              </button>
              <a
                href="/custom-order"
                className="flex h-12 w-full items-center justify-center border border-foreground text-sm uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-white"
              >
                Customize This Design
              </a>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-24">
            <h2 className="text-center font-heading text-2xl font-light">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-4 grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {inquiryOpen && (
        <JewelryConfigurator
          onClose={() => setInquiryOpen(false)}
          productName={product.name}
          category={product.category}
          styleNumber={product.styleNumber}
        />
      )}
    </div>
  );
}

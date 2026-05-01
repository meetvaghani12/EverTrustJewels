"use client";

import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { categories } from "@/data/categories";
import { diamonds } from "@/data/diamonds";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { DiamondShape } from "@/types/diamond";

const jewelryCategories = [
  {
    name: "Rings",
    slug: "rings",
    description: "Engagement rings, wedding bands, and fashion rings crafted with precision.",
    image: "/images/products/MS118A-6-white.jpg",
    count: 52,
  },
  {
    name: "Earrings",
    slug: "earrings",
    description: "Stud earrings, drop earrings, and hoops that capture the light beautifully.",
    image: "/images/products/ST991-white.jpg",
    count: 52,
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    description: "Tennis bracelets, bangles, and designer bracelets for every occasion.",
    image: "/images/products/SB704-white.jpg",
    count: 36,
  },
  {
    name: "pendant",
    slug: "pendant",
    description: "Diamond pendants, tennis pendant, and statement pieces that elevate any look.",
    image: "/images/products/SP137-white.jpg",
    count: 36,
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        />

        {/* Diamond Categories */}
        <section className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Shop by Shape
          </p>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Diamond Categories
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-text-secondary leading-relaxed">
            Each shape has its own unique character. Find the silhouette that speaks to you.
          </p>
        </section>

        <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const shape = cat.shape.toLowerCase() as DiamondShape;
            const count = diamonds.filter((d) => d.shape === cat.shape).length;
            return (
              <Link
                key={cat.shape}
                href={`/diamonds?shapes=${cat.shape}`}
                className="group border border-border bg-card overflow-hidden transition-all hover:border-foreground hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-background to-ice-blue/10">
                  <HoverVideo
                    imageSrc={getShapeImage(shape)}
                    videoSrc={getShapeVideo(shape)}
                    alt={`${cat.label} diamond`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <h2 className="font-heading text-lg sm:text-xl text-white">
                      {cat.label}
                    </h2>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.15em] text-platinum group-hover:text-foreground transition-colors">
                    Shop {cat.label} &rarr;
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Jewelry Categories */}
        <section className="mt-24 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Shop by Type
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Jewelry Collection
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-text-secondary leading-relaxed">
            From engagement rings to tennis bracelets — explore our curated collection.
          </p>
        </section>

        <div className="mt-12 mb-16 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {jewelryCategories.map((cat) => {
            return (
              <Link
                key={cat.slug}
                href={`/jewelry?category=${cat.slug}`}
                className="group border border-border bg-card overflow-hidden transition-all hover:border-foreground hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-background to-ice-blue/10">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <h2 className="font-heading text-lg sm:text-xl text-white">
                      {cat.name}
                    </h2>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.15em] text-platinum group-hover:text-foreground transition-colors">
                    {cat.count} pieces &rarr;
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

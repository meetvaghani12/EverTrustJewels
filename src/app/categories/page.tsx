import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/data/categories";
import { diamonds } from "@/data/diamonds";
import { products } from "@/data/products";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { JEWELRY_CATEGORIES } from "@/lib/catalog";
import { breadcrumbSchema, collectionSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { DiamondShape } from "@/types/diamond";

const CATEGORY_IMAGES: Record<string, string> = {
  rings: "/images/products/MS118A-6-white.jpg",
  earrings: "/images/products/ST991-white.jpg",
  bracelets: "/images/products/SB704-white.jpg",
  pendant: "/images/products/SP137-white.jpg",
};

const BREADCRUMBS = [{ label: "Home", href: "/" }, { label: "Categories" }];

export const metadata = buildMetadata({
  title: "Diamond Shapes & Jewelry Categories",
  description:
    "Shop diamonds by shape — round, princess, emerald, oval, cushion and more — or browse rings, earrings, bracelets and pendants from EverTrust Jewels.",
  path: "/categories",
});

export default function CategoriesPage() {
  // Counts are derived from the catalogue so the copy can never drift.
  const jewelryCategories = JEWELRY_CATEGORIES.map((category) => ({
    ...category,
    image: CATEGORY_IMAGES[category.slug],
    count: products.filter((product) => product.category === category.slug).length,
  }));

  return (
    <div className="min-h-screen">
      <JsonLd
        schema={[
          collectionSchema({
            name: "Diamond Shapes & Jewelry Categories",
            description:
              "Browse diamonds by shape and fine jewellery by category at EverTrust Jewels.",
            path: "/categories",
            items: [
              ...categories.map((category) => ({
                name: `${category.label} Diamonds`,
                url: `/diamonds?shapes=${category.shape}`,
              })),
              ...jewelryCategories.map((category) => ({
                name: category.label,
                url: `/jewelry?category=${category.slug}`,
              })),
            ],
          }),
          breadcrumbSchema(BREADCRUMBS),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={BREADCRUMBS} />

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
                    alt={`${cat.label} cut diamond`}
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
                    Shop {cat.label}
                    {count > 0 && ` (${count})`} &rarr;
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
          {jewelryCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/jewelry?category=${cat.slug}`}
              className="group border border-border bg-card overflow-hidden transition-all hover:border-foreground hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-background to-ice-blue/10">
                <Image
                  src={cat.image}
                  alt={`${cat.label} — diamond jewelry by EverTrust Jewels`}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                  <h3 className="font-heading text-lg sm:text-xl text-white">
                    {cat.label}
                  </h3>
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
          ))}
        </div>
      </div>
    </div>
  );
}

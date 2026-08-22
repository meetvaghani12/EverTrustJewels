import Link from "next/link";
import { products } from "@/data/products";
import { collections, productInCollection } from "@/data/collections";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { JEWELRY_CATEGORIES } from "@/lib/catalog";
import { breadcrumbSchema, collectionSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Jewelry", href: "/jewelry" },
  { label: "Collections" },
];

export const metadata = buildMetadata({
  title: "Jewelry Collections",
  description:
    "Every EverTrust Jewels collection in one place — engagement rings, tennis bracelets, diamond studs, pendants and more, each with a buying guide.",
  path: "/jewelry/collections",
});

export default function CollectionsHubPage() {
  const counts = new Map(
    collections.map((collection) => [
      collection.slug,
      products.filter((product) => productInCollection(product.subCategory, collection)).length,
    ])
  );

  return (
    <div className="min-h-screen">
      <JsonLd
        schema={[
          collectionSchema({
            name: "Jewelry Collections",
            description: "Every diamond jewellery collection offered by EverTrust Jewels.",
            path: "/jewelry/collections",
            items: collections.map((collection) => ({
              name: collection.label,
              url: `/jewelry/collections/${collection.slug}`,
            })),
          }),
          breadcrumbSchema(BREADCRUMBS),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={BREADCRUMBS} />

        <header className="mt-12 max-w-2xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Jewelry Collections
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            Each collection groups a single kind of piece, with a short guide to the
            decisions that matter for that style. Start where you already know what
            you want, or browse to work it out.
          </p>
        </header>

        {JEWELRY_CATEGORIES.map((category) => {
          const grouped = collections.filter((collection) => collection.category === category.slug);
          if (grouped.length === 0) return null;

          return (
            <section key={category.slug} className="mt-16">
              <div className="flex items-baseline justify-between border-b border-border pb-4">
                <h2 className="font-heading text-2xl font-light">{category.label}</h2>
                <Link
                  href={`/jewelry?category=${category.slug}`}
                  className="text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-foreground"
                >
                  View all &rarr;
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={`/jewelry/collections/${collection.slug}`}
                    className="group border border-border bg-card p-5 transition-all hover:border-foreground hover:shadow-lg"
                  >
                    <h3 className="font-heading text-lg font-light leading-snug">
                      {collection.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {collection.intro}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.15em] text-platinum transition-colors group-hover:text-foreground">
                      {counts.get(collection.slug) ?? 0} pieces &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="mb-16" />
      </div>
    </div>
  );
}

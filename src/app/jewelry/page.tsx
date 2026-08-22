import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/plp/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { JEWELRY_CATEGORIES, findJewelryCategory } from "@/lib/catalog";
import { collections, productInCollection } from "@/data/collections";
import { breadcrumbSchema, collectionSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/** Products per page — keeps page weight and crawl cost sane. */
const PAGE_SIZE = 48;

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

function resolve(searchParams: { category?: string; page?: string }) {
  const category = findJewelryCategory(searchParams.category);
  const filtered = category
    ? products.filter((product) => product.category === category.slug)
    : products;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const parsedPage = Number.parseInt(searchParams.page ?? "1", 10);
  const page = Number.isFinite(parsedPage) ? Math.min(Math.max(parsedPage, 1), totalPages) : 1;

  return {
    category,
    filtered,
    page,
    totalPages,
    /** True when the URL carried a category value that matches nothing. */
    unknownCategory: Boolean(searchParams.category) && !category,
    items: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  };
}

/** Site-relative URL for a given facet + page combination. */
function listingPath(categorySlug: string | undefined, page: number): string {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/jewelry?${query}` : "/jewelry";
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const { category, filtered, page, totalPages, unknownCategory } = resolve(resolved);

  const baseTitle = category ? `${category.label} — Diamond Jewelry` : "Jewelry Collection";
  const title = page > 1 ? `${baseTitle} — Page ${page} of ${totalPages}` : baseTitle;
  const description = category
    ? `Browse ${filtered.length} ${category.noun} from EverTrust Jewels. ${category.description}`
    : `Browse ${filtered.length} pieces of fine diamond jewelry — rings, earrings, bracelets, pendants and necklaces, each crafted to order.`;

  return buildMetadata({
    title,
    description,
    path: listingPath(category?.slug, page),
    // An unrecognised category value produces an empty, valueless page —
    // keep it out of the index while still letting crawlers follow links out.
    noIndex: unknownCategory,
  });
}

export default async function JewelryPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const { category, filtered, page, totalPages, items } = resolve(resolved);

  const heading = category ? `${category.label} Collection` : "Jewelry Collection";
  const relevantCollections = category
    ? collections.filter((collection) => collection.category === category.slug)
    : [];
  const collectionCounts = new Map(
    relevantCollections.map((collection) => [
      collection.slug,
      products.filter((product) => productInCollection(product.subCategory, collection)).length,
    ])
  );
  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...(category
      ? [{ label: "Jewelry", href: "/jewelry" }, { label: category.label }]
      : [{ label: "Jewelry" }]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd
        schema={[
          collectionSchema({
            name: heading,
            description: category?.description ?? "Fine diamond jewelry crafted to order.",
            path: listingPath(category?.slug, page),
            items: items.map((product) => ({
              name: product.name,
              url: `/jewelry/${product.slug}`,
            })),
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            {totalPages > 1 && ` — page ${page} of ${totalPages}`}
          </p>
          {category && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {category.description}
            </p>
          )}
        </div>

        {/* Category Tabs — links, so each facet is a crawlable, shareable URL */}
        <nav aria-label="Jewelry categories" className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {[{ slug: undefined, label: "All" }, ...JEWELRY_CATEGORIES].map((tab) => {
            const isActive = tab.slug === category?.slug;
            return (
              <Link
                key={tab.slug ?? "all"}
                href={listingPath(tab.slug, 1)}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 border px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-text-secondary hover:border-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Collection links — the long-tail landing pages for this facet.
            Only shown once a category is chosen: listing all 21 collections on
            the unfiltered view pushed the products themselves below the fold. */}
        {category && relevantCollections.length > 0 && (
          <section className="mt-8 border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Shop {category.label} by collection
              </h2>
              <Link
                href="/jewelry/collections"
                className="text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-foreground"
              >
                All collections &rarr;
              </Link>
            </div>

            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {relevantCollections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/jewelry/collections/${collection.slug}`}
                    className="group flex items-baseline justify-between gap-3 border-b border-border/60 py-2 text-sm text-text-secondary transition-colors hover:text-foreground"
                  >
                    <span>{collection.shortLabel}</span>
                    <span className="text-xs tabular-nums text-text-secondary/70 transition-colors group-hover:text-platinum">
                      {collectionCounts.get(collection.slug) ?? 0}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Unfiltered view: a single pointer to the hub keeps the collections
            reachable without burying the grid. */}
        {!category && (
          <p className="mt-8 border-t border-border pt-6 text-sm text-text-secondary">
            Looking for something specific?{" "}
            <Link
              href="/jewelry/collections"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Browse all 21 collections
            </Link>{" "}
            — engagement rings, tennis bracelets, studs and more, each with a buying guide.
          </p>
        )}

        {/* Product Grid */}
        <div className="mt-8 grid gap-4 grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-16 text-center text-sm text-text-secondary">
            No pieces found. <Link href="/jewelry" className="underline">View the full collection</Link>.
          </p>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-16 flex flex-wrap items-center justify-center gap-2"
          >
            {page > 1 && (
              <Link
                href={listingPath(category?.slug, page - 1)}
                rel="prev"
                className="border border-border px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-foreground"
              >
                &larr; Previous
              </Link>
            )}
            <span className="px-4 text-xs uppercase tracking-[0.15em] text-text-secondary">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={listingPath(category?.slug, page + 1)}
                rel="next"
                className="border border-border px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-foreground"
              >
                Next &rarr;
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}

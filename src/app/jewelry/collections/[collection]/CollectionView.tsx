import Link from "next/link";
import { products } from "@/data/products";
import { collections, productInCollection, type Collection } from "@/data/collections";
import { ProductCard } from "@/components/plp/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { findJewelryCategory } from "@/lib/catalog";
import { breadcrumbSchema, collectionSchema } from "@/lib/schema";

export const PAGE_SIZE = 48;

/** Members of a collection, in catalogue order. */
export function membersOf(collection: Collection) {
  return products.filter((product) => productInCollection(product.subCategory, collection));
}

export function pageCount(collection: Collection): number {
  return Math.max(1, Math.ceil(membersOf(collection).length / PAGE_SIZE));
}

/**
 * Pagination lives in the path rather than a query string, so page 1 of every
 * collection can be statically prerendered and each page is a clean, crawlable
 * URL: /jewelry/collections/tennis-bracelets/page/2
 */
export function collectionPath(slug: string, page: number): string {
  return page > 1
    ? `/jewelry/collections/${slug}/page/${page}`
    : `/jewelry/collections/${slug}`;
}

export function CollectionView({
  collection,
  page,
}: {
  collection: Collection;
  page: number;
}) {
  const members = membersOf(collection);
  const totalPages = pageCount(collection);
  const items = members.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const parentCategory = findJewelryCategory(collection.category);
  const siblings = collections.filter(
    (other) => other.category === collection.category && other.slug !== collection.slug
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Jewelry", href: "/jewelry" },
    { label: "Collections", href: "/jewelry/collections" },
    ...(parentCategory
      ? [{ label: parentCategory.label, href: `/jewelry?category=${parentCategory.slug}` }]
      : []),
    ...(page > 1
      ? [
          { label: collection.label, href: collectionPath(collection.slug, 1) },
          { label: `Page ${page}` },
        ]
      : [{ label: collection.label }]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd
        schema={[
          collectionSchema({
            name: collection.label,
            description: collection.intro,
            path: collectionPath(collection.slug, page),
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

        <header className="mt-8 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight">
            {collection.label}
            {page > 1 && (
              <span className="text-text-secondary"> — Page {page}</span>
            )}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {members.length} {members.length === 1 ? "piece" : "pieces"}
            {totalPages > 1 && ` — page ${page} of ${totalPages}`}
          </p>
          {/* The editorial intro belongs on page 1 only; repeating it across
              paginated pages would make them near-duplicates. */}
          {page === 1 && (
            <p className="mt-6 text-sm leading-relaxed text-text-secondary">
              {collection.intro}
            </p>
          )}
        </header>

        {page === 1 && (
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary">
              What to consider
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {collection.buyingPoints.map((point) => (
                <li
                  key={point}
                  className="border-l-2 border-border pl-4 text-sm leading-relaxed text-text-secondary"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 grid gap-4 grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-16 flex flex-wrap items-center justify-center gap-2"
          >
            {page > 1 && (
              <Link
                href={collectionPath(collection.slug, page - 1)}
                rel="prev"
                className="border border-border px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-foreground"
              >
                &larr; Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={collectionPath(collection.slug, n)}
                aria-current={n === page ? "page" : undefined}
                className={`border px-4 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                  n === page
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-text-secondary hover:border-foreground"
                }`}
              >
                {n}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={collectionPath(collection.slug, page + 1)}
                rel="next"
                className="border border-border px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-foreground"
              >
                Next &rarr;
              </Link>
            )}
          </nav>
        )}

        {siblings.length > 0 && (
          <section className="mt-24 mb-16 border-t border-border pt-12">
            <h2 className="font-heading text-2xl font-light">
              More {parentCategory?.label ?? "Collections"}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/jewelry/collections/${sibling.slug}`}
                  className="border border-border px-4 py-2.5 text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
                >
                  {sibling.shortLabel}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

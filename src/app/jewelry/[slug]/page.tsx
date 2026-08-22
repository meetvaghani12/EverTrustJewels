import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { JsonLd } from "@/components/seo/JsonLd";
import { findJewelryCategory, isPlaceholderProduct, uniqueProductSlugs } from "@/lib/catalog";
import { collections, productInCollection } from "@/data/collections";
import { breadcrumbSchema, jewelryProductSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import JewelryDetailClient from "./JewelryDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-render every product page at build time so crawlers get complete HTML
 * (title, description, copy and JSON-LD) without executing JavaScript.
 */
export function generateStaticParams() {
  // Deduplicated: the catalogue contains a handful of colliding slugs.
  return uniqueProductSlugs(products).map((slug) => ({ slug }));
}

function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Composes a descriptive, non-duplicated title from the product attributes. */
function titleFor(product: NonNullable<ReturnType<typeof getProduct>>): string {
  const parts = [product.name];
  if (product.styleNumber) parts.push(`Style ${product.styleNumber}`);
  return parts.join(" — ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product Not Found", robots: { index: false, follow: false } };
  }

  const category = findJewelryCategory(product.category);
  const images = [product.imageWhite, product.imageYellow].filter(Boolean);

  return buildMetadata({
    title: titleFor(product),
    description:
      product.description ||
      `${product.name} — handcrafted ${category?.noun ?? "fine jewellery"} from EverTrust Jewels.`,
    path: `/jewelry/${product.slug}`,
    images: images.length ? images : undefined,
    // "Coming Soon" placeholders have no content worth ranking.
    noIndex: isPlaceholderProduct(product),
  });
}

export default async function JewelryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  // Server-side 404 returns a real HTTP 404 status rather than a soft 404.
  if (!product) notFound();

  const similar = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category &&
        p.subCategory === product.subCategory
    )
    .slice(0, 4);

  const parentCategory = findJewelryCategory(product.category);
  const collection = collections.find((c) => productInCollection(product.subCategory, c));

  // A full trail links each product up through its category and collection,
  // which is what spreads authority into the long-tail landing pages.
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Jewelry", href: "/jewelry" },
    ...(parentCategory
      ? [{ label: parentCategory.label, href: `/jewelry?category=${parentCategory.slug}` }]
      : []),
    ...(collection
      ? [{ label: collection.label, href: `/jewelry/collections/${collection.slug}` }]
      : []),
    { label: product.name },
  ];

  return (
    <>
      <JsonLd
        schema={[
          jewelryProductSchema(product),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
      <JewelryDetailClient product={product} similar={similar} breadcrumbs={breadcrumbs} />
    </>
  );
}

import type { Product, ProductCategory } from "@/types/product";

export interface JewelryCategory {
  slug: ProductCategory;
  /** Customer-facing label used in UI and page titles. */
  label: string;
  /** Plural noun used in metadata copy. */
  noun: string;
  description: string;
}

/**
 * Shared definition of the four jewellery categories. Single source of truth
 * for the listing tabs, category landing pages, metadata and the sitemap.
 */
export const JEWELRY_CATEGORIES: JewelryCategory[] = [
  {
    slug: "rings",
    label: "Rings",
    noun: "diamond rings",
    description:
      "Engagement rings, wedding bands, and fashion rings crafted with precision.",
  },
  {
    slug: "earrings",
    label: "Earrings",
    noun: "diamond earrings",
    description:
      "Stud earrings, drop earrings, and hoops that capture the light beautifully.",
  },
  {
    slug: "bracelets",
    label: "Bracelets",
    noun: "diamond bracelets",
    description:
      "Tennis bracelets, bangles, and designer bracelets for every occasion.",
  },
  {
    slug: "pendant",
    label: "Pendants & Necklaces",
    noun: "diamond pendants and necklaces",
    description:
      "Diamond pendants, tennis necklaces, and statement pieces that elevate any look.",
  },
];

export function findJewelryCategory(slug: string | undefined): JewelryCategory | undefined {
  return JEWELRY_CATEGORIES.find((category) => category.slug === slug);
}

/** Names used as filler in the catalogue data — never index these. */
const PLACEHOLDER_NAMES = new Set(["", "coming soon", "tbd", "n/a"]);

export function isPlaceholderProduct(product: Product): boolean {
  return PLACEHOLDER_NAMES.has(product.name.trim().toLowerCase());
}

/**
 * Products that deserve a place in the index: real entries, each reachable at
 * a unique URL.
 *
 * The catalogue currently contains 4 duplicated slugs, so 3 real products and
 * 2 "Coming Soon" placeholders share URLs with another record. `products.find`
 * only ever resolves the first, which makes the later ones unreachable — so
 * they are excluded here rather than being advertised in the sitemap as URLs
 * that serve someone else's content. Fixing this properly means making the
 * slugs unique in the source data.
 */
export function indexableProducts(all: Product[]): Product[] {
  const seen = new Set<string>();
  return all.filter((product) => {
    if (isPlaceholderProduct(product)) return false;
    if (seen.has(product.slug)) return false;
    seen.add(product.slug);
    return true;
  });
}

/** Every distinct slug that should be pre-rendered, placeholders included. */
export function uniqueProductSlugs(all: Product[]): string[] {
  return [...new Set(all.map((product) => product.slug))];
}

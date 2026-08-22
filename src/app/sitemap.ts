import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { diamonds } from "@/data/diamonds";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { collectionPath, pageCount } from "@/app/jewelry/collections/[collection]/CollectionView";
import { JEWELRY_CATEGORIES, indexableProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: Entry[] = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/diamonds"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/jewelry"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/categories"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/jewelry/collections"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/education"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/education/four-cs"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/education/shapes"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/custom-order"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
  ];

  // Single-facet listing URLs are real landing pages: they are linked from the
  // nav/footer and carry self-referencing canonicals. Multi-facet combinations
  // are noindexed and deliberately left out.
  const shapeListings: Entry[] = categories.map((category) => ({
    url: absoluteUrl(`/diamonds?shapes=${category.shape}`),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const jewelryListings: Entry[] = JEWELRY_CATEGORIES.map((category) => ({
    url: absoluteUrl(`/jewelry?category=${category.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Collection landing pages carry original editorial copy, so they rank on
  // their own terms rather than as thin filtered views.
  const collectionPages: Entry[] = collections.flatMap((collection) =>
    Array.from({ length: pageCount(collection) }, (_, i) => ({
      url: absoluteUrl(collectionPath(collection.slug, i + 1)),
      changeFrequency: "weekly" as const,
      // Page 1 carries the editorial copy, so it outranks its own pagination.
      priority: i === 0 ? 0.8 : 0.5,
    }))
  );

  const diamondPages: Entry[] = diamonds.map((diamond) => ({
    url: absoluteUrl(`/diamonds/${diamond.slug}`),
    lastModified: new Date(diamond.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productPages: Entry[] = indexableProducts(products).map((product) => ({
    url: absoluteUrl(`/jewelry/${product.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...jewelryListings,
    ...collectionPages,
    ...shapeListings,
    ...diamondPages,
    ...productPages,
  ].map((entry) => ({ lastModified: now, ...entry }));
}

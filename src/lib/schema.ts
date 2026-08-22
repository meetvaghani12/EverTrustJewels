import { SITE_CONFIG } from "@/lib/constants";
import { absoluteUrl, BRAND_LOGO, SITE_URL, SOCIAL_PROFILES, truncateDescription } from "@/lib/seo";
import type { Product } from "@/types/product";
import type { Diamond } from "@/types/diamond";
import { formatGrade } from "@/lib/formatters";

/** Minimal shape for a JSON-LD node. */
export type JsonLdNode = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_CONFIG.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_LOGO),
    },
    description: SITE_CONFIG.description,
    slogan: SITE_CONFIG.tagline,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    sameAs: SOCIAL_PROFILES,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.phone,
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export function breadcrumbSchema(items: BreadcrumbEntry[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  rings: "Rings",
  earrings: "Earrings",
  bracelets: "Bracelets",
  pendant: "Pendants & Necklaces",
};

/**
 * Product schema for a jewellery piece.
 *
 * NOTE: `offers` is deliberately omitted. Prices are not displayed anywhere in
 * the UI, and Google requires structured data to reflect visible page content.
 * Once real, displayed prices exist, add an Offer node with priceCurrency.
 * `aggregateRating` is also omitted — the `rating` field in the dataset is
 * synthetic (values include 0/1/2 with no review count), and publishing
 * fabricated ratings breaches Google's structured-data policy.
 */
export function jewelryProductSchema(product: Product): JsonLdNode {
  const images = [product.imageWhite, product.imageYellow]
    .filter(Boolean)
    .map((src) => absoluteUrl(src));

  const additionalProperty: JsonLdNode[] = [];
  if (product.shape) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Diamond Shape",
      value: product.shape,
    });
  }
  if (product.setting) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Setting",
      value: product.setting,
    });
  }
  if (product.caratMin !== null) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Carat Weight Range",
      value:
        product.caratMax !== null && product.caratMax !== product.caratMin
          ? `${product.caratMin} - ${product.caratMax} ct`
          : `${product.caratMin} ct`,
    });
  }

  return {
    "@type": "Product",
    "@id": `${absoluteUrl(`/jewelry/${product.slug}`)}#product`,
    name: product.name,
    url: absoluteUrl(`/jewelry/${product.slug}`),
    description: truncateDescription(product.description, 300),
    sku: product.styleNumber,
    mpn: product.styleNumber,
    category: CATEGORY_LABEL[product.category] ?? product.category,
    brand: { "@type": "Brand", name: SITE_CONFIG.name },
    seller: { "@id": ORGANIZATION_ID },
    ...(images.length ? { image: images } : {}),
    ...(additionalProperty.length ? { additionalProperty } : {}),
  };
}

/** Product schema for a certified loose diamond. */
export function diamondProductSchema(diamond: Diamond): JsonLdNode {
  const url = absoluteUrl(`/diamonds/${diamond.slug}`);
  const additionalProperty: JsonLdNode[] = [
    { "@type": "PropertyValue", name: "Shape", value: formatGrade(diamond.shape) },
    { "@type": "PropertyValue", name: "Carat Weight", value: `${diamond.caratWeight} ct` },
    { "@type": "PropertyValue", name: "Cut Grade", value: formatGrade(diamond.cutGrade) },
    { "@type": "PropertyValue", name: "Clarity", value: diamond.clarity },
    { "@type": "PropertyValue", name: "Color", value: diamond.color },
    { "@type": "PropertyValue", name: "Polish", value: formatGrade(diamond.polish) },
    { "@type": "PropertyValue", name: "Symmetry", value: formatGrade(diamond.symmetry) },
    { "@type": "PropertyValue", name: "Fluorescence", value: formatGrade(diamond.fluorescence) },
    {
      "@type": "PropertyValue",
      name: "Certificate",
      value: `${diamond.certificate.lab} ${diamond.certificate.number}`,
    },
  ];

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: diamond.title,
    url,
    description: truncateDescription(diamond.metaDescription, 300),
    sku: diamond.id,
    category: "Loose Diamonds",
    brand: { "@type": "Brand", name: SITE_CONFIG.name },
    seller: { "@id": ORGANIZATION_ID },
    ...(diamond.images.length
      ? { image: diamond.images.map((src) => absoluteUrl(src)) }
      : {}),
    additionalProperty,
  };
}

/** CollectionPage + ItemList for a listing page. */
export function collectionSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; url: string }[];
}): JsonLdNode {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collection`,
    name,
    description: truncateDescription(description),
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.url),
      })),
    },
  };
}

export function faqSchema(entries: { question: string; answer: string }[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/**
 * Article schema for the education guides. Note we deliberately do NOT emit
 * FAQPage on these pages: Google requires FAQ markup to mirror a visible
 * question-and-answer block, and the guides are prose, not Q&A.
 */
export function articleSchema({
  headline,
  description,
  path,
  section,
}: {
  headline: string;
  description: string;
  path: string;
  section?: string;
}): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description: truncateDescription(description, 300),
    url,
    mainEntityOfPage: url,
    ...(section ? { articleSection: section } : {}),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
}

/** A standalone ItemList, for guides that enumerate linked entries. */
export function itemListSchema(items: { name: string; url: string; description?: string }[]): JsonLdNode {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
      ...(item.description ? { description: truncateDescription(item.description, 200) } : {}),
    })),
  };
}

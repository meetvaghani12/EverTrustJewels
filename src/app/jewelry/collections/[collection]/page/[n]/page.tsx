import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, findCollection } from "@/data/collections";
import { buildMetadata } from "@/lib/seo";
import { CollectionView, collectionPath, membersOf, pageCount } from "../../CollectionView";

interface PageProps {
  params: Promise<{ collection: string; n: string }>;
}

/**
 * Only pages 2..N exist as routes — page 1 is the bare collection URL, so a
 * /page/1 variant is never generated and can never duplicate it.
 */
export function generateStaticParams() {
  return collections.flatMap((collection) =>
    Array.from({ length: pageCount(collection) - 1 }, (_, i) => ({
      collection: collection.slug,
      n: String(i + 2),
    }))
  );
}

function resolve(slug: string, rawPage: string) {
  const collection = findCollection(slug);
  if (!collection) return null;

  const page = Number.parseInt(rawPage, 10);
  // Reject page 1 and anything out of range rather than serving a duplicate.
  if (!Number.isInteger(page) || page < 2 || page > pageCount(collection)) return null;

  return { collection, page };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection: slug, n } = await params;
  const resolved = resolve(slug, n);

  if (!resolved) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const { collection, page } = resolved;
  const totalPages = pageCount(collection);

  return buildMetadata({
    title: `${collection.label} — Page ${page} of ${totalPages}`,
    description: `Page ${page} of ${membersOf(collection).length} ${collection.metaNoun} made to order by EverTrust Jewels.`,
    path: collectionPath(collection.slug, page),
  });
}

export default async function CollectionPaginatedPage({ params }: PageProps) {
  const { collection: slug, n } = await params;
  const resolved = resolve(slug, n);

  if (!resolved) notFound();

  return <CollectionView collection={resolved.collection} page={resolved.page} />;
}

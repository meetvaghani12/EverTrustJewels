import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, findCollection } from "@/data/collections";
import { buildMetadata } from "@/lib/seo";
import { CollectionView, collectionPath, membersOf } from "./CollectionView";

interface PageProps {
  params: Promise<{ collection: string }>;
}

export function generateStaticParams() {
  return collections.map((collection) => ({ collection: collection.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = findCollection(slug);

  if (!collection) {
    return { title: "Collection Not Found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: collection.label,
    description: `${membersOf(collection).length} ${collection.metaNoun} made to order by EverTrust Jewels. ${collection.buyingPoints[0]}`,
    path: collectionPath(collection.slug, 1),
  });
}

export default async function CollectionLandingPage({ params }: PageProps) {
  const { collection: slug } = await params;
  const collection = findCollection(slug);

  if (!collection) notFound();

  return <CollectionView collection={collection} page={1} />;
}

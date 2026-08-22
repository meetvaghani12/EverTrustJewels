import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { diamonds } from "@/data/diamonds";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, diamondProductSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatGrade } from "@/lib/formatters";
import DiamondDetailClient from "./DiamondDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return diamonds.map((diamond) => ({ slug: diamond.slug }));
}

function getDiamond(slug: string) {
  return diamonds.find((diamond) => diamond.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const diamond = getDiamond(slug);

  if (!diamond) {
    return { title: "Diamond Not Found", robots: { index: false, follow: false } };
  }

  // The dataset already carries hand-written meta copy — prefer it, and fall
  // back to a spec-derived description so no page is ever left without one.
  const description =
    diamond.metaDescription ||
    `${diamond.caratWeight} ct ${formatGrade(diamond.shape)} cut diamond, ${diamond.color} colour, ${diamond.clarity} clarity, ${diamond.certificate.lab} certified.`;

  return buildMetadata({
    title: diamond.metaTitle || diamond.title,
    description,
    path: `/diamonds/${diamond.slug}`,
    images: diamond.images.length ? diamond.images : undefined,
  });
}

export default async function DiamondDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const diamond = getDiamond(slug);

  if (!diamond) notFound();

  const similar = diamonds
    .filter(
      (d) =>
        d.id !== diamond.id &&
        (d.shape === diamond.shape ||
          Math.abs(d.caratWeight - diamond.caratWeight) < 0.5)
    )
    .slice(0, 4);

  return (
    <>
      <JsonLd
        schema={[
          diamondProductSchema(diamond),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Diamonds", href: "/diamonds" },
            { label: diamond.title },
          ]),
        ]}
      />
      <DiamondDetailClient
        diamond={diamond}
        similar={similar}
        shapeLabel={formatGrade(diamond.shape)}
      />
    </>
  );
}

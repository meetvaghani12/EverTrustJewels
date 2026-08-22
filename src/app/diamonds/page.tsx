import { Suspense } from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/data/categories";
import { diamonds } from "@/data/diamonds";
import { breadcrumbSchema, collectionSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import DiamondsClient from "./DiamondsClient";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Params that only re-sort or re-slice the same set — never their own page. */
const NON_CANONICAL_PARAMS = ["sort", "caratMin", "caratMax", "cuts", "clarities", "colors", "priceMin", "priceMax"];

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Decides how a faceted /diamonds URL should be treated for indexing.
 *
 * A single shape facet (e.g. ?shapes=round) is a genuine landing page: it is
 * linked from the nav and footer and gets its own title and canonical.
 * Anything more specific — several shapes, or a shape plus grade/price filters
 * — produces near-duplicate thin pages, so it is noindexed and canonicalised
 * back to the shape landing page (or the bare listing).
 */
function resolveFacet(params: Record<string, string | string[] | undefined>) {
  const shapesParam = firstValue(params.shapes);
  const shapes = shapesParam ? shapesParam.split(",").filter(Boolean) : [];
  const hasExtraFilters = NON_CANONICAL_PARAMS.some((key) => {
    const value = firstValue(params[key]);
    return Boolean(value) && key !== "sort";
  });

  const singleShape =
    shapes.length === 1
      ? categories.find((category) => category.shape === shapes[0])
      : undefined;

  const isCanonicalFacet = Boolean(singleShape) && !hasExtraFilters && shapes.length === 1;
  const isBareListing = shapes.length === 0 && !hasExtraFilters;

  return {
    singleShape,
    // Everything that is neither the bare listing nor a clean single-shape
    // facet gets kept out of the index.
    noIndex: !isBareListing && !isCanonicalFacet,
    canonicalPath: isCanonicalFacet
      ? `/diamonds?shapes=${singleShape!.shape}`
      : singleShape
        ? `/diamonds?shapes=${singleShape.shape}`
        : "/diamonds",
  };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const { singleShape, noIndex, canonicalPath } = resolveFacet(params);

  if (singleShape) {
    const count = diamonds.filter((diamond) => diamond.shape === singleShape.shape).length;
    return buildMetadata({
      title: `${singleShape.label} Cut Diamonds`,
      description: `${count > 0 ? `${count} certified ` : "Certified "}${singleShape.label.toLowerCase()} cut diamonds. ${singleShape.description}. Filter by carat, cut, clarity and colour at EverTrust Jewels.`,
      path: canonicalPath,
      noIndex,
    });
  }

  return buildMetadata({
    title: "Our Diamonds",
    description:
      "Explore our curated collection of certified diamonds. Filter by shape, carat, cut, clarity, colour and price.",
    path: canonicalPath,
    noIndex,
  });
}

export default async function DiamondsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { singleShape, canonicalPath } = resolveFacet(params);

  const listed = singleShape
    ? diamonds.filter((diamond) => diamond.shape === singleShape.shape)
    : diamonds;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...(singleShape
      ? [{ label: "Diamonds", href: "/diamonds" }, { label: `${singleShape.label} Cut` }]
      : [{ label: "Diamonds" }]),
  ];

  return (
    <>
      <JsonLd
        schema={[
          collectionSchema({
            name: singleShape ? `${singleShape.label} Cut Diamonds` : "Our Diamonds",
            description: singleShape
              ? singleShape.longDescription
              : "Certified loose diamonds curated by EverTrust Jewels.",
            path: canonicalPath,
            items: listed.map((diamond) => ({
              name: diamond.title,
              url: `/diamonds/${diamond.slug}`,
            })),
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm uppercase tracking-[0.15em] text-text-secondary">
              Loading diamonds...
            </p>
          </div>
        }
      >
        <DiamondsClient
          heading={singleShape ? `${singleShape.label} Cut Diamonds` : "Our Diamonds"}
          intro={singleShape ? singleShape.longDescription : undefined}
          breadcrumbs={breadcrumbs}
        />
      </Suspense>
    </>
  );
}

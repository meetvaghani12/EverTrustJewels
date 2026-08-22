import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/data/categories";
import { getShapeImage, getShapeVideo } from "@/lib/diamondAssets";
import { HoverVideo } from "@/components/ui/HoverVideo";
import { articleSchema, breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { DiamondShape } from "@/types/diamond";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Education", href: "/education" },
  { label: "Diamond Shapes" },
];

export const metadata = buildMetadata({
  title: "Diamond Shapes Guide",
  description:
    "A guide to all ten diamond shapes — round brilliant, princess, emerald, oval, cushion, pear, marquise, radiant, asscher and heart — and how each one handles light.",
  path: "/education/shapes",
});

export default function ShapesPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        schema={[
          articleSchema({
            headline: "Diamond Shapes Guide",
            description:
              "How each of the ten diamond shapes is cut, how it handles light, and which style it suits.",
            path: "/education/shapes",
            section: "Diamond Education",
          }),
          itemListSchema(
            categories.map((cat) => ({
              name: `${cat.label} Cut Diamond`,
              url: `/diamonds?shapes=${cat.shape}`,
              description: cat.description,
            }))
          ),
          breadcrumbSchema(BREADCRUMBS),
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={BREADCRUMBS} />

        <section className="mt-12 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Diamond Shapes
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary leading-relaxed">
            Each diamond shape has its own character and personality. The shape you choose
            is a reflection of your individual style.
          </p>
        </section>

        <div className="mt-16 space-y-12">
          {categories.map((cat, i) => {
            const shape = cat.shape.toLowerCase() as DiamondShape;
            return (
              <div
                key={cat.shape}
                className={`flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Diamond shape — video plays inline */}
                <div className="flex-shrink-0 md:w-1/3">
                  {/* Lazy, in-view playback: this page shows ten shapes, and
                      autoplaying all of them on load pulled the entire video
                      set down at once. */}
                  <div className="aspect-square w-full overflow-hidden border border-border">
                    <HoverVideo
                      imageSrc={getShapeImage(shape)}
                      videoSrc={getShapeVideo(shape)}
                      alt={`${cat.label} cut diamond`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="font-heading text-2xl sm:text-3xl font-light">
                    {cat.label}
                  </h2>
                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {cat.longDescription}
                  </p>
                  <Link
                    href={`/diamonds?shapes=${cat.shape}`}
                    className="mt-6 inline-block text-sm uppercase tracking-[0.15em] text-foreground hover:underline"
                  >
                    View {cat.label} Diamonds &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-24 mb-16 text-center">
          <Link
            href="/diamonds"
            className="inline-flex h-12 items-center justify-center bg-foreground px-8 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
          >
            Explore All Diamonds
          </Link>
        </section>
      </div>
    </div>
  );
}

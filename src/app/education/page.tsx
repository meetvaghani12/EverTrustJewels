import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Diamond Education",
  description:
    "Learn everything about diamonds — the 4Cs, shapes, and how to choose the perfect stone. Expert guidance from EverTrust Jewels.",
};

export default function EducationPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Education" }]} />

        <section className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Diamond Knowledge
          </p>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Diamond Education
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary leading-relaxed">
            Understanding diamonds empowers you to make the perfect choice. Explore our
            guides to learn what makes each stone unique.
          </p>
        </section>

        <section className="mt-10 sm:mt-16 grid gap-4 sm:gap-8 md:grid-cols-2">
          <Link
            href="/education/four-cs"
            className="group border border-border bg-card p-10 transition-all hover:border-foreground"
          >
            <p className="text-sm uppercase tracking-[0.15em] text-text-secondary">
              Guide 01
            </p>
            <h2 className="mt-4 font-heading text-3xl font-light">The 4Cs</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Cut, Clarity, Color, and Carat — the four characteristics that determine a
              diamond&apos;s quality and value. Learn how each factor influences brilliance
              and price.
            </p>
            <span className="mt-6 inline-block text-sm uppercase tracking-[0.15em] text-foreground group-hover:underline">
              Read Guide &rarr;
            </span>
          </Link>

          <Link
            href="/education/shapes"
            className="group border border-border bg-card p-10 transition-all hover:border-foreground"
          >
            <p className="text-sm uppercase tracking-[0.15em] text-text-secondary">
              Guide 02
            </p>
            <h2 className="mt-4 font-heading text-3xl font-light">Diamond Shapes</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              From the classic round brilliant to the romantic heart — each shape has its
              own character and charm. Find the silhouette that speaks to you.
            </p>
            <span className="mt-6 inline-block text-sm uppercase tracking-[0.15em] text-foreground group-hover:underline">
              Read Guide &rarr;
            </span>
          </Link>
        </section>

        {/* Quick 4Cs Overview */}
        <section className="mt-24">
          <h2 className="text-center font-heading text-3xl font-light">
            The Four Pillars of Diamond Quality
          </h2>
          <div className="mt-8 sm:mt-12 grid gap-6 grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {[
              {
                letter: "C",
                title: "Cut",
                description:
                  "How well a diamond is cut determines its brilliance. A superior cut unleashes the stone's fire and sparkle.",
              },
              {
                letter: "C",
                title: "Clarity",
                description:
                  "The absence of inclusions and blemishes. Higher clarity means a purer, more valuable diamond.",
              },
              {
                letter: "C",
                title: "Color",
                description:
                  "The finest diamonds are colorless. The D-Z scale measures the degree of color present in a stone.",
              },
              {
                letter: "C",
                title: "Carat",
                description:
                  "A diamond's weight, not its size. One carat equals 200 milligrams. Larger diamonds are rarer and more valuable.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-border">
                  <span className="font-heading text-2xl">{item.letter}</span>
                </div>
                <h3 className="mt-4 font-heading text-xl">{item.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 mb-16 text-center">
          <p className="text-text-secondary">
            Ready to find your perfect diamond?
          </p>
          <a
            href="/diamonds"
            className="mt-6 inline-flex h-12 items-center justify-center bg-foreground px-8 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
          >
            Explore Collection
          </a>
        </section>
      </div>
    </div>
  );
}

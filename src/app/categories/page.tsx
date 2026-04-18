import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { categories } from "@/data/categories";
import { diamonds } from "@/data/diamonds";

export const metadata: Metadata = {
  title: "Diamond Categories",
  description:
    "Browse diamonds by shape — Round, Princess, Emerald, Oval, Cushion, Pear, Marquise, Radiant, Asscher, and Heart.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        />

        <section className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Shop by Shape
          </p>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-light tracking-tight">
            Diamond Categories
          </h1>
        </section>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = diamonds.filter((d) => d.shape === cat.shape).length;
            return (
              <Link
                key={cat.shape}
                href={`/diamonds?shapes=${cat.shape}`}
                className="group border border-border bg-card p-8 transition-all hover:border-foreground"
              >
                {/* Shape placeholder */}
                <div className="flex h-32 items-center justify-center">
                  <span className="font-heading text-4xl text-platinum capitalize group-hover:text-foreground transition-colors">
                    {cat.shape}
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-xl text-center">
                  {cat.label}
                </h2>
                <p className="mt-2 text-sm text-text-secondary text-center">
                  {cat.description}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.15em] text-text-secondary text-center">
                  {count} {count === 1 ? "diamond" : "diamonds"} available
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

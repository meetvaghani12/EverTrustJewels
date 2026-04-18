"use client";

import { notFound, useParams } from "next/navigation";
import { diamonds } from "@/data/diamonds";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DiamondViewer } from "@/components/pdp/DiamondViewer";
import { SpecsTable } from "@/components/pdp/SpecsTable";
import { InquiryCTA } from "@/components/pdp/InquiryCTA";
import { SimilarDiamonds } from "@/components/pdp/SimilarDiamonds";
import { formatCarat, formatGrade } from "@/lib/formatters";

export default function DiamondDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const diamond = diamonds.find((d) => d.slug === slug);

  if (!diamond) {
    notFound();
  }

  const similar = diamonds
    .filter(
      (d) =>
        d.id !== diamond.id &&
        (d.shape === diamond.shape ||
          Math.abs(d.caratWeight - diamond.caratWeight) < 0.5)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Diamonds", href: "/diamonds" },
            { label: diamond.title },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Left — Viewer */}
          <div>
            <DiamondViewer shape={diamond.shape} title={diamond.title} />
          </div>

          {/* Right — Details */}
          <div>
            {/* Tags */}
            <div className="flex gap-2">
              {diamond.isNew && (
                <span className="border border-foreground px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                  New
                </span>
              )}
              {diamond.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-light tracking-tight">
              {diamond.title}
            </h1>

            {/* Quick Specs */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-text-secondary">
              <span>{formatCarat(diamond.caratWeight)}</span>
              <span className="text-platinum">·</span>
              <span>{formatGrade(diamond.cutGrade)} Cut</span>
              <span className="text-platinum">·</span>
              <span>{diamond.clarity} Clarity</span>
              <span className="text-platinum">·</span>
              <span>{diamond.color} Color</span>
            </div>

            {/* Divider */}
            <div className="mt-8 border-t border-border" />

            {/* CTA */}
            <div className="mt-8">
              <InquiryCTA title={diamond.title} id={diamond.id} />
            </div>

            {/* Specs */}
            <div className="mt-10">
              <SpecsTable diamond={diamond} />
            </div>
          </div>
        </div>

        {/* Similar Diamonds */}
        {similar.length > 0 && (
          <section className="mt-24">
            <SimilarDiamonds diamonds={similar} />
          </section>
        )}
      </div>
    </div>
  );
}

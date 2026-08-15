"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { diamonds } from "@/data/diamonds";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DiamondViewer } from "@/components/pdp/DiamondViewer";
import { InquiryCTA } from "@/components/pdp/InquiryCTA";
import { SimilarDiamonds } from "@/components/pdp/SimilarDiamonds";
import {
  DiamondConfigurator,
  FANCY,
  type DiamondConfig,
} from "@/components/pdp/DiamondConfigurator";
import { formatGrade } from "@/lib/formatters";

/** One-line summary of the current selection. */
function summarise(c: DiamondConfig): string {
  const colour = c.color === FANCY ? c.fancyColor || "Fancy Colour" : c.color;
  return [
    c.type,
    c.carat && `${c.carat}ct`,
    colour,
    c.clarity,
    c.lab,
    c.fluorescence && `${c.fluorescence} fluorescence`,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function DiamondDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const diamond = diamonds.find((d) => d.slug === slug);

  const [configOpen, setConfigOpen] = useState(false);
  const [config, setConfig] = useState<DiamondConfig | null>(null);

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

  const shapeLabel = formatGrade(diamond.shape);

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
            <DiamondViewer
              shape={diamond.shape}
              title={diamond.title}
              onConfigure={() => setConfigOpen(true)}
            />
          </div>

          {/* Right — Name + shape only */}
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

            {/* Shape — the only detail we keep */}
            <div className="mt-4 flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-text-secondary">
              <span>Shape</span>
              <span className="text-platinum">·</span>
              <span className="text-foreground">{shapeLabel}</span>
            </div>

            {/* Current selection summary */}
            {config && summarise(config) && (
              <div className="mt-6 border border-border bg-card p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-text-secondary">
                  Your Selection
                </p>
                <p className="mt-2 font-heading text-lg font-light">
                  {summarise(config)}
                </p>
                {config.extra && (
                  <p className="mt-2 text-sm text-text-secondary">
                    {config.extra}
                  </p>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="mt-8 border-t border-border" />

            {/* Configure + Inquiry CTAs */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setConfigOpen(true)}
                className="flex h-12 w-full items-center justify-center bg-foreground text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
              >
                {config ? "Edit Selection" : "Configure This Diamond"}
              </button>
              <InquiryCTA title={diamond.title} id={diamond.id} />
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

      {configOpen && (
        <DiamondConfigurator
          onClose={() => setConfigOpen(false)}
          onSave={setConfig}
          diamondName={diamond.title}
          shapeName={shapeLabel}
          initial={config}
        />
      )}
    </div>
  );
}

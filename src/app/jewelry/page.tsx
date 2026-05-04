"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/plp/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCategory } from "@/types/product";

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "rings", label: "Rings" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "pendant", label: "Pendants & Necklaces" },
];

export default function JewelryPage() {
  const [category, setCategory] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jewelry" }]} />

        <div className="mt-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight">
            Jewelry Collection
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`shrink-0 border px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                category === cat.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-text-secondary hover:border-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid gap-4 grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

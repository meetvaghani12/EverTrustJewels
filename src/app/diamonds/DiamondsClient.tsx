"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { diamonds } from "@/data/diamonds";
import { filterDiamonds } from "@/lib/diamondFilters";
import { FilterSidebar } from "@/components/plp/FilterSidebar";
import { FilterDrawer } from "@/components/plp/FilterDrawer";
import { FilterChips } from "@/components/plp/FilterChips";
import { SortDropdown } from "@/components/plp/SortDropdown";
import { DiamondCard } from "@/components/plp/DiamondCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DEFAULT_FILTERS, FilterState, SortOption } from "@/types/filters";
import { DiamondShape, CutGrade, ClarityGrade, ColorGrade } from "@/types/diamond";

const ITEMS_PER_PAGE = 12;

export default function DiamondsClient() {
  const searchParams = useSearchParams();

  const initialFilters = useMemo((): FilterState => {
    const shapesParam = searchParams.get("shapes");
    return {
      ...DEFAULT_FILTERS,
      shapes: shapesParam
        ? (shapesParam.split(",") as DiamondShape[])
        : [],
      sort: (searchParams.get("sort") as SortOption) || "newest",
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredDiamonds = useMemo(
    () => filterDiamonds(diamonds, filters),
    [filters]
  );

  const totalPages = Math.ceil(filteredDiamonds.length / ITEMS_PER_PAGE);
  const paginatedDiamonds = filteredDiamonds.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const updateFilter = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const hasActiveFilters =
    filters.shapes.length > 0 ||
    filters.cuts.length > 0 ||
    filters.clarities.length > 0 ||
    filters.colors.length > 0 ||
    filters.caratMin > DEFAULT_FILTERS.caratMin ||
    filters.caratMax < DEFAULT_FILTERS.caratMax ||
    filters.priceMin > DEFAULT_FILTERS.priceMin ||
    filters.priceMax < DEFAULT_FILTERS.priceMax;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Diamonds" }]} />

        <div className="mt-8 flex items-end justify-between">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight">
              Our Diamonds
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {filteredDiamonds.length}{" "}
              {filteredDiamonds.length === 1 ? "diamond" : "diamonds"} found
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SortDropdown
              value={filters.sort}
              onChange={(sort) => updateFilter({ sort })}
            />
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 border border-border px-4 py-3 text-xs uppercase tracking-[0.15em] lg:hidden"
            >
              Filters
            </button>
          </div>
        </div>

        {hasActiveFilters && (
          <FilterChips filters={filters} onUpdate={updateFilter} onClear={clearFilters} />
        )}

        <div className="mt-8 flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <FilterSidebar filters={filters} onUpdate={updateFilter} />
          </aside>

          {/* Mobile Drawer */}
          <FilterDrawer
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            filters={filters}
            onUpdate={updateFilter}
            onClear={clearFilters}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedDiamonds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-text-secondary">
                  No diamonds match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm uppercase tracking-[0.15em] underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:gap-6">
                  {paginatedDiamonds.map((diamond) => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`flex h-11 w-11 items-center justify-center text-sm transition-colors ${
                            p === page
                              ? "bg-foreground text-white"
                              : "border border-border hover:border-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

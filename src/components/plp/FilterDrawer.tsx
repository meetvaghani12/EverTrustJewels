"use client";

import { FilterState } from "@/types/filters";
import { FilterSidebar } from "./FilterSidebar";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdate: (partial: Partial<FilterState>) => void;
  onClear: () => void;
}

export function FilterDrawer({
  open,
  onClose,
  filters,
  onUpdate,
  onClear,
}: FilterDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full sm:max-w-sm bg-background overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm uppercase tracking-[0.15em]">Filters</h2>
          <div className="flex gap-4">
            <button
              onClick={onClear}
              className="text-xs uppercase tracking-[0.1em] text-text-secondary hover:text-foreground"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="text-xl leading-none"
              aria-label="Close filters"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="p-6">
          <FilterSidebar filters={filters} onUpdate={onUpdate} />
        </div>
        <div className="border-t border-border p-6">
          <button
            onClick={onClose}
            className="w-full bg-foreground py-3 text-sm uppercase tracking-[0.15em] text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

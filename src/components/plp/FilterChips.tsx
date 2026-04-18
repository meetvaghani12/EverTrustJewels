"use client";

import { FilterState, DEFAULT_FILTERS } from "@/types/filters";
import { formatGrade } from "@/lib/formatters";

interface FilterChipsProps {
  filters: FilterState;
  onUpdate: (partial: Partial<FilterState>) => void;
  onClear: () => void;
}

export function FilterChips({ filters, onUpdate, onClear }: FilterChipsProps) {
  const chips: { label: string; onRemove: () => void }[] = [];

  filters.shapes.forEach((shape) => {
    chips.push({
      label: formatGrade(shape),
      onRemove: () =>
        onUpdate({ shapes: filters.shapes.filter((s) => s !== shape) }),
    });
  });

  filters.cuts.forEach((cut) => {
    chips.push({
      label: `Cut: ${formatGrade(cut)}`,
      onRemove: () =>
        onUpdate({ cuts: filters.cuts.filter((c) => c !== cut) }),
    });
  });

  filters.clarities.forEach((clarity) => {
    chips.push({
      label: `Clarity: ${clarity}`,
      onRemove: () =>
        onUpdate({
          clarities: filters.clarities.filter((c) => c !== clarity),
        }),
    });
  });

  filters.colors.forEach((color) => {
    chips.push({
      label: `Color: ${color}`,
      onRemove: () =>
        onUpdate({ colors: filters.colors.filter((c) => c !== color) }),
    });
  });

  if (filters.caratMin > DEFAULT_FILTERS.caratMin || filters.caratMax < DEFAULT_FILTERS.caratMax) {
    chips.push({
      label: `${filters.caratMin}–${filters.caratMax} ct`,
      onRemove: () =>
        onUpdate({
          caratMin: DEFAULT_FILTERS.caratMin,
          caratMax: DEFAULT_FILTERS.caratMax,
        }),
    });
  }

  if (filters.priceMin > DEFAULT_FILTERS.priceMin || filters.priceMax < DEFAULT_FILTERS.priceMax) {
    chips.push({
      label: `₹${filters.priceMin.toLocaleString()}–₹${filters.priceMax.toLocaleString()}`,
      onRemove: () =>
        onUpdate({
          priceMin: DEFAULT_FILTERS.priceMin,
          priceMax: DEFAULT_FILTERS.priceMax,
        }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={chip.onRemove}
          className="flex items-center gap-1 border border-border px-3 py-1.5 text-xs transition-colors hover:border-foreground"
        >
          {chip.label}
          <span className="ml-1 text-text-secondary">&times;</span>
        </button>
      ))}
      <button
        onClick={onClear}
        className="px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-text-secondary hover:text-foreground"
      >
        Clear all
      </button>
    </div>
  );
}

"use client";

import { FilterState } from "@/types/filters";
import { DiamondShape, CutGrade, ClarityGrade, ColorGrade } from "@/types/diamond";
import { SHAPES, CUT_GRADES, CLARITY_GRADES, COLOR_GRADES } from "@/lib/constants";

interface FilterSidebarProps {
  filters: FilterState;
  onUpdate: (partial: Partial<FilterState>) => void;
}

export function FilterSidebar({ filters, onUpdate }: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Shape */}
      <FilterGroup title="Shape">
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((shape) => {
            const active = filters.shapes.includes(shape.value);
            return (
              <button
                key={shape.value}
                onClick={() => {
                  const shapes = active
                    ? filters.shapes.filter((s) => s !== shape.value)
                    : [...filters.shapes, shape.value];
                  onUpdate({ shapes });
                }}
                className={`px-3 py-3 text-xs uppercase tracking-[0.1em] transition-colors border ${
                  active
                    ? "border-foreground bg-foreground text-white"
                    : "border-border hover:border-foreground"
                }`}
              >
                {shape.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Carat */}
      <FilterGroup title="Carat Weight">
        <div className="flex items-center gap-3">
          <input
            type="number"
            step="0.1"
            min="0"
            max="30"
            value={filters.caratMin}
            onChange={(e) => onUpdate({ caratMin: parseFloat(e.target.value) || 0 })}
            className="w-full border-b border-border bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
            placeholder="Min"
          />
          <span className="text-text-secondary">—</span>
          <input
            type="number"
            step="0.1"
            min="0"
            max="30"
            value={filters.caratMax}
            onChange={(e) => onUpdate({ caratMax: parseFloat(e.target.value) || 30 })}
            className="w-full border-b border-border bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
            placeholder="Max"
          />
        </div>
      </FilterGroup>

      {/* Cut */}
      <FilterGroup title="Cut Grade">
        <div className="space-y-2">
          {CUT_GRADES.map((cut) => {
            const active = filters.cuts.includes(cut.value);
            return (
              <label key={cut.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => {
                    const cuts = active
                      ? filters.cuts.filter((c) => c !== cut.value)
                      : [...filters.cuts, cut.value];
                    onUpdate({ cuts });
                  }}
                  className="h-5 w-5 accent-foreground"
                />
                <span className="text-sm">{cut.label}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Clarity */}
      <FilterGroup title="Clarity">
        <div className="space-y-2">
          {CLARITY_GRADES.map((clarity) => {
            const active = filters.clarities.includes(clarity.value);
            return (
              <label key={clarity.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => {
                    const clarities = active
                      ? filters.clarities.filter((c) => c !== clarity.value)
                      : [...filters.clarities, clarity.value];
                    onUpdate({ clarities });
                  }}
                  className="h-5 w-5 accent-foreground"
                />
                <span className="text-sm">{clarity.label}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Color */}
      <FilterGroup title="Color">
        <div className="space-y-2">
          {COLOR_GRADES.map((color) => {
            const active = filters.colors.includes(color.value);
            return (
              <label key={color.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => {
                    const colors = active
                      ? filters.colors.filter((c) => c !== color.value)
                      : [...filters.colors, color.value];
                    onUpdate({ colors });
                  }}
                  className="h-5 w-5 accent-foreground"
                />
                <span className="text-sm">{color.label}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs uppercase tracking-[0.15em] text-text-secondary">
        {title}
      </h3>
      {children}
    </div>
  );
}

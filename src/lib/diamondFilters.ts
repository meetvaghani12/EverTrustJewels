import { Diamond } from "@/types/diamond";
import { FilterState } from "@/types/filters";

export function filterDiamonds(diamonds: Diamond[], filters: FilterState): Diamond[] {
  let result = diamonds;

  if (filters.shapes.length > 0) {
    result = result.filter((d) => filters.shapes.includes(d.shape));
  }

  result = result.filter(
    (d) => d.caratWeight >= filters.caratMin && d.caratWeight <= filters.caratMax
  );

  if (filters.cuts.length > 0) {
    result = result.filter((d) => filters.cuts.includes(d.cutGrade));
  }

  if (filters.clarities.length > 0) {
    result = result.filter((d) => filters.clarities.includes(d.clarity));
  }

  if (filters.colors.length > 0) {
    result = result.filter((d) => filters.colors.includes(d.color));
  }

  result = result.filter((d) => {
    if (d.price === null) return true;
    return d.price >= filters.priceMin && d.price <= filters.priceMax;
  });

  return sortDiamonds(result, filters.sort);
}

function sortDiamonds(diamonds: Diamond[], sort: FilterState["sort"]): Diamond[] {
  const sorted = [...diamonds];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case "price_desc":
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "carat_asc":
      return sorted.sort((a, b) => a.caratWeight - b.caratWeight);
    case "carat_desc":
      return sorted.sort((a, b) => b.caratWeight - a.caratWeight);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return sorted;
  }
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Contact for Price";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCarat(carat: number): string {
  return `${carat.toFixed(2)} ct`;
}

export function formatMeasurements(m: { length: number; width: number; depth: number }): string {
  return `${m.length.toFixed(2)} x ${m.width.toFixed(2)} x ${m.depth.toFixed(2)} mm`;
}

export function formatGrade(grade: string): string {
  return grade
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

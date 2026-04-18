import { DiamondShape, CutGrade, ClarityGrade, ColorGrade } from "./diamond";

export interface FilterState {
  shapes: DiamondShape[];
  caratMin: number;
  caratMax: number;
  cuts: CutGrade[];
  clarities: ClarityGrade[];
  colors: ColorGrade[];
  priceMin: number;
  priceMax: number;
  sort: SortOption;
}

export type SortOption = "price_asc" | "price_desc" | "carat_asc" | "carat_desc" | "newest";

export const DEFAULT_FILTERS: FilterState = {
  shapes: [],
  caratMin: 0,
  caratMax: 30,
  cuts: [],
  clarities: [],
  colors: [],
  priceMin: 0,
  priceMax: 10000000,
  sort: "newest",
};

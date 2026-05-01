export type ProductCategory = "rings" | "earrings" | "bracelets" | "pendant";

export interface Product {
  id: string;
  slug: string;
  name: string;
  productName: string;
  description: string;
  styleNumber: string;
  price: number | null;
  category: ProductCategory;
  subCategory: string;
  shape: string;
  setting: string;
  caratMin: number | null;
  caratMax: number | null;
  imageWhite: string;
  imageYellow: string;
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  discount: string;
}

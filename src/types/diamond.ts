export type DiamondShape = "round" | "princess" | "emerald" | "oval" | "cushion" | "pear" | "marquise" | "radiant" | "asscher" | "heart";

export type CutGrade = "excellent" | "very_good" | "good" | "fair";

export type ClarityGrade = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";

export type ColorGrade = "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

export type FinishGrade = "excellent" | "very_good" | "good" | "fair" | "poor";

export type Fluorescence = "none" | "faint" | "medium" | "strong" | "very_strong";

export interface Diamond {
  id: string;
  slug: string;
  title: string;
  shape: DiamondShape;
  caratWeight: number;
  cutGrade: CutGrade;
  clarity: ClarityGrade;
  color: ColorGrade;
  price: number | null;
  pricePerCarat: number | null;
  measurements: {
    length: number;
    width: number;
    depth: number;
  };
  tablePct: number;
  depthPct: number;
  polish: FinishGrade;
  symmetry: FinishGrade;
  fluorescence: Fluorescence;
  certificate: {
    lab: "GIA" | "IGI" | "AGS" | "HRD";
    number: string;
  };
  fancyColor?: {
    hue: string;
    intensity: string;
  };
  images: string[];
  videoUrl?: string;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
}

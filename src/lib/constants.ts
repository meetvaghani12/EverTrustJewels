import { DiamondShape, CutGrade, ClarityGrade, ColorGrade } from "@/types/diamond";

export const SHAPES: { value: DiamondShape; label: string }[] = [
  { value: "round", label: "Round" },
  { value: "princess", label: "Princess" },
  { value: "emerald", label: "Emerald" },
  { value: "oval", label: "Oval" },
  { value: "cushion", label: "Cushion" },
  { value: "pear", label: "Pear" },
  { value: "marquise", label: "Marquise" },
  { value: "radiant", label: "Radiant" },
  { value: "asscher", label: "Asscher" },
  { value: "heart", label: "Heart" },
];

export const CUT_GRADES: { value: CutGrade; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "very_good", label: "Very Good" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export const CLARITY_GRADES: { value: ClarityGrade; label: string }[] = [
  { value: "FL", label: "FL (Flawless)" },
  { value: "IF", label: "IF (Internally Flawless)" },
  { value: "VVS1", label: "VVS1" },
  { value: "VVS2", label: "VVS2" },
  { value: "VS1", label: "VS1" },
  { value: "VS2", label: "VS2" },
  { value: "SI1", label: "SI1" },
  { value: "SI2", label: "SI2" },
];

export const COLOR_GRADES: { value: ColorGrade; label: string }[] = [
  { value: "D", label: "D (Colorless)" },
  { value: "E", label: "E (Colorless)" },
  { value: "F", label: "F (Colorless)" },
  { value: "G", label: "G (Near Colorless)" },
  { value: "H", label: "H (Near Colorless)" },
  { value: "I", label: "I (Near Colorless)" },
  { value: "J", label: "J (Near Colorless)" },
  { value: "K", label: "K (Faint)" },
  { value: "L", label: "L (Faint)" },
  { value: "M", label: "M (Faint)" },
];

export const WHATSAPP_NUMBER = "918238165370";

export const SITE_CONFIG = {
  name: "EverTrust Jewels",
  tagline: "Timeless Brilliance, Trusted Forever",
  description: "Discover exquisite diamonds handpicked for perfection. Every stone tells a story of brilliance, fire, and enduring trust.",
  email: "info@evertrustjewels.com",
  phone: "+91 95108 80097",
  whatsapp: WHATSAPP_NUMBER,
};

import { DiamondShape } from "@/types/diamond";

export interface DiamondCategory {
  shape: DiamondShape;
  label: string;
  description: string;
  longDescription: string;
}

export const categories: DiamondCategory[] = [
  {
    shape: "round",
    label: "Round Brilliant",
    description: "The most popular and brilliant diamond cut",
    longDescription:
      "The round brilliant cut is the most popular diamond shape, accounting for more than half of all diamonds sold worldwide. With 57 or 58 precisely angled facets, it is engineered to maximize light return, delivering unmatched brilliance and fire. Its timeless silhouette suits every style and setting.",
  },
  {
    shape: "princess",
    label: "Princess",
    description: "A modern square cut with exceptional sparkle",
    longDescription:
      "The princess cut is the second most popular diamond shape. Its sharp, geometric lines and brilliant facet pattern create intense sparkle. The square silhouette offers a contemporary aesthetic while maximizing the rough diamond's yield, often making it a more affordable choice per carat.",
  },
  {
    shape: "emerald",
    label: "Emerald",
    description: "An elegant step-cut with a hall-of-mirrors effect",
    longDescription:
      "The emerald cut features long, rectangular facets arranged in a step pattern that produces a distinctive hall-of-mirrors effect. Rather than fiery sparkle, it offers broad flashes of light and emphasizes the diamond's clarity and transparency. Favored by those who appreciate understated elegance.",
  },
  {
    shape: "oval",
    label: "Oval",
    description: "An elongated shape that maximizes perceived size",
    longDescription:
      "The oval cut combines the brilliance of a round diamond with an elongated silhouette that creates the illusion of greater size. Its flattering shape elongates the finger and offers excellent light performance. A versatile choice that bridges classic and contemporary tastes.",
  },
  {
    shape: "cushion",
    label: "Cushion",
    description: "Soft rounded corners with vintage charm",
    longDescription:
      "The cushion cut — also known as the pillow cut — features rounded corners and larger facets that enhance its brilliance and showcase the diamond's clarity. With roots in the 19th century, it blends vintage romance with modern fire, producing beautiful light dispersion.",
  },
  {
    shape: "pear",
    label: "Pear",
    description: "A teardrop silhouette of timeless grace",
    longDescription:
      "The pear shape combines the best of round and marquise cuts into a single teardrop silhouette. Its tapered point creates an elongating effect on the hand, while the rounded end delivers brilliant sparkle. A distinctive and elegant choice for those seeking something unique.",
  },
  {
    shape: "marquise",
    label: "Marquise",
    description: "A dramatic elongated shape with regal presence",
    longDescription:
      "Commissioned by King Louis XV to mirror the shape of his mistress's smile, the marquise cut is one of the most regal diamond shapes. Its elongated form with pointed ends maximizes carat weight perception and creates a dramatic, eye-catching presence on the hand.",
  },
  {
    shape: "radiant",
    label: "Radiant",
    description: "Combines emerald elegance with brilliant sparkle",
    longDescription:
      "The radiant cut merges the elegant silhouette of an emerald cut with the dazzling brilliance of a round. Its trimmed corners and complex facet pattern produce exceptional light performance, making it one of the most vibrant and lively diamond shapes available.",
  },
  {
    shape: "asscher",
    label: "Asscher",
    description: "An art deco square step-cut with geometric beauty",
    longDescription:
      "Developed in 1902 by the Asscher Brothers of Holland, this square step-cut features layered facets that draw the eye deep into the stone. Its art deco geometric precision and mesmerizing optical pattern make it a favorite among collectors and those who appreciate architectural beauty.",
  },
  {
    shape: "heart",
    label: "Heart",
    description: "The ultimate symbol of love and devotion",
    longDescription:
      "The heart-shaped diamond is the most romantic of all cuts. Requiring exceptional skill to craft, a well-cut heart shape exhibits brilliant sparkle and a perfectly symmetrical silhouette. It is the ultimate expression of love, often chosen for anniversary gifts and sentimental occasions.",
  },
];

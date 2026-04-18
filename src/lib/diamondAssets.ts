import { DiamondShape } from "@/types/diamond";

/** Map a diamond shape to its photo path */
export function getShapeImage(shape: DiamondShape): string {
  return `/images/diamonds/${shape}.jpg`;
}

/** Map a diamond shape to its video path */
export function getShapeVideo(shape: DiamondShape): string {
  return `/videos/diamonds/${shape}.mp4`;
}

/** Shapes that have "on hand" videos */
const ON_HAND_SHAPES: DiamondShape[] = ["marquise", "heart", "pear"];

export function getOnHandVideo(shape: DiamondShape): string | null {
  if (ON_HAND_SHAPES.includes(shape)) {
    return `/videos/on-hand/${shape}.mp4`;
  }
  return null;
}

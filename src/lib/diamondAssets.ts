import { DiamondShape } from "@/types/diamond";

/** Map a diamond shape to its photo path */
export function getShapeImage(shape: DiamondShape): string {
  return `/images/diamonds/${shape}.jpg`;
}

/**
 * Map a diamond shape to its video path.
 *
 * These point at re-encoded derivatives (H.264, CRF 30, audio stripped): the
 * originals ran 7-13 MB each at the same 830px resolution, which meant a
 * listing page with twelve cards could pull well over 100 MB. The optimised
 * set is 88 MB -> 16 MB in total. Originals are kept in /videos/diamonds.
 */
export function getShapeVideo(shape: DiamondShape): string {
  return `/videos/optimized/diamonds/${shape}.mp4`;
}

/** Shapes that have "on hand" videos */
const ON_HAND_SHAPES: DiamondShape[] = ["marquise", "heart", "pear"];

export function getOnHandVideo(shape: DiamondShape): string | null {
  if (ON_HAND_SHAPES.includes(shape)) {
    return `/videos/optimized/on-hand/${shape}.mp4`;
  }
  return null;
}

import { DiamondShape } from "@/types/diamond";

const shapeLabels: Record<DiamondShape, string> = {
  round: "Round",
  princess: "Princess",
  emerald: "Emerald",
  oval: "Oval",
  cushion: "Cushion",
  pear: "Pear",
  marquise: "Marquise",
  radiant: "Radiant",
  asscher: "Asscher",
  heart: "Heart",
};

/**
 * SVG-based diamond shape illustrations — lightweight replacement for the 3D viewer.
 */
function ShapeSVG({ shape }: { shape: DiamondShape }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinejoin: "round" as const,
  };

  switch (shape) {
    case "round":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <ellipse cx="50" cy="50" rx="38" ry="38" {...common} />
          {/* Facet lines */}
          <line x1="50" y1="12" x2="50" y2="88" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="12" y1="50" x2="88" y2="50" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="23" y1="23" x2="77" y2="77" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="77" y1="23" x2="23" y2="77" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "princess":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="16" y="16" width="68" height="68" {...common} />
          <line x1="16" y1="16" x2="84" y2="84" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="84" y1="16" x2="16" y2="84" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "emerald":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="25,15 75,15 85,30 85,70 75,85 25,85 15,70 15,30" {...common} />
          <polygon points="32,22 68,22 76,33 76,67 68,78 32,78 24,67 24,33" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "oval":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <ellipse cx="50" cy="50" rx="28" ry="40" {...common} />
          <line x1="50" y1="10" x2="50" y2="90" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="22" y1="50" x2="78" y2="50" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "cushion":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="16" y="16" width="68" height="68" rx="14" ry="14" {...common} />
          <line x1="16" y1="50" x2="84" y2="50" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="50" y1="16" x2="50" y2="84" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "pear":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M50,10 C70,10 85,35 85,55 C85,75 70,90 50,90 C30,90 15,75 15,55 C15,35 30,10 50,10Z" {...common} />
          <line x1="50" y1="10" x2="50" y2="90" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "marquise":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <ellipse cx="50" cy="50" rx="22" ry="42" {...common} />
          <line x1="50" y1="8" x2="50" y2="92" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="28" y1="50" x2="72" y2="50" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "radiant":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="22,15 78,15 85,22 85,78 78,85 22,85 15,78 15,22" {...common} />
          <line x1="15" y1="22" x2="85" y2="78" {...common} strokeWidth={0.8} opacity={0.4} />
          <line x1="85" y1="22" x2="15" y2="78" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    case "asscher":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="25,15 75,15 85,25 85,75 75,85 25,85 15,75 15,25" {...common} />
          <polygon points="35,25 65,25 75,35 75,65 65,75 35,75 25,65 25,35" {...common} strokeWidth={0.8} opacity={0.4} />
          <polygon points="42,35 58,35 65,42 65,58 58,65 42,65 35,58 35,42" {...common} strokeWidth={0.8} opacity={0.3} />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M50,88 C20,60 5,45 5,30 C5,18 15,8 27,8 C35,8 43,13 50,22 C57,13 65,8 73,8 C85,8 95,18 95,30 C95,45 80,60 50,88Z" {...common} />
          <line x1="50" y1="22" x2="50" y2="88" {...common} strokeWidth={0.8} opacity={0.4} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,8 92,38 75,90 25,90 8,38" {...common} />
        </svg>
      );
  }
}

interface DiamondIllustrationProps {
  shape: DiamondShape;
  className?: string;
  showLabel?: boolean;
}

export function DiamondIllustration({
  shape,
  className = "",
  showLabel = false,
}: DiamondIllustrationProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-platinum ${className}`}
    >
      <div className="h-full w-full max-h-64 max-w-64 p-8">
        <ShapeSVG shape={shape} />
      </div>
      {showLabel && (
        <span className="mt-2 text-xs uppercase tracking-[0.15em] text-text-secondary">
          {shapeLabels[shape]}
        </span>
      )}
    </div>
  );
}

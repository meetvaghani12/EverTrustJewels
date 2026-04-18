import { Diamond } from "@/types/diamond";
import { DiamondCard } from "@/components/plp/DiamondCard";

interface SimilarDiamondsProps {
  diamonds: Diamond[];
}

export function SimilarDiamonds({ diamonds }: SimilarDiamondsProps) {
  return (
    <div>
      <h2 className="text-center font-heading text-2xl font-light">
        You May Also Like
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {diamonds.map((diamond) => (
          <DiamondCard key={diamond.id} diamond={diamond} />
        ))}
      </div>
    </div>
  );
}

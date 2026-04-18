import { Diamond } from "@/types/diamond";
import { formatGrade, formatMeasurements, formatCarat } from "@/lib/formatters";

interface SpecsTableProps {
  diamond: Diamond;
}

export function SpecsTable({ diamond }: SpecsTableProps) {
  const specs = [
    { label: "Shape", value: formatGrade(diamond.shape) },
    { label: "Carat Weight", value: formatCarat(diamond.caratWeight) },
    { label: "Cut Grade", value: formatGrade(diamond.cutGrade) },
    { label: "Clarity", value: diamond.clarity },
    { label: "Color", value: diamond.color },
    { label: "Measurements", value: formatMeasurements(diamond.measurements) },
    { label: "Table", value: `${diamond.tablePct}%` },
    { label: "Depth", value: `${diamond.depthPct}%` },
    { label: "Polish", value: formatGrade(diamond.polish) },
    { label: "Symmetry", value: formatGrade(diamond.symmetry) },
    { label: "Fluorescence", value: formatGrade(diamond.fluorescence) },
    {
      label: "Certificate",
      value: `${diamond.certificate.lab} #${diamond.certificate.number}`,
    },
  ];

  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.15em] text-text-secondary">
        Diamond Specifications
      </h3>
      <div className="mt-4 divide-y divide-border">
        {specs.map((spec) => (
          <div key={spec.label} className="flex justify-between py-3">
            <span className="text-sm text-text-secondary">{spec.label}</span>
            <span className="text-sm font-medium">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

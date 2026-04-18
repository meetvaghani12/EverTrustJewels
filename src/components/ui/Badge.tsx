type BadgeVariant = "default" | "outline" | "ice" | "platinum";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-foreground text-white",
  outline: "bg-transparent text-foreground border border-border",
  ice: "bg-ice-blue/40 text-foreground",
  platinum: "bg-platinum/20 text-foreground",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-[10px] font-body uppercase tracking-[0.15em] rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

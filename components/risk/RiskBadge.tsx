import { cn } from "@/lib/utils";

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

const styles: Record<RiskLevel, string> = {
  HIGH: "bg-risk-high-bg text-white",
  MEDIUM: "bg-risk-medium text-white",
  LOW: "bg-risk-low text-white",
};

export function RiskBadge({
  level,
  className,
}: {
  level: RiskLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide",
        styles[level],
        className,
      )}
    >
      {level}
    </span>
  );
}

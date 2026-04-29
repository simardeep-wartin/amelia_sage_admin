import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface SkeletonChartProps {
  className?: string;
  type?: "bar" | "line" | "donut";
}


const FIGMA_BARS = [
  { heightPct: 60,  bg: "#f5f2df", opacity: 0.4 },
  { heightPct: 79,  bg: "#d5d4d0", opacity: 0.2 },
  { heightPct: 45,  bg: "#f5f2df", opacity: 0.3 },
  { heightPct: 100, bg: "#d5d4d0", opacity: 0.2 },
];

export function SkeletonChart({ className, type = "bar" }: SkeletonChartProps) {
  if (type === "donut") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="relative flex items-center justify-center">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="absolute h-[72px] w-[72px] rounded-full bg-paper" />
        </div>
      </div>
    );
  }

  if (type === "line") {
    return (
      <div className={cn("w-full", className)} aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
          <path
            d="M0 55 Q 50 15, 100 40 T 200 25 T 300 45 T 400 20"
            stroke="#D1D5DB"
            strokeWidth="1"
            strokeDasharray="7 5"
            fill="none"
          />
          <circle cx="100" cy="40" r="2" fill="#D1D5DB" />
          <circle cx="200" cy="25" r="2" fill="#D1D5DB" />
          <circle cx="300" cy="45" r="2" fill="#D1D5DB" />
        </svg>
      </div>
    );
  }

  // items-center + gap-4 matches Figma layout exactly
  return (
    <div
      className={cn("animate-pulse flex h-full items-center justify-center gap-4 overflow-hidden", className)}
      aria-hidden="true"
    >
      {FIGMA_BARS.map((bar, i) => (
        <div
          key={i}
          className="w-8 rounded-[4px]"
          style={{
            height: `${bar.heightPct}%`,
            backgroundColor: bar.bg,
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  );
}

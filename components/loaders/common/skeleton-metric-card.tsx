import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface SkeletonMetricCardProps {
  className?: string;
}

export function SkeletonMetricCard({ className }: SkeletonMetricCardProps) {
  return (
    <div
      className={cn(
        "flex h-[125px] flex-col justify-center gap-4 rounded-[14px] border border-cardBorder bg-paper px-5 shadow-sm",
        className
      )}
      aria-busy="true"
    >
      <Skeleton className="h-4 w-28" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

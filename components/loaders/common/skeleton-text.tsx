import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
}

export function SkeletonText({ lines = 1, className, lineClassName }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            // Make the last line slightly shorter if there are multiple lines
            lines > 1 && i === lines - 1 ? "w-2/3" : "",
            lineClassName
          )}
        />
      ))}
    </div>
  );
}

import { Skeleton } from "./skeleton";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

export function SkeletonTable({ rows = 5, columns = 4 }: SkeletonTableProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex w-full items-center justify-between border-b border-cardBorder pb-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-4 w-20" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex w-full items-center justify-between pb-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 w-24" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

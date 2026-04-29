import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface SkeletonCardProps {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  hasHeader?: boolean;
}

export function SkeletonCard({
  className,
  headerClassName,
  contentClassName,
  children,
  hasHeader = true,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[14px] border border-cardBorder bg-card p-5 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02)]",
        className
      )}
    >
      {hasHeader && (
        <div className={cn("mb-4 flex items-center justify-between", headerClassName)}>
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-8" />
        </div>
      )}
      <div className={cn("flex-1", contentClassName)}>{children}</div>
    </div>
  );
}

import { Skeleton } from "./skeleton";

export function SkeletonActionCard() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-cardBorder bg-white p-4 sm:p-5 shadow-sm" aria-busy="true">
      <div className="flex items-center gap-3 sm:gap-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48 sm:w-64" />
          <Skeleton className="h-3 w-32 sm:w-48" />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center justify-center mr-2 gap-2">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-8 w-10 rounded-lg" />
      </div>
    </div>
  );
}

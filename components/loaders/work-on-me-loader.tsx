import PageLayout from "@/components/layout/PageLayout";
import { Skeleton } from "./common/skeleton";
import { SkeletonMetricCard } from "./common/skeleton-metric-card";
import { SkeletonCard } from "./common/skeleton-card";
import { SkeletonActionCard } from "./common/skeleton-action-card";

export default function WorkOnMeLoader() {
  return (
    <PageLayout title="Work on Me Exercises">
      <div className="space-y-6" aria-busy="true">
        {/* Header Section Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-10 w-32 rounded-button" />
        </div>

        {/* Top Summary Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <SkeletonMetricCard key={i} />
          ))}
        </div>

        {/* Emotions Section Skeleton */}
        <SkeletonCard className="p-6 md:p-8" headerClassName="mb-6">
          <div className="mb-6 -mt-3">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <SkeletonActionCard key={i} />
            ))}
          </div>
        </SkeletonCard>

        {/* Focus Areas Section Skeleton */}
        <SkeletonCard className="p-6 md:p-8 mb-10">
          <div className="mb-6 -mt-3">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonActionCard key={i} />
            ))}
          </div>
        </SkeletonCard>
      </div>
    </PageLayout>
  );
}

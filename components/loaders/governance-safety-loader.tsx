import PageLayout from "@/components/layout/PageLayout";
import { Skeleton } from "./common/skeleton";
import { SkeletonMetricCard } from "./common/skeleton-metric-card";

function CardBase({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-busy="true"
      className={`rounded-[14px] border border-cardBorder bg-paper p-5 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export default function GovernanceSafetyLoader() {
  return (
    <PageLayout title="Governance & Safety">
      <div aria-busy="true" className="flex flex-col gap-4">

        {/* Page header */}
        <div className="flex flex-col gap-2 mb-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* 2 Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>

        {/* Overwhelm Detection & User Wellbeing */}
        <CardBase className="min-h-[320px]">
          <div className="mb-4">
            <Skeleton className="h-5 w-2/5" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="space-y-2 text-center">
              <Skeleton className="mx-auto h-5 w-44" />
              <Skeleton className="mx-auto h-3 w-36" />
              <Skeleton className="mx-auto h-3 w-28" />
            </div>
          </div>
        </CardBase>
      </div>
    </PageLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Skeleton } from "./common/skeleton";
import { SkeletonMetricCard } from "./common/skeleton-metric-card";
import { SkeletonChart } from "./common/skeleton-chart";

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

function ChartCard({ className }: { className?: string }) {
  return (
    <CardBase className={className}>
      {/* title row */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-5 w-2/5" />
      </div>
      {/* description lines */}
      <div className="space-y-2 pt-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      {/* chart area */}
      <div className="mt-4 h-[212px]">
        <SkeletonChart type="bar" className="h-full" />
      </div>
    </CardBase>
  );
}

export default function UserInsightLoader() {
  return (
    <DashboardLayout title="User Insights">
      <div aria-busy="true" className="flex flex-col gap-4">

        {/* Page header skeleton (title + breadcrumb) */}
        <div className="flex flex-col gap-2 mb-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>

        {/* Feature Usage Breakdown */}
        <ChartCard className="min-h-[360px]" />

        {/* User Demographics & Behavior */}
        <ChartCard className="min-h-[360px]" />
      </div>
    </DashboardLayout>
  );
}

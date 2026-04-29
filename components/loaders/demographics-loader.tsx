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

function BarChartCard({ className }: { className?: string }) {
  return (
    <CardBase className={className}>
      <div className="mb-4">
        <Skeleton className="h-5 w-2/5" />
      </div>
      <div className="space-y-2 pt-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="mt-4 h-[300px]">
        <SkeletonChart type="bar" className="h-full" />
      </div>
    </CardBase>
  );
}

export default function DemographicsLoader() {
  return (
    <DashboardLayout title="Demographics">
      <div aria-busy="true" className="flex flex-col gap-4">

        {/* Page header + action buttons */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-12 w-36 rounded-[9px]" />
            <Skeleton className="h-12 w-36 rounded-[9px]" />
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>

        {/* Gender Identity + Cultural Identity (side by side) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BarChartCard className="min-h-[500px]" />
          <BarChartCard className="min-h-[500px]" />
        </div>

        {/* Demographics Growth Trend */}
        <CardBase className="min-h-[400px]">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="space-y-2 pt-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="mt-4 h-[120px]">
            <SkeletonChart type="line" className="h-full w-[100px]" />
          </div>
        </CardBase>
      </div>
    </DashboardLayout>
  );
}

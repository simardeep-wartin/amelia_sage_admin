import PageLayout from "@/components/layout/PageLayout";
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
      <div className="mt-4 h-[309px]">
        <SkeletonChart type="bar" className="h-full" />
      </div>
    </CardBase>
  );
}

export default function FinanceLoader() {
  return (
    <PageLayout title="Financial Management">
      <div aria-busy="true" className="flex flex-col gap-4">

        {/* Page header */}
        <div className="flex flex-col gap-2 mb-2">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>

        {/* Revenue Over Time + Revenue by Plan Type */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BarChartCard className="min-h-[460px]" />
          <BarChartCard className="min-h-[460px]" />
        </div>

        {/* Subscription Health Metrics */}
        <CardBase>
          <div className="mb-4">
            <Skeleton className="h-5 w-2/5" />
          </div>
          <div className="space-y-2 pt-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="mt-4 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </CardBase>
      </div>
    </PageLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Skeleton } from "./common/skeleton";
import { SkeletonChart } from "./common/skeleton-chart";

// ── Shared sub-skeletons ────────────────────────────────────────────────────

function CardHeader({ noAction = false }: { noAction?: boolean }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Skeleton className="h-5 w-2/5" />
      {!noAction && <Skeleton className="h-5 w-6 rounded-sm" />}
    </div>
  );
}

function DescLines() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-3/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

function ChatBubbles() {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <Skeleton className="h-10 w-[80%] rounded-2xl rounded-tl-none self-start" />
      <Skeleton className="h-10 w-[65%] rounded-2xl rounded-tr-none self-end" />
      <Skeleton className="h-10 w-[80%] rounded-2xl rounded-tl-none self-start" />
      <Skeleton className="h-10 w-[65%] rounded-2xl rounded-tr-none self-end" />
    </div>
  );
}

function FigurePlaceholder() {
  return (
    <div className="my-6 flex justify-center">
      <Skeleton className="h-[88px] w-[88px] rounded-full" />
    </div>
  );
}

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

// ── Loader ──────────────────────────────────────────────────────────────────

export default function DashboardLoader() {
  return (
    <DashboardLayout title="Dashboard Overview">
      <div aria-busy="true" className="flex flex-col gap-4">

        {/* ── Row 1: Active Users + Wellth Plan ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">

          {/* Active Users */}
          <CardBase className="min-h-[340px]">
            <CardHeader noAction />
            <DescLines />
            <div className="mt-4 h-[140px] flex justify-center items-center">
              <SkeletonChart type="line" className="h-full" />
            </div>
          </CardBase>

          {/* Wellth Plan Progress */}
          <CardBase className="min-h-[340px]">
            <CardHeader />
            <DescLines />
            <SkeletonChart type="donut" className="mt-6" />
          </CardBase>
        </div>

        {/* ── Rows 2+: two-column split ── */}
        <div className="flex flex-col gap-4 lg:flex-row">

          {/* ── Left column (2fr) ── */}
          <div className="flex flex-[2] flex-col gap-4">

            {/* Core vs Free Distribution */}
            <CardBase className="min-h-[220px]">
              <CardHeader />
              <DescLines />
              <div className="mt-4 h-[96px]">
                <SkeletonChart type="bar" className="h-full" />
              </div>
            </CardBase>

            {/* Journal & Insights Activity */}
            <CardBase>
              <CardHeader noAction />
              <div className="mt-2 space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            </CardBase>

            {/* Governance Alerts */}
            <CardBase className="min-h-[220px]">
              <CardHeader noAction />
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <div className="space-y-2 text-center">
                  <Skeleton className="mx-auto h-5 w-40" />
                  <Skeleton className="mx-auto h-3 w-32" />
                  <Skeleton className="mx-auto h-3 w-28" />
                </div>
              </div>
            </CardBase>

            {/* Quick Actions */}
            <CardBase>
              <CardHeader noAction />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-11 rounded-button" />
                <Skeleton className="h-11 rounded-button" />
                <Skeleton className="h-11 rounded-button" />
                <Skeleton className="h-11 rounded-button" />
              </div>
            </CardBase>
          </div>

          {/* ── Right column (1fr) ── */}
          <div className="flex flex-1 flex-col gap-4">

            {/* Sage AI Interactions */}
            <CardBase className="min-h-[340px]">
              <CardHeader noAction />
              <DescLines />
              <ChatBubbles />
            </CardBase>

            {/* Calm & Stillness Stats */}
            <CardBase className="min-h-[300px]">
              <CardHeader noAction />
              <FigurePlaceholder />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
              <Skeleton className="mt-4 h-3 w-24" />
            </CardBase>

            {/* Mindful Exercises Stats */}
            <CardBase className="min-h-[300px]">
              <CardHeader noAction />
              <FigurePlaceholder />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
              <Skeleton className="mt-4 h-3 w-24" />
            </CardBase>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

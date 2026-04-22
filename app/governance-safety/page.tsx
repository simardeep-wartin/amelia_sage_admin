"use client";

import { ArrowUpRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/common/Card";
import appData from "@/data/app-data.json";

const data = appData.governanceSafety;

const ICON_MAP = {
  flag: ExclamationTriangleIcon,
  check: CheckCircleIcon,
};
type IconKey = keyof typeof ICON_MAP;

// ─── Metric card ──────────────────────────────────────────────────────────────
function MetricCard({
  title,
  value,
  subtitle,
  iconType,
}: {
  title: string;
  value: string;
  subtitle: string;
  iconType: string;
}) {
  const Icon = ICON_MAP[iconType as IconKey] ?? CheckCircleIcon;
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[14px] border border-cardBorder bg-paper px-5 py-5 shadow-sm">
      <p className="text-m font-medium text-charcoal">{title}</p>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
          <Icon className="h-6 w-6 text-charcoal/60" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-tight text-charcoal">{value}</p>
          <p className="mt-1 text-xs text-slate">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Risk row ─────────────────────────────────────────────────────────────────
function RiskRow({
  label,
  count,
  dotColor,
}: {
  label: string;
  count: number;
  dotColor: string;
}) {
  return (
    <div className="flex min-h-[68px] items-center justify-between rounded-[10px] bg-softstone px-4">
      {/* Left: dot + label + divider + badge */}
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <span className="text-m font-medium text-charcoal">{label}</span>
        <span className="text-m font-medium text-charcoal/60">|</span>
        <span className="inline-flex h-[23px] min-w-[115px] items-center justify-center rounded-full bg-paper px-3">
          <span className="text-xs text-charcoal">{count} users flagged</span>
        </span>
      </div>
      {/* Right: Review Cases button */}
      <button
        type="button"
        className="flex items-center gap-2.5 text-s font-medium text-primary transition-opacity hover:opacity-70"
      >
        Review Cases
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-paper shadow-sm">
          <ArrowUpRightIcon className="h-3.5 w-3.5 text-charcoal/70" />
        </span>
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GovernanceSafetyPage() {
  return (
    <DashboardLayout title="Governance & Safety">
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex flex-col gap-1">
          <h1 className="text-l font-medium text-charcoal">Governance &amp; Safety</h1>
          <p className="text-s text-slate">Dashboard / Overview / Governance &amp; Safety</p>
        </div>

        {/* ── 2 Metric Cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.metrics.map((m) => (
            <MetricCard
              key={m.title}
              title={m.title}
              value={m.value}
              subtitle={m.subtitle}
              iconType={m.iconType}
            />
          ))}
        </div>

        {/* ── Overwhelm Detection & User Wellbeing ────────────────────────── */}
        <Card
          title="Overwhelm Detection & User Wellbeing"
          actions={
            <button
              type="button"
              aria-label="View all"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-paper shadow-sm transition-opacity hover:opacity-70"
            >
              <ArrowUpRightIcon className="h-3.5 w-3.5 text-charcoal/70" />
            </button>
          }
        >
          <p className="mb-4 text-s text-slate">
            {data.overwhelmDetection.description}
          </p>
          <div className="space-y-3">
            {data.overwhelmDetection.riskLevels.map((r) => (
              <RiskRow
                key={r.id}
                label={r.label}
                count={r.count}
                dotColor={r.dotColor}
              />
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

"use client";

import {
  ArrowPathIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MicrophoneIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/common/Card";
import FilterDropdown from "@/components/ui/FilterDropdown";
import Chart from "@/components/charts/Chart";
import appData from "@/data/app-data.json";
import type {
  WealthPlanItem,
  PlanTypesData,
  DashboardOverviewData,
} from "@/Services/api/dashboard";

const dashboardData = appData.dashboard;

const PROGRESS_COLORS = [
  "bg-[#9caf88]",
  "bg-[#8b7ec8]",
  "bg-[#d4a574]",
  "bg-[#5B9BD5]",
  "bg-[#E87C6B]",
  "bg-[#6B6B6B]",
];

const ICONS = {
  plus: <PlusIcon className="h-4 w-4" />,
  sparkles: <SparklesIcon className="h-4 w-4" />,
  microphone: <MicrophoneIcon className="h-4 w-4" />,
  arrowPath: <ArrowPathIcon className="h-4 w-4" />,
} as const;

type ActionIconKey = keyof typeof ICONS;

const ALERT_STYLES = {
  warning: {
    bg: "bg-[#fef3c6]",
    text: "text-[#973c00]",
    icon: <ExclamationTriangleIcon className="h-3.5 w-3.5 text-[#973c00]" />,
  },
  info: {
    bg: "bg-[#dbeafe]",
    text: "text-[#1e40af]",
    icon: <InformationCircleIcon className="h-3.5 w-3.5 text-[#1e40af]" />,
  },
  error: {
    bg: "bg-[#f4e2e3]",
    text: "text-[#9f1239]",
    icon: <ExclamationCircleIcon className="h-3.5 w-3.5 text-[#9f1239]" />,
  },
} as const;

type DashboardLeftPanelProps = {
  activeUsersFilter: string;
  onActiveUsersFilterChange: (v: string) => void;
  progressFilter: string;
  onProgressFilterChange: (v: string, range?: { from: Date | null; to: Date | null }) => void;
  distributionFilter: string;
  onDistributionFilterChange: (v: string, range?: { from: Date | null; to: Date | null }) => void;
  wealthPlanItems?: WealthPlanItem[];
  planTypes?: PlanTypesData;
  overviewData?: DashboardOverviewData;
};

export default function DashboardLeftPanel({
  activeUsersFilter,
  onActiveUsersFilterChange,
  progressFilter,
  onProgressFilterChange,
  distributionFilter,
  onDistributionFilterChange,
  wealthPlanItems,
  planTypes,
  overviewData,
}: DashboardLeftPanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <Card
          title={dashboardData.activeUsers.title}
          actions={
            <FilterDropdown value={activeUsersFilter} onChange={onActiveUsersFilterChange} />
          }
        >
          <div className="mb-4">
            <div>
              <p className="font-cormorant text-xxl font-bold text-charcoal">
                {dashboardData.activeUsers.value}
              </p>
              <p className="text-s text-grey">{dashboardData.activeUsers.subtitle}</p>
            </div>
            <div className="mt-3 flex justify-start sm:mt-2 sm:justify-end">
              <span className="inline-flex rounded-full bg-trendBg px-3 py-1 text-s text-trendGreen">
                {dashboardData.activeUsers.trend}
              </span>
            </div>
          </div>
          <Chart data={dashboardData.activeUsersChart} />
        </Card>

        <Card
          title="Wellth Plan Progress"
          actions={
            <FilterDropdown
              variant="icon"
              value={progressFilter}
              onChange={onProgressFilterChange}
            />
          }
        >
          <div className="space-y-4">
            {(wealthPlanItems && wealthPlanItems.length > 0
              ? wealthPlanItems.map((item, i) => ({
                  label: item.title,
                  value: item.percentage,
                  detail: `${item.total_completions} / ${item.total_exercises} exercises`,
                  color: PROGRESS_COLORS[i % PROGRESS_COLORS.length],
                }))
              : dashboardData.progressItems.map((item) => ({
                  label: item.label,
                  value: item.value,
                  detail: null,
                  color: item.color,
                }))
            ).map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-cormorant text-customBlack">{item.label}</span>
                  <span className="text-[#6b6b6b]">{item.value}%</span>
                </div>
                {item.detail && <p className="mb-1 text-xs text-[#9b9b9b]">{item.detail}</p>}
                <div className="h-2 rounded-full bg-[linear-gradient(178deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${Math.min(item.value, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Journal & Insights Activity">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex h-[76px] items-center justify-center rounded-2xl bg-[linear-gradient(165deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
              <div className="text-center">
                <p className="font-cormorant text-xl font-bold text-customBlack">
                  {overviewData != null
                    ? overviewData.journals.total
                    : dashboardData.journalInsights.journalsCreated}
                </p>
                <p className="text-xs font-medium text-customBlack">Total journals created</p>
              </div>
            </div>
            <div className="flex h-[76px] items-center justify-center rounded-2xl bg-[linear-gradient(165deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
              <div className="text-center">
                <p className="font-cormorant text-xl font-bold text-customBlack">
                  {overviewData != null
                    ? overviewData.journals.users_with_at_least_one
                    : dashboardData.journalInsights.insightsGenerated}
                </p>
                <p className="text-xs font-medium text-customBlack">Insights generated</p>
              </div>
            </div>
          </div>
          <div className="border-t border-cardBorder pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-customBlack">Most active topic:</span>
              <div className="inline-flex items-center gap-2">
                <span className="h-[11px] w-[11px] rounded-full bg-[#d4a574]" />
                <span className="text-sm text-charcoal">
                  {dashboardData.journalInsights.mostActiveTopic}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="Core vs Free Distribution"
        actions={
          <FilterDropdown
            variant="icon"
            value={distributionFilter}
            onChange={onDistributionFilterChange}
          />
        }
      >
        <div className="overflow-hidden rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.5fr]">
            <div className="flex min-h-[72px] sm:h-24 flex-col items-center justify-center bg-gradient-to-r from-sageGreen to-gold">
              <p className="font-cormorant text-2xl sm:text-3xl font-bold text-customBlack">
                {planTypes != null ? planTypes.premium : dashboardData.coreVsFree.core}
              </p>
              <p className="text-xs font-medium text-charcoal">Core</p>
            </div>
            <div className="flex min-h-[72px] sm:h-24 flex-col items-center justify-center bg-[linear-gradient(166deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
              <p className="font-cormorant text-2xl sm:text-3xl font-bold text-customBlack">
                {planTypes != null ? planTypes.free : dashboardData.coreVsFree.free}
              </p>
              <p className="text-xs font-medium text-slate">Free</p>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-cardBorder pt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6b6b6b]">Conversion rate:</p>
            <p className="font-cormorant text-2xl font-semibold text-customBlack">
              {dashboardData.coreVsFree.conversionRate}
            </p>
          </div>
        </div>
      </Card>

      <Card title="Governance Alerts">
        <div className="space-y-3">
          {dashboardData.alerts.map((alert) => {
            const variant = ALERT_STYLES[alert.type as keyof typeof ALERT_STYLES];
            return (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-[10px] bg-[linear-gradient(175deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-[10px] ${variant.bg}`}
                  >
                    {variant.icon}
                  </div>
                  <p className="text-s text-charcoal">{alert.message}</p>
                </div>
                <Link
                  href={alert.route}
                  className={`text-s font-medium ${variant.text} hover:underline`}
                >
                  {alert.action}
                </Link>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="Quick Actions">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {dashboardData.quickActions.map((action) => (
            <Button
              variant="outline"
              key={action.label}
              leftIcon={ICONS[action.icon as ActionIconKey]}
              href={action.href}
              className="w-full"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}

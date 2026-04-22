"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/common/Card";
import FeatureBarChart from "@/components/insights/FeatureBarChart";
import appData from "@/data/app-data.json";

const insightsData = appData.userInsights;

const ICON_MAP = {
  flag: "/auth/multipleUser.svg",
  check: "/auth/goal.svg",
};


type IconKey = keyof typeof ICON_MAP;

export default function UserInsightsPage() {
  return (
    <DashboardLayout title="User Insights">
      <div className="space-y-4">
        {/* Page title + breadcrumb — matches Figma heading section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-l font-medium text-charcoal">User Insights</h1>
          <p className="text-s text-grey">Dashboard / Overview / User Insights</p>
        </div>

        {/* Metric Cards — 2-col on sm+, stacked on mobile */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {insightsData.metrics.map((metric) => {
            const iconSrc =
              ICON_MAP[metric.iconType as IconKey] ?? "/auth/goal.svg";

            return (
              <div
                key={metric.title}
                className="rounded-xl border border-cardBorder bg-paper px-5 shadow-sm h-[125px] flex flex-col justify-center"
              >
                <p className="text-m font-medium text-charcoal">{metric.title}</p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                    <img src={iconSrc} alt="icon" className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-2xl font-semibold leading-tight text-charcoal">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-xs text-[#00a63e]">
                      {metric.trend}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Usage Breakdown — full-width bar chart with filter icon */}
        <Card
          title="Feature Usage Breakdown"
        >
          <FeatureBarChart data={insightsData.featureUsage} />
        </Card>

        {/* User Demographics & Behavior — age group list */}
        <Card title="User Demographics & Behavior">
          <div className="max-w-sm space-y-3">
            <p className="text-m font-medium text-gold">Top Age Groups</p>
            <div className="space-y-2">
              {insightsData.demographics.ageGroups.map((group) => (
                <div key={group.label} className="flex items-center justify-between">
                  <span className="text-s text-grey">{group.label}</span>
                  <span className="font-cormorant text-m font-semibold text-charcoal">
                    {group.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

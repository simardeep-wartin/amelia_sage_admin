"use client";

import Card from "@/components/common/Card";
import MetricCard from "@/components/common/MetricCard";
import FeatureBarChart from "@/components/charts/FeatureBarChart";
import FilterDropdown from "@/components/ui/FilterDropdown";
import appData from "@/data/app-data.json";
import type { UserInsightsState } from "@/hooks/useUserInsights";

const insightsData = appData.userInsights;

const ICON_MAP: Record<string, string> = {
  flag: "/auth/multipleUser.svg",
  check: "/auth/goal.svg",
};

type Props = Omit<UserInsightsState, "loading">;

export default function UserInsightsMain({
  overview,
  featureUsage,
  featureFilter,
  handleFeatureFilter,
}: Props) {
  const metrics = overview
    ? [
        {
          title: "Total Users",
          value: String(overview.total_users),
          subtitle: insightsData.metrics[0]?.trend ?? "",
          iconSrc: "/auth/multipleUser.svg",
        },
        {
          title: "Goal Completion",
          value: `${overview.goal_completion.percentage}%`,
          subtitle: `${overview.goal_completion.completed} / ${overview.goal_completion.total_possible} goals`,
          iconSrc: "/auth/goal.svg",
        },
      ]
    : insightsData.metrics.map((metric) => ({
        title: metric.title,
        value: metric.value,
        subtitle: metric.trend,
        iconSrc: ICON_MAP[metric.iconType] ?? "/auth/goal.svg",
      }));

  const ageGroups = overview
    ? overview.demographics.top_age_groups.map((ageGroup) => ({
        label: ageGroup.age_range,
        percentage: `${ageGroup.percentage}%`,
      }))
    : insightsData.demographics.ageGroups.map((ageGroup) => ({
        label: ageGroup.label,
        percentage: ageGroup.percentage,
      }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-l font-medium text-charcoal">User Insights</h1>
        <p className="text-s text-grey">Dashboard / Overview / User Insights</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            subtitleColor="#00a63e"
            iconSrc={metric.iconSrc}
          />
        ))}
      </div>

      <Card
        title="Feature Usage Breakdown"
        actions={
          <FilterDropdown variant="icon" value={featureFilter} onChange={handleFeatureFilter} />
        }
      >
        <FeatureBarChart
          data={
            featureUsage
              ? featureUsage.map((item) => ({ feature: item.feature, sessions: item.count }))
              : insightsData.featureUsage
          }
        />
      </Card>

      <Card title="User Demographics & Behavior">
        <div className="max-w-sm space-y-3">
          <p className="text-m font-medium text-gold">Top Age Groups</p>
          <div className="space-y-2">
            {ageGroups.map((group) => (
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
  );
}

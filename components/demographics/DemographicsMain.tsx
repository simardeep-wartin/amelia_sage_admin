"use client";

import { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import appData from "@/data/app-data.json";
import MetricCard from "@/components/common/MetricCard";
import Tabs from "@/components/common/Tabs";
import DistributionPieChart from "@/components/charts/DistributionPieChart";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import TrendLineChart from "@/components/charts/TrendLineChart";
import DistributionBarChart from "@/components/charts/DistributionBarChart";
import ProgressCard from "@/components/common/ProgressCard";
import InsightGrid from "@/components/common/InsightGrid";
import SummaryGrid from "@/components/common/SummaryGrid";
import ChartSkeleton from "@/components/common/ChartSkeleton";
import {
  buildTrendChartData,
  getOverview,
  getGenderIdentity,
  getCulturalIdentity,
  getEthnicity,
  getWellnessNeeds,
} from "@/Services/api/demographics";
import { buildDemographicsPdf } from "@/lib/buildDemographicsPdf";
import type { DemographicsState, DemographicTab } from "@/hooks/useDemographics";

const demographicsData = appData.demographicsPage;
const demographicsTabsData = appData.demographics;

type StatItem = { title: string; value: string | number; subtitle?: string };

const DEMOGRAPHIC_TABS: readonly DemographicTab[] = [
  "Overview",
  "Gender Identity",
  "Cultural Identity",
  "Ethnicity",
  "Wellness Needs",
];

const ICON_MAP = {
  flag: "/auth/multipleUser.svg",
  check: "/auth/circleTick.svg",
  trend: "/auth/growth.svg",
};

type IconKey = keyof typeof ICON_MAP;

const GENDER_COLORS = ["#9CAF88", "#D4A574", "#7B4CE2", "#6B6B6B", "#E87C6B", "#5B9BD5"];
const GROUP_BY_OPTIONS = ["All", "Gender Identity", "Cultural Identity", "Ethnicity"];
const GROUP_BY_LABEL_TO_KEY: Record<string, string> = {
  All: "all",
  "Gender Identity": "gender_identity",
  "Cultural Identity": "cultural_identity",
  Ethnicity: "ethnicity",
};
const FILTER_OPTIONS = ["All", "Today", "Week", "Month", "Year", "Custom"];

type Props = Omit<DemographicsState, "loading">;

export default function DemographicsMain({
  tabLoading,
  activeTab,
  setActiveTab,
  overview,
  genderDistribution,
  trendGroups,
  culturalIdentity,
  ageDistribution,
  coreConversion,
  culturalCoreConversion,
  culturalAgeDistribution,
  ethnicity,
  wellnessNeeds,
  genderLoading,
  culturalIdentityLoading,
  growthTrendLoading,
  ageDistributionLoading,
  insightGridLoading,
  coreConversionLoading,
  culturalCoreConversionLoading,
  culturalAgeDistributionLoading,
  ethnicityDistributionLoading,
  ethnicityResponseLoading,
  wellnessSupportLoading,
  wellnessJourneyLoading,
  handleGenderFilter,
  handleCulturalIdentityFilter,
  handleGrowthTrendFilter,
  handleAgeDistributionFilter,
  handleInsightGridFilter,
  handleCoreConversionFilter,
  handleCulturalCoreConversionFilter,
  handleCulturalAgeDistributionFilter,
  handleEthnicityDistributionFilter,
  handleEthnicityResponseFilter,
  handleWellnessSupportFilter,
  handleWellnessJourneyFilter,
}: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Fetch the full, unfiltered dataset for every section so the report is
      // complete regardless of which tab is currently open.
      const [overview, gender, cultural, ethnicity, wellness] = await Promise.all([
        getOverview(),
        getGenderIdentity(),
        getCulturalIdentity(),
        getEthnicity(),
        getWellnessNeeds(),
      ]);
      buildDemographicsPdf({ overview, gender, cultural, ethnicity, wellness });
    } catch (err) {
      console.error("Failed to export demographics report", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-arial text-[20px] sm:text-[24px] font-medium leading-[32px] text-customBlack">
            {demographicsData.header.title}
          </h1>
          <p className="font-arial text-[13px] sm:text-[14px] leading-[20px] text-[#6B6B6B]">
            {demographicsData.header.breadcrumb}
          </p>
        </div>
        <Button
          onClick={handleExport}
          isLoading={isExporting}
          loadingText="Exporting..."
          className="h-12 w-full rounded-[8px] bg-sageGreen px-6 font-sans text-[16px] font-semibold leading-[1.5] text-white hover:bg-[#7F9F7B] sm:w-auto sm:min-w-[184px]"
          leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}
        >
          {demographicsData.header.exportButtonLabel}
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {demographicsData.metrics.map((metric, i) => {
          const iconSrc = ICON_MAP[metric.iconType as IconKey] ?? "/auth/multipleUser.svg";
          const liveValues = overview
            ? [
                String(overview.data.total_users),
                String(overview.data.new_this_month),
                String(overview.data.average_age)
                  .replace(/\s*year\s*/i, "")
                  .trim(),
              ]
            : null;
          // Green subtitle text per card, driven by live data:
          // [0] Total Users → "+N this month", [1] New This Month → "X% growth", [2] Average Age → static
          const liveSubtitles = overview
            ? [
                `+${overview.data.new_this_month} this month`,
                `${overview.data.growth_percentage}% growth`,
                metric.subtitle,
              ]
            : null;
          return (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={liveValues ? liveValues[i] : String(metric.value)}
              subtitle={liveSubtitles ? liveSubtitles[i] : metric.subtitle}
              iconSrc={iconSrc}
            />
          );
        })}
      </div>

      <Tabs items={DEMOGRAPHIC_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Overview ── */}
      {activeTab === "Overview" && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DistributionPieChart
              title={demographicsData.genderDistribution.title}
              loading={genderLoading}
              data={genderDistribution.map((item, i) => ({
                label: item.gender,
                value: item.count,
                percentage: `${item.percentage}%`,
                color: GENDER_COLORS[i % GENDER_COLORS.length],
                chartValue: item.percentage,
              }))}
              innerRadius={58}
              outerRadius={100}
              startAngle={92}
              endAngle={-268}
              filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
              onFilterChange={handleGenderFilter}
            />
            <HorizontalBarChart
              title="Cultural Identity Distribution"
              subtitle={
                culturalIdentity
                  ? `${culturalIdentity.distribution.length} distinct cultural identities represented • ${(overview?.data.total_users ?? 0).toLocaleString()} total users`
                  : undefined
              }
              loading={culturalIdentityLoading}
              data={(culturalIdentity?.distribution ?? []).map((item) => ({
                group: item.identity,
                users: item.count,
                percentage: item.percentage,
              }))}
              dataKey="users"
              labelKey="group"
              highlights={
                culturalIdentity
                  ? [
                      ...(culturalIdentity.largest_group
                        ? [
                            {
                              title: "Largest Group",
                              label: culturalIdentity.largest_group.identity,
                              detail: `${culturalIdentity.largest_group.count.toLocaleString()} users (${culturalIdentity.largest_group.percentage}%)`,
                              bgColor: "#faf5ff",
                              textColor: "#8B7EC8",
                            },
                          ]
                        : []),
                      ...(culturalIdentity.least_group
                        ? [
                            {
                              title: "Least Group",
                              label: culturalIdentity.least_group.identity,
                              detail: `${culturalIdentity.least_group.count.toLocaleString()} users (${culturalIdentity.least_group.percentage}%)`,
                              bgColor: "#f0fdf4",
                              textColor: "#9CAF88",
                            },
                          ]
                        : []),
                    ]
                  : []
              }
              onFilterChange={handleCulturalIdentityFilter}
            />
          </div>
          {(() => {
            const { data: trendData, series: trendSeries } = buildTrendChartData(trendGroups);
            return (
              <TrendLineChart
                title="Demographics Growth Trend"
                loading={growthTrendLoading}
                data={trendData}
                series={trendSeries}
                filters={[
                  { label: "Group By", options: GROUP_BY_OPTIONS },
                  { label: "Filter", options: FILTER_OPTIONS },
                ]}
                onFilterChange={([groupByLabel, filter]) =>
                  handleGrowthTrendFilter([
                    GROUP_BY_LABEL_TO_KEY[groupByLabel] ?? groupByLabel,
                    filter,
                  ])
                }
              />
            );
          })()}
        </>
      )}

      {/* ── Gender Identity ── */}
      {activeTab === "Gender Identity" && tabLoading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartSkeleton height="h-[300px]" />
          <ChartSkeleton height="h-[300px]" />
          <ChartSkeleton height="h-[300px]" className="lg:col-span-2" />
        </div>
      )}
      {activeTab === "Gender Identity" &&
        !tabLoading &&
        (() => {
          const genders = Array.from(
            new Set(ageDistribution.flatMap((item) => Object.keys(item.by_gender))),
          );
          const ageChartData = ageDistribution.map((item) => ({
            label: item.age_range,
            ...item.by_gender,
          }));
          const ageSeries = genders.map((gender, i) => ({
            key: gender,
            label: gender,
            color: GENDER_COLORS[i % GENDER_COLORS.length],
          }));
          const insightGroups = genders.map((gender) => {
            const rows = ageDistribution
              .filter((item) => gender in item.by_gender)
              .map((item) => ({ label: item.age_range, count: item.by_gender[gender] }));
            const total = rows.reduce((sum, row) => sum + row.count, 0);
            return {
              title: gender,
              rows: rows.map((row) => {
                const pct = total > 0 ? Math.round((row.count / total) * 100) : 0;
                return { label: row.label, value: `${row.count} (${pct}%)`, progress: pct };
              }),
            };
          });
          const groupColors = Object.fromEntries(
            genders.map((gender, i) => [gender, GENDER_COLORS[i % GENDER_COLORS.length]]),
          );
          return (
            <>
              <DistributionBarChart
                title="Age Distribution by Gender Identity"
                loading={ageDistributionLoading}
                data={ageChartData}
                series={ageSeries}
                filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                onFilterChange={handleAgeDistributionFilter}
                note="Key Insight: The 25-34 age range represents the largest segment (38%) across all gender identities, with a particularly strong representation among women users."
              />
              <ProgressCard
                title="Core Conversion by Gender"
                loading={coreConversionLoading}
                filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                onFilter={handleCoreConversionFilter}
                items={coreConversion.map((item) => ({
                  label: item.gender,
                  value: item.conversion_rate,
                  detail: `${item.core_users.toLocaleString()} of ${item.total_users.toLocaleString()} users`,
                }))}
                note="Women show the highest Core conversion rate at 33.4%, suggesting strong product-market fit with this segment."
              />
              <InsightGrid
                title="Feature Usage by Gender Identity"
                loading={insightGridLoading}
                subtitle="Top features used by each gender identity group"
                groups={insightGroups}
                groupColors={groupColors}
                filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                onFilterChange={handleInsightGridFilter}
              />
            </>
          );
        })()}

      {/* ── Cultural Identity ── */}
      {activeTab === "Cultural Identity" && tabLoading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-[4px] bg-[#E5E7EB]"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
          <ChartSkeleton height="h-[260px]" />
          <ChartSkeleton height="h-[300px]" />
        </div>
      )}
      {activeTab === "Cultural Identity" &&
        !tabLoading &&
        (() => {
          const cd = demographicsTabsData.cultural_identity;
          return (
            <>
              {culturalIdentityLoading ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-24 animate-pulse rounded-[4px] bg-[#E5E7EB]"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {(
                    culturalIdentity?.distribution ??
                    cd.stats.map((s: StatItem) => ({
                      identity: s.title,
                      count: 0,
                      percentage: Number(String(s.value).replace(/[^0-9.]/g, "")) || 0,
                    }))
                  ).map((item) => (
                    <div
                      key={item.identity}
                      className="rounded-[4px] bg-[#F9FAFB] p-3 text-center flex flex-col gap-1"
                    >
                      <p className="font-sans text-[11px] text-[#6B6B6B] line-clamp-2 leading-[1.3]">
                        {item.identity}
                      </p>
                      <p className="font-sans text-[22px] font-bold leading-[1.2] text-[#8B7EC8]">
                        {item.percentage}%
                      </p>
                      <p className="font-sans text-[11px] text-[#6B6B6B]">{item.count} users</p>
                    </div>
                  ))}
                </div>
              )}
              <ProgressCard
                title="Core Conversion by Cultural Identity"
                loading={culturalCoreConversionLoading}
                filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                onFilter={handleCulturalCoreConversionFilter}
                items={culturalCoreConversion.map((item) => ({
                  label: item.identity,
                  value: item.conversion_rate,
                  detail: `${item.core_users.toLocaleString()} of ${item.total_users.toLocaleString()} users`,
                }))}
              />
              {(() => {
                const identities = Array.from(
                  new Set(culturalAgeDistribution.flatMap((item) => Object.keys(item.by_identity))),
                );
                const chartData = culturalAgeDistribution.map((item) => ({
                  label: item.age_range,
                  ...item.by_identity,
                }));
                const series =
                  identities.length > 0
                    ? identities.map((id, i) => ({
                        key: id,
                        label: id,
                        color: GENDER_COLORS[i % GENDER_COLORS.length],
                      }))
                    : (cd.groupedBar.series as { key: string; label: string; color: string }[]);
                return (
                  <DistributionBarChart
                    title={cd.groupedBar.title}
                    loading={culturalAgeDistributionLoading}
                    subtitle={cd.groupedBar.subtitle}
                    note={cd.groupedBar.note}
                    data={culturalAgeDistribution.length > 0 ? chartData : cd.groupedBar.categories}
                    series={series}
                    filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                    onFilterChange={handleCulturalAgeDistributionFilter}
                  />
                );
              })()}
            </>
          );
        })()}

      {/* ── Ethnicity ── */}
      {activeTab === "Ethnicity" && tabLoading && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-[4px] bg-[#E5E7EB]"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartSkeleton height="h-[300px]" />
            <ChartSkeleton height="h-[300px]" />
          </div>
        </div>
      )}
      {activeTab === "Ethnicity" && !tabLoading && ethnicity && (
        <>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {[
              { title: "Total Users", value: String(ethnicity.total_users) },
              {
                title: "Majority Group",
                value: ethnicity.majority_group?.label ?? "—",
                subtitle: ethnicity.majority_group
                  ? `${ethnicity.majority_group.percentage}%`
                  : undefined,
              },
              { title: "Undisclosed", value: `${ethnicity.undisclosed_percentage}%` },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[4px] bg-[#F9FAFB] p-4 text-center gap-4 flex flex-col"
              >
                <p className="font-sans text-[12px] text-[#6B6B6B]">{item.title}</p>
                <p className="font-sans text-[36px] font-bold leading-[1] text-[#5A3FE0]">
                  {item.value}
                </p>
                {item.subtitle && (
                  <p className="font-sans text-[12px] text-[#6B6B6B] font-semibold">
                    {item.subtitle}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DistributionPieChart
              title="Ethnicity Distribution"
              loading={ethnicityDistributionLoading}
              cardClassName="h-full"
              fillHeight
              data={ethnicity.distribution.map((item, i) => ({
                label: item.display_label,
                value: item.count,
                percentage: `${item.percentage}%`,
                color: GENDER_COLORS[i % GENDER_COLORS.length],
                chartValue: item.percentage,
              }))}
              showList={false}
              onFilterChange={handleEthnicityDistributionFilter}
            />
            <ProgressCard
              title="Response Breakdown"
              loading={ethnicityResponseLoading}
              filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
              filterVariant="icon"
              onFilter={handleEthnicityResponseFilter}
              items={ethnicity.response_breakdown.map((item) => ({
                label: item.label,
                value: item.percentage,
                detail: `${item.count} users`,
              }))}
            />
          </div>
        </>
      )}

      {/* ── Wellness Needs ── */}
      {activeTab === "Wellness Needs" && tabLoading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartSkeleton height="h-[300px]" />
          <ChartSkeleton height="h-[300px]" />
        </div>
      )}
      {activeTab === "Wellness Needs" && !tabLoading && wellnessNeeds && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DistributionPieChart
            title="Wellness Support Needs"
            loading={wellnessSupportLoading}
            data={wellnessNeeds.wellness_support_needs.distribution.map((item, i) => ({
              label: item.area,
              value: item.count,
              percentage: `${item.percentage}%`,
              color: GENDER_COLORS[i % GENDER_COLORS.length],
              chartValue: item.percentage,
            }))}
            showList={false}
            onFilterChange={handleWellnessSupportFilter}
          />
          <SummaryGrid
            title="Wellness Journey Progress"
            loading={wellnessJourneyLoading}
            subtitle={`${wellnessNeeds.wellness_support_needs.total_users_tracked} users tracked`}
            onFilter={handleWellnessJourneyFilter}
            items={[
              {
                label: "Active Progress",
                value: wellnessNeeds.wellness_journey_progress.active_progress.percentage,
                detail: `${wellnessNeeds.wellness_journey_progress.active_progress.users_count} users`,
                color: "#9CAF88",
                suffix: "%",
              },
              {
                label: "Goal Achievement",
                value: wellnessNeeds.wellness_journey_progress.goal_achievement.percentage,
                detail: `${wellnessNeeds.wellness_journey_progress.goal_achievement.users_count} users`,
                color: "#7B4CE2",
                suffix: "%",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

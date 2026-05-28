"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import DemographicsLoader from "@/components/loaders/demographics-loader";
import PageLayout from "@/components/layout/PageLayout";
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
  getOverview,
  type OverviewData,
  getGenderIdentity,
  type GenderItem,
  getAgeDistribution,
  type AgeItem,
  getCoreConversion,
  type CoreConversionItem,
  getGrowthTrend,
  buildTrendChartData,
  getEthnicity,
  type EthnicityData,
  getCulturalIdentity,
  type CulturalIdentityData,
  getCulturalCoreConversion,
  type CulturalCoreItem,
  getCulturalAgeDistribution,
  type CulturalAgeItem,
  getWellnessNeeds,
  type WellnessNeedsData,
} from "@/Services/api/demographics";

const demographicsData = appData.demographicsPage;
const demographicsTabsData = appData.demographics;

/* ================= TYPES ================= */

type StatItem = { title: string; value: string | number; subtitle?: string };

type DemographicTab =
  | "Overview"
  | "Gender Identity"
  | "Cultural Identity"
  | "Ethnicity"
  | "Wellness Needs";

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
const GROUP_BY_OPTIONS = ["all", "gender_identity", "cultural_identity", "ethnicity"];
const FILTER_OPTIONS = ["All", "Today", "Week", "Month", "Year", "Custom"];

/* ================= PAGE ================= */

export default function DemographicsPage() {
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<DemographicTab>("Overview");

  // Overview
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [genderDistribution, setGenderDistribution] = useState<GenderItem[]>([]);
  const [trendGroups, setTrendGroups] = useState<Parameters<typeof buildTrendChartData>[0]>([]);
  const [culturalIdentity, setCulturalIdentity] = useState<CulturalIdentityData["data"] | null>(
    null,
  );

  // Gender Identity tab
  const [ageDistribution, setAgeDistribution] = useState<AgeItem[]>([]);
  const [coreConversion, setCoreConversion] = useState<CoreConversionItem[]>([]);

  // Cultural Identity tab
  const [culturalCoreConversion, setCulturalCoreConversion] = useState<CulturalCoreItem[]>([]);
  const [culturalAgeDistribution, setCulturalAgeDistribution] = useState<CulturalAgeItem[]>([]);

  // Ethnicity tab
  const [ethnicity, setEthnicity] = useState<EthnicityData["data"] | null>(null);

  // Wellness Needs tab
  const [wellnessNeeds, setWellnessNeeds] = useState<WellnessNeedsData["data"] | null>(null);

  /* ---- Fetches ---- */

  useEffect(() => {
    if (activeTab !== "Overview") return;
    setTabLoading(true);
    Promise.all([
      getOverview(),
      getGenderIdentity(),
      getCulturalIdentity(),
      getGrowthTrend("gender_identity", "all"),
    ])
      .then(([ov, gd, ci, gt]) => {
        setOverview(ov);
        setGenderDistribution(gd.data.distribution);
        setCulturalIdentity(ci.data);
        setTrendGroups(gt.data.trend);
      })
      .finally(() => {
        setLoading(false);
        setTabLoading(false);
      });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Gender Identity") return;
    setTabLoading(true);
    Promise.all([getAgeDistribution(), getCoreConversion()])
      .then(([ad, cc]) => {
        setAgeDistribution(ad.data);
        setCoreConversion(cc.data);
      })
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Cultural Identity") return;
    setTabLoading(true);
    Promise.all([
      getCulturalIdentity({ filter: "all" }),
      getCulturalCoreConversion({ filter: "all" }),
      getCulturalAgeDistribution({ filter: "all" }),
    ])
      .then(([ci, cc, ca]) => {
        setCulturalIdentity(ci.data);
        setCulturalCoreConversion(cc.data);
        setCulturalAgeDistribution(ca.data);
      })
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Ethnicity") return;
    setTabLoading(true);
    getEthnicity({ filter: "all" })
      .then((res) => setEthnicity(res.data))
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Wellness Needs") return;
    setTabLoading(true);
    getWellnessNeeds({ filter: "all" })
      .then((res) => setWellnessNeeds(res.data))
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  if (loading) return <DemographicsLoader />;

  return (
    <PageLayout title="Demographics">
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
                  overview.data.average_age,
                ]
              : null;
            return (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={liveValues ? liveValues[i] : String(metric.value)}
                subtitle={metric.subtitle}
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
                data={genderDistribution.map((item, i) => ({
                  label: item.gender,
                  value: item.count,
                  percentage: `${item.percentage}%`,
                  color: GENDER_COLORS[i % GENDER_COLORS.length],
                  chartValue: item.percentage,
                }))}
                lastUpdated={demographicsData.genderDistribution.lastUpdated}
                innerRadius={58}
                outerRadius={100}
                startAngle={92}
                endAngle={-268}
                filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                onFilterChange={(val, range) =>
                  getGenderIdentity({ filter: val, range }).then((res) =>
                    setGenderDistribution(res.data.distribution),
                  )
                }
              />
              <HorizontalBarChart
                title="Cultural Identity Distribution"
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
                                detail: `${culturalIdentity.largest_group.percentage}%`,
                                bgColor: "#EAF3E8",
                                textColor: "#5A8C54",
                              },
                            ]
                          : []),
                        ...(culturalIdentity.least_group
                          ? [
                              {
                                title: "Smallest Group",
                                label: culturalIdentity.least_group.identity,
                                detail: `${culturalIdentity.least_group.percentage}%`,
                                bgColor: "#F5ECDA",
                                textColor: "#C47D2E",
                              },
                            ]
                          : []),
                      ]
                    : []
                }
                lastUpdated=""
                onFilterChange={(val, range) =>
                  getCulturalIdentity({ filter: val, range }).then((res) =>
                    setCulturalIdentity(res.data),
                  )
                }
              />
            </div>
            {(() => {
              const { data: trendData, series: trendSeries } = buildTrendChartData(trendGroups);
              return (
                <TrendLineChart
                  title="Demographics Growth Trend"
                  data={trendData}
                  series={trendSeries}
                  filters={[
                    { label: "Group By", options: GROUP_BY_OPTIONS },
                    { label: "Filter", options: FILTER_OPTIONS },
                  ]}
                  onFilterChange={([groupBy, filter]) =>
                    getGrowthTrend(groupBy, filter).then((res) => setTrendGroups(res.data.trend))
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
            const ageSeries = genders.map((g, i) => ({
              key: g,
              label: g,
              color: GENDER_COLORS[i % GENDER_COLORS.length],
            }));
            const insightGroups = genders.map((gender) => {
              const rows = ageDistribution
                .filter((item) => gender in item.by_gender)
                .map((item) => ({ label: item.age_range, count: item.by_gender[gender] }));
              const total = rows.reduce((sum, r) => sum + r.count, 0);
              return {
                title: gender,
                rows: rows.map((r) => {
                  const pct = total > 0 ? Math.round((r.count / total) * 100) : 0;
                  return { label: r.label, value: `${r.count} (${pct}%)`, progress: pct };
                }),
              };
            });
            const groupColors = Object.fromEntries(
              genders.map((g, i) => [g, GENDER_COLORS[i % GENDER_COLORS.length]]),
            );
            return (
              <>
                <DistributionBarChart
                  title="Age Distribution by Gender Identity"
                  data={ageChartData}
                  series={ageSeries}
                  filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                  onFilterChange={(val, range) =>
                    getAgeDistribution({ filter: val, range }).then((res) =>
                      setAgeDistribution(res.data),
                    )
                  }
                />
                <ProgressCard
                  title="Core Conversion by Gender"
                  filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                  onFilter={(filter) =>
                    getCoreConversion({ filter }).then((res) => setCoreConversion(res.data))
                  }
                  items={coreConversion.map((item) => ({
                    label: item.gender,
                    value: item.conversion_rate,
                    detail: `${item.core_users} core / ${item.total_users} total users`,
                  }))}
                />
                <InsightGrid
                  title="Gender & Age Group Insights"
                  groups={insightGroups}
                  groupColors={groupColors}
                  filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                  onFilterChange={(val, range) =>
                    getAgeDistribution({ filter: val, range }).then((res) =>
                      setAgeDistribution(res.data),
                    )
                  }
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
                <ProgressCard
                  title="Core Conversion by Cultural Identity"
                  filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                  onFilter={(filter) =>
                    getCulturalCoreConversion({ filter }).then((res) =>
                      setCulturalCoreConversion(res.data),
                    )
                  }
                  items={culturalCoreConversion.map((item) => ({
                    label: item.identity,
                    value: item.conversion_rate,
                    detail: `${item.core_users} core / ${item.total_users} total users`,
                  }))}
                />
                {(() => {
                  const identities = Array.from(
                    new Set(
                      culturalAgeDistribution.flatMap((item) => Object.keys(item.by_identity)),
                    ),
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
                      subtitle={cd.groupedBar.subtitle}
                      note={cd.groupedBar.note}
                      data={
                        culturalAgeDistribution.length > 0 ? chartData : cd.groupedBar.categories
                      }
                      series={series}
                      filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                      onFilterChange={(val, range) =>
                        getCulturalAgeDistribution({ filter: val, range }).then((res) =>
                          setCulturalAgeDistribution(res.data),
                        )
                      }
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
                cardClassName="h-full"
                fillHeight
                data={ethnicity.distribution.map((item, i) => ({
                  label: item.display_label,
                  value: item.count,
                  percentage: `${item.percentage}%`,
                  color: GENDER_COLORS[i % GENDER_COLORS.length],
                  chartValue: item.percentage,
                }))}
                lastUpdated=""
                showList={false}
                onFilterChange={(val, range) =>
                  getEthnicity({ filter: val, range }).then((res) => setEthnicity(res.data))
                }
              />
              <ProgressCard
                title="Response Breakdown"
                filterOptions={["All", "Today", "Week", "Month", "Year", "Custom"]}
                filterVariant="icon"
                onFilter={(filter) =>
                  getEthnicity({ filter }).then((res) => setEthnicity(res.data))
                }
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
              data={wellnessNeeds.wellness_support_needs.distribution.map((item, i) => ({
                label: item.area,
                value: item.count,
                percentage: `${item.percentage}%`,
                color: GENDER_COLORS[i % GENDER_COLORS.length],
                chartValue: item.percentage,
              }))}
              lastUpdated=""
              showList={false}
              onFilterChange={(val, range) =>
                getWellnessNeeds({ filter: val, range }).then((res) => setWellnessNeeds(res.data))
              }
            />
            <SummaryGrid
              title="Wellness Journey Progress"
              subtitle={`${wellnessNeeds.wellness_support_needs.total_users_tracked} users tracked`}
              onFilter={(val, range) =>
                getWellnessNeeds({ filter: val, range }).then((res) => setWellnessNeeds(res.data))
              }
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
    </PageLayout>
  );
}

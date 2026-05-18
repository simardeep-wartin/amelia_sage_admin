"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useMemo, useState, useEffect } from "react";
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

const demographicsData = appData.demographicsPage;
const demographicsTabsData = appData.demographics;

/* ================= TYPES ================= */

type StatItem = {
  title: string;
  value: string | number;
  subtitle?: string;
};

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

export default function DemographicsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DemographicTab>("Overview");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeData = useMemo(() => {
    if (activeTab === "Overview") return null;
    if (activeTab === "Gender Identity") return demographicsTabsData.gender_identity;
    if (activeTab === "Cultural Identity") return demographicsTabsData.cultural_identity;
    if (activeTab === "Ethnicity") return demographicsTabsData.ethnicity;
    return demographicsTabsData.wellness_needs;
  }, [activeTab]);

  if (loading) return <DemographicsLoader />;

  return (
    <PageLayout title="Demographics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 s:flex-row s:items-center s:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-arial text-[24px] font-medium leading-[32px] text-customBlack">
              {demographicsData.header.title}
            </h1>
            <p className="font-arial text-[14px] leading-[20px] text-[#6B6B6B]">
              {demographicsData.header.breadcrumb}
            </p>
          </div>

          <Button
            className="h-12 w-full rounded-[8px] bg-sageGreen px-6 font-sans text-[16px] font-semibold leading-[1.5] text-white hover:bg-[#7F9F7B] s:w-auto s:min-w-[184px]"
            leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}
          >
            {demographicsData.header.exportButtonLabel}
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 l:grid-cols-3">
          {demographicsData.metrics.map((metric) => {
            const iconSrc = ICON_MAP[metric.iconType as IconKey] ?? "/auth/multipleUser.svg";
            return (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                iconSrc={iconSrc}
              />
            );
          })}
        </div>

        <Tabs items={DEMOGRAPHIC_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <>
            <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
              <DistributionPieChart
                title={demographicsData.genderDistribution.title}
                data={demographicsData.genderDistribution.items}
                lastUpdated={demographicsData.genderDistribution.lastUpdated}
                innerRadius={58}
                outerRadius={100}
                startAngle={92}
                endAngle={-268}
              />
              <HorizontalBarChart
                title={demographicsData.culturalDistribution.title}
                subtitle={demographicsData.culturalDistribution.subtitle}
                data={demographicsData.culturalDistribution.items}
                dataKey="users"
                labelKey="group"
                highlights={demographicsData.culturalDistribution.highlights}
                lastUpdated={demographicsData.culturalDistribution.lastUpdated}
              />
            </div>
            <TrendLineChart
              title={demographicsData.growthTrend.title}
              subtitle={demographicsData.growthTrend.subtitle}
              filters={demographicsData.growthTrend.filters}
              data={demographicsData.growthTrend.series}
              series={[
                {
                  key: "spiritualGrowthFaith",
                  label: "Spiritual Growth and Faith",
                  color: "#9CAF88",
                },
                { key: "wholeSelfRevival", label: "Whole Self Revival", color: "#D4A574" },
                { key: "relationshipHealing", label: "Relationship Healing", color: "#7B4CE2" },
                { key: "careerLeadership", label: "Career and Leadership", color: "#6B6B6B" },
              ]}
            />
          </>
        )}

        {/* Dynamic Tabs */}
        {activeTab === "Gender Identity" && activeData && (
          <>
            <DistributionBarChart
              {...activeData.groupedBar}
              data={activeData.groupedBar.categories}
            />
            <ProgressCard
              title={activeData.conversion.title}
              subtitle={activeData.conversion.subtitle}
              items={activeData.conversion.items}
            />
            <InsightGrid title={activeData.insights.title} groups={activeData.insights.groups} />
          </>
        )}

        {activeTab === "Cultural Identity" && activeData && (
          <>
            <div className="grid grid-cols-1 gap-3 m:grid-cols-2 l:grid-cols-6">
              {activeData.stats.map((item: StatItem) => (
                <div key={item.title} className="rounded-[4px] bg-[#F9FAFB] p-2 text-center">
                  <p className="font-sans text-[11px] text-[#6B6B6B]">{item.title}</p>
                  <p className="font-sans text-[16px] font-semibold text-[#8B7EC8]">{item.value}</p>
                </div>
              ))}
            </div>
            <ProgressCard
              title={activeData.progress.title}
              subtitle={activeData.progress.subtitle}
              items={activeData.progress.items}
            />
            <DistributionBarChart
              {...activeData.groupedBar}
              data={activeData.groupedBar.categories}
            />
          </>
        )}

        {activeTab === "Ethnicity" && activeData && (
          <>
            <div className="grid grid-cols-1 gap-3 l:grid-cols-2">
              {activeData.stats.map((item: StatItem) => (
                <div key={item.title} className="rounded-[4px] bg-[#F9FAFB] p-4 text-center">
                  <p className="font-sans text-[16px] text-[#6B6B6B]">{item.title}</p>
                  <p className="font-sans text-[44px] font-bold leading-[1] text-[#5A3FE0]">
                    {item.value}
                  </p>
                  {item.subtitle && (
                    <p className="font-sans text-[18px] text-[#6B6B6B]">{item.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
              <DistributionPieChart
                title={activeData.donut.title}
                data={activeData.donut.items}
                lastUpdated={activeData.donut.lastUpdated ?? ""}
                showList={false}
              />
              <ProgressCard
                title={activeData.progress.title}
                subtitle={activeData.progress.subtitle}
                items={activeData.progress.items}
              />
            </div>
          </>
        )}

        {activeTab === "Wellness Needs" && activeData && (
          <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
            <DistributionPieChart
              title={activeData.donut.title}
              data={activeData.donut.items}
              lastUpdated={activeData.donut.lastUpdated ?? ""}
              showList={false}
            />
            <SummaryGrid
              title={activeData.progress.title}
              subtitle={activeData.progress.subtitle}
              items={activeData.progress.items}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}

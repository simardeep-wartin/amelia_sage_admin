"use client";

import {
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/common/Button";
import appData from "@/data/app-data.json";
import DemographicsMetricCard from "@/components/demographics/DemographicsMetricCard";
import Tabs from "@/components/common/Tabs";
import GenderDistributionCard from "@/components/demographics/GenderDistributionCard";
import CulturalDistributionCard from "@/components/demographics/CulturalDistributionCard";
import DemographicsGrowthTrendCard from "@/components/demographics/DemographicsGrowthTrendCard";
import DonutDistributionCard from "@/components/demographics/DonutDistributionCard";
import ProgressBreakdownCard from "@/components/demographics/ProgressBreakdownCard";
import GroupedBarDistributionCard from "@/components/demographics/GroupedBarDistributionCard";
import WellnessJourneyCard from "@/components/demographics/WellnessJourneyCard";
import GenderInsightsCard from "@/components/demographics/GenderInsightsCard";

const demographicsData = appData.demographicsPage;
const demographicsTabsData = appData.demographics;


const ICON_MAP = {
  flag: "/auth/multipleUser.svg",
  check: "/auth/circleTick.svg",
  trend: "/auth/growth.svg",
};

type IconKey = keyof typeof ICON_MAP;
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


export default function DemographicsPage() {
  const [activeTab, setActiveTab] = useState<DemographicTab>("Overview");

  const activeData: any = useMemo(() => {
    if (activeTab === "Overview") return null;
    if (activeTab === "Gender Identity") return demographicsTabsData.gender_identity;
    if (activeTab === "Cultural Identity") return demographicsTabsData.cultural_identity;
    if (activeTab === "Ethnicity") return demographicsTabsData.ethnicity;
    return demographicsTabsData.wellness_needs;
  }, [activeTab]);

  return (
    <DashboardLayout title="Demographics">
      <div className="space-y-6">
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

        <div className="grid grid-cols-1 gap-4 l:grid-cols-3">
          {demographicsData.metrics.map((metric) => {
            const iconSrc =
              ICON_MAP[metric.iconType as IconKey] ?? "/auth/multipleUser.svg";
            return (
              <DemographicsMetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={iconSrc}
              />
            );
          })}
        </div>

        <Tabs items={DEMOGRAPHIC_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "Overview" ? (
          <>
            <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
              <div className="min-w-0">
                <GenderDistributionCard
                  title={demographicsData.genderDistribution.title}
                  data={demographicsData.genderDistribution.items}
                  lastUpdated={demographicsData.genderDistribution.lastUpdated}
                />
              </div>
              <div className="min-w-0">
                <CulturalDistributionCard
                  title={demographicsData.culturalDistribution.title}
                  subtitle={demographicsData.culturalDistribution.subtitle}
                  data={demographicsData.culturalDistribution.items}
                  highlights={demographicsData.culturalDistribution.highlights}
                  lastUpdated={demographicsData.culturalDistribution.lastUpdated}
                />
              </div>
            </div>

            <div className="min-w-0">
              <DemographicsGrowthTrendCard
                title={demographicsData.growthTrend.title}
                subtitle={demographicsData.growthTrend.subtitle}
                filters={demographicsData.growthTrend.filters}
                data={demographicsData.growthTrend.series}
              />
            </div>
          </>
        ) : null}

        {activeTab === "Gender Identity" ? (
          <>
            <div className="min-w-0">
              <GroupedBarDistributionCard
                title={activeData.groupedBar.title}
                subtitle={activeData.groupedBar.subtitle}
                categories={activeData.groupedBar.categories}
                series={activeData.groupedBar.series}
                maxY={activeData.groupedBar.maxY}
              />
            </div>
            <div className="min-w-0">
              <ProgressBreakdownCard
                title={activeData.conversion.title}
                subtitle={activeData.conversion.subtitle}
                items={activeData.conversion.items}
              />
            </div>
            <div className="min-w-0">
              <GenderInsightsCard title={activeData.insights.title} groups={activeData.insights.groups} />
            </div>
          </>
        ) : null}

        {activeTab === "Cultural Identity" ? (
          <>
            {activeData.stats?.length ? (
              <div className="grid grid-cols-1 gap-3 m:grid-cols-2 l:grid-cols-6">
                {activeData.stats.map((item) => (
                  <div key={item.title} className="rounded-[4px] bg-[#F9FAFB] p-2 text-center">
                    <p className="font-sans text-[11px] text-[#6B6B6B]">{item.title}</p>
                    <p className="font-sans text-[16px] font-semibold text-[#8B7EC8]">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="min-w-0">
              <ProgressBreakdownCard
                title={activeData.progress.title}
                subtitle={activeData.progress.subtitle}
                items={activeData.progress.items}
              />
            </div>
            <div className="min-w-0">
              <GroupedBarDistributionCard
                title={activeData.groupedBar.title}
                subtitle={activeData.groupedBar.subtitle}
                categories={activeData.groupedBar.categories}
                series={activeData.groupedBar.series}
                maxY={activeData.groupedBar.maxY}
                note={activeData.groupedBar.note}
              />
            </div>
          </>
        ) : null}

        {activeTab === "Ethnicity" ? (
          <>
            {activeData.stats?.length ? (
              <div className="grid grid-cols-1 gap-3 l:grid-cols-2">
                {activeData.stats.map((item) => (
                  <div key={item.title} className="rounded-[4px] bg-[#F9FAFB] p-4 text-center">
                    <p className="font-sans text-[16px] text-[#6B6B6B]">{item.title}</p>
                    <p className="font-sans text-[44px] font-bold leading-[1] text-[#5A3FE0]">{item.value}</p>
                    {item.subtitle ? <p className="font-sans text-[18px] text-[#6B6B6B]">{item.subtitle}</p> : null}
                  </div>
                ))}
              </div>
            ) : null}
            <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
              <div className="min-w-0">
                <DonutDistributionCard
                  title={activeData.donut.title}
                  subtitle={activeData.donut.subtitle}
                  items={activeData.donut.items}
                  lastUpdated={activeData.donut.lastUpdated}
                />
              </div>
              <div className="min-w-0">
                <ProgressBreakdownCard
                  title={activeData.progress.title}
                  subtitle={activeData.progress.subtitle}
                  items={activeData.progress.items}
                />
              </div>
            </div>
          </>
        ) : null}

        {activeTab === "Wellness Needs" ? (
          <div className="grid grid-cols-1 gap-4 l:grid-cols-2">
            <div className="min-w-0">
              <DonutDistributionCard
                title={activeData.donut.title}
                subtitle={activeData.donut.subtitle}
                items={activeData.donut.items}
                lastUpdated={activeData.donut.lastUpdated}
              />
            </div>
            <div className="min-w-0">
              <WellnessJourneyCard
                title={activeData.progress.title}
                subtitle={activeData.progress.subtitle}
                items={activeData.progress.items}
              />
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/common/Card";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable, { type TableColumn } from "@/components/dashboard/DataTable";
import Chart from "@/components/dashboard/Chart";
import DonutChart from "@/components/insights/DonutChart";
import EngagementBarChart from "@/components/insights/EngagementBarChart";
import insightsData from "@/data/user-insights.json";

interface UserRow extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  plan: string;
  joined: string;
  lastActive: string;
  status: string;
}

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-trendBg text-trendGreen",
  "At Risk": "bg-[#fef3c6] text-[#973c00]",
  Inactive: "bg-[#f3f4f6] text-slate",
};

const PLAN_STYLES: Record<string, string> = {
  Core: "bg-primary/10 text-primary",
  Free: "bg-gold/10 text-charcoal",
  Trial: "bg-sage/10 text-sage",
};

const USER_COLUMNS: TableColumn<UserRow>[] = [
  {
    key: "name",
    label: "Name",
    render: (value) => {
      const name = value as string;
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {initials}
          </div>
          <span className="font-medium text-charcoal">{name}</span>
        </div>
      );
    },
  },
  { key: "email", label: "Email" },
  {
    key: "plan",
    label: "Plan",
    render: (value) => (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${PLAN_STYLES[value as string] ?? ""}`}
      >
        {value as string}
      </span>
    ),
  },
  { key: "joined", label: "Joined" },
  { key: "lastActive", label: "Last Active" },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[value as string] ?? ""}`}
      >
        {value as string}
      </span>
    ),
  },
];

const FILTER_OPTIONS = ["This Week", "Last Month", "Last 6 Months", "This Year"];

export default function UserInsightsPage() {
  const [growthFilter, setGrowthFilter] = useState("Last 6 Months");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <DashboardLayout title="User Insights">
      <div className="space-y-4">
        {/* Row 1 — Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insightsData.stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Row 2 — User Growth chart + Type Breakdown donut */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <Card
            title="User Growth"
            actions={
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  className="inline-flex w-[148px] items-center justify-center gap-[10px] rounded-[9px] border-[0.6px] border-slate p-[10px] text-s text-charcoal"
                >
                  {growthFilter}
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-slate transition-transform duration-200 ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isFilterOpen && (
                  <div className="absolute top-full right-0 z-20 mt-1.5 min-w-[148px] overflow-hidden rounded-[9px] border border-border bg-paper shadow-lg">
                    {FILTER_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setGrowthFilter(option);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full px-[10px] py-2.5 text-left text-s transition-colors ${
                          growthFilter === option
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-charcoal hover:bg-primary/10"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            }
          >
            <div className="mb-4">
              <p className="font-cormorant text-xxl font-bold text-charcoal">
                {insightsData.stats[0].value}
              </p>
              <p className="text-s text-slate">{insightsData.stats[0].subtitle}</p>
            </div>
            <Chart data={insightsData.userGrowth} />
          </Card>

          <Card title="User Type Breakdown">
            <DonutChart data={insightsData.userTypeBreakdown} />
          </Card>
        </div>

        {/* Row 3 — Engagement bar chart + Wellth Plan Categories */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Engagement by Day">
            <EngagementBarChart data={insightsData.engagementByDay} />
          </Card>

          <Card title="Wellth Plan Categories">
            <div className="space-y-4">
              {insightsData.wellthPlanCategories.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-s text-charcoal">{item.label}</span>
                    <span className="text-xs text-slate">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[linear-gradient(178deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 4 — Recent Users Table */}
        <DataTable
          title="Recent Users"
          columns={USER_COLUMNS}
          rows={insightsData.recentUsers as UserRow[]}
        />
      </div>
    </DashboardLayout>
  );
}

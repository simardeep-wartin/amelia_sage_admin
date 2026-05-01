"use client";

import { useState, useEffect } from "react";

import PageLayout from "@/components/layout/PageLayout";
import Card from "@/components/common/Card";
import MetricCard from "@/components/common/MetricCard";
import FeatureBarChart from "@/components/charts/FeatureBarChart";
import UserInsightLoader from "@/components/loaders/user-insight-loader";
import appData from "@/data/app-data.json";

const insightsData = appData.userInsights;

const ICON_MAP: Record<string, string> = {
  flag: "/auth/multipleUser.svg",
  check: "/auth/goal.svg",
};

export default function UserInsightsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <UserInsightLoader />;

  return (
    <PageLayout title="User Insights">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-l font-medium text-charcoal">User Insights</h1>
          <p className="text-s text-grey">Dashboard / Overview / User Insights</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {insightsData.metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              subtitle={metric.trend}
              subtitleColor="#00a63e"
              iconSrc={ICON_MAP[metric.iconType] ?? "/auth/goal.svg"}
            />
          ))}
        </div>

        <Card title="Feature Usage Breakdown">
          <FeatureBarChart data={insightsData.featureUsage} />
        </Card>

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
    </PageLayout>
  );
}

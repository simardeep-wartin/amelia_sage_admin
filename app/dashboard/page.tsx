"use client";

import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import DashboardLoader from "@/components/loaders/dashboard-loader";
import DashboardLeftPanel from "@/components/dashboard/DashboardLeftPanel";
import DashboardRightPanel from "@/components/dashboard/DashboardRightPanel";
import {
  getDashboardOverview,
  type DashboardOverviewData,
  getWealthPlan,
  type WealthPlanItem,
  getPlanTypes,
  type PlanTypesData,
} from "@/Services/api/dashboard";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeUsersFilter, setActiveUsersFilter] = useState("All");
  const [progressFilter, setProgressFilter] = useState("All");
  const [distributionFilter, setDistributionFilter] = useState("All");
  const [wealthPlan, setWealthPlan] = useState<WealthPlanItem[]>([]);
  const [planTypes, setPlanTypes] = useState<PlanTypesData | undefined>(undefined);
  const [overviewData, setOverviewData] = useState<DashboardOverviewData | undefined>(undefined);

  useEffect(() => {
    Promise.all([
      getWealthPlan({ filter: "all" }),
      getPlanTypes({ filter: "all" }),
      getDashboardOverview(),
    ])
      .then(([wp, pt, ov]) => {
        setWealthPlan(wp.data);
        setPlanTypes(pt.data);
        setOverviewData(ov.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLoader />;

  const handleProgressFilterChange = (
    val: string,
    range?: { from: Date | null; to: Date | null },
  ) => {
    setProgressFilter(val);
    getWealthPlan({ filter: val, range }).then((res) => setWealthPlan(res.data));
  };

  const handleDistributionFilterChange = (
    val: string,
    range?: { from: Date | null; to: Date | null },
  ) => {
    setDistributionFilter(val);
    getPlanTypes({ filter: val, range }).then((res) => setPlanTypes(res.data));
  };

  return (
    <PageLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <DashboardLeftPanel
          activeUsersFilter={activeUsersFilter}
          onActiveUsersFilterChange={setActiveUsersFilter}
          progressFilter={progressFilter}
          onProgressFilterChange={handleProgressFilterChange}
          distributionFilter={distributionFilter}
          onDistributionFilterChange={handleDistributionFilterChange}
          wealthPlanItems={wealthPlan}
          planTypes={planTypes}
          overviewData={overviewData}
        />
        <DashboardRightPanel overviewData={overviewData} />
      </div>
    </PageLayout>
  );
}

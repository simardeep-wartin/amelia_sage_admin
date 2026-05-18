"use client";

import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import DashboardLoader from "@/components/loaders/dashboard-loader";
import DashboardLeftPanel from "@/components/dashboard/DashboardLeftPanel";
import DashboardRightPanel from "@/components/dashboard/DashboardRightPanel";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeUsersFilter, setActiveUsersFilter] = useState("This Week");
  const [progressFilter, setProgressFilter] = useState("This Week");
  const [distributionFilter, setDistributionFilter] = useState("This Week");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardLoader />;

  return (
    <PageLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <DashboardLeftPanel
          activeUsersFilter={activeUsersFilter}
          onActiveUsersFilterChange={setActiveUsersFilter}
          progressFilter={progressFilter}
          onProgressFilterChange={setProgressFilter}
          distributionFilter={distributionFilter}
          onDistributionFilterChange={setDistributionFilter}
        />
        <DashboardRightPanel />
      </div>
    </PageLayout>
  );
}

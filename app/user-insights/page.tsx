"use client";

import UserInsightLoader from "@/components/loaders/user-insight-loader";
import PageLayout from "@/components/layout/PageLayout";
import UserInsightsMain from "@/components/user-insights/UserInsightsMain";
import { useUserInsights } from "@/hooks/useUserInsights";

export default function UserInsightsPage() {
  const { loading, ...rest } = useUserInsights();

  if (loading) return <UserInsightLoader />;

  return (
    <PageLayout title="User Insights">
      <UserInsightsMain {...rest} />
    </PageLayout>
  );
}

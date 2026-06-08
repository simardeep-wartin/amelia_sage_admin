"use client";

import WellthPlanLoader from "@/components/loaders/wellth-plan-loader";
import PageLayout from "@/components/layout/PageLayout";
import WellthPlansMain from "@/components/wellth-plans/WellthPlansMain";
import { useWellthPlans } from "@/hooks/useWellthPlans";

export default function WellthPlansPage() {
  const { loading, ...rest } = useWellthPlans();

  if (loading) return <WellthPlanLoader />;

  return (
    <PageLayout title="Wellth Plans">
      <WellthPlansMain {...rest} />
    </PageLayout>
  );
}

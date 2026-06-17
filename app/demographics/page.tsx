"use client";

import DemographicsLoader from "@/components/loaders/demographics-loader";
import PageLayout from "@/components/layout/PageLayout";
import DemographicsMain from "@/components/demographics/DemographicsMain";
import { useDemographics } from "@/hooks/useDemographics";

export default function DemographicsPage() {
  const { loading, ...rest } = useDemographics();

  if (loading) return <DemographicsLoader />;

  return (
    <PageLayout title="Demographics">
      <DemographicsMain {...rest} />
    </PageLayout>
  );
}

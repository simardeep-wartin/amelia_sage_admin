"use client";

import WorkOnMeLoader from "@/components/loaders/work-on-me-loader";
import PageLayout from "@/components/layout/PageLayout";
import WorkOnMeMain from "@/components/work-on-me/WorkOnMeMain";
import { useWorkOnMe } from "@/hooks/useWorkOnMe";

export default function WorkOnMeExercisesPage() {
  const { loading, ...rest } = useWorkOnMe();

  if (loading) return <WorkOnMeLoader />;

  return (
    <PageLayout title="Work on Me Exercises">
      <WorkOnMeMain {...rest} />
    </PageLayout>
  );
}

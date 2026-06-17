"use client";

import { useState, useEffect } from "react";
import {
  getUserInsightsOverview,
  type UserInsightsOverviewData,
  getFeatureUsage,
  type FeatureUsageItem,
} from "@/Services/api/userInsights";

export function useUserInsights() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<UserInsightsOverviewData | null>(null);
  const [featureUsage, setFeatureUsage] = useState<FeatureUsageItem[] | null>(null);
  const [featureFilter, setFeatureFilter] = useState("All");

  useEffect(() => {
    Promise.all([getUserInsightsOverview(), getFeatureUsage({ filter: "all" })])
      .then(([ov, fu]) => {
        setOverview(ov.data);
        setFeatureUsage(fu.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFeatureFilter = (val: string, range?: { from: Date | null; to: Date | null }) => {
    setFeatureFilter(val);
    getFeatureUsage({ filter: val, range }).then((res) => setFeatureUsage(res.data));
  };

  return { loading, overview, featureUsage, featureFilter, handleFeatureFilter };
}

export type UserInsightsState = ReturnType<typeof useUserInsights>;

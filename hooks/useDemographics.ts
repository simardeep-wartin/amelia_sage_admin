"use client";

import { useState, useEffect } from "react";
import {
  getOverview,
  type OverviewData,
  getGenderIdentity,
  type GenderItem,
  getAgeDistribution,
  type AgeItem,
  getCoreConversion,
  type CoreConversionItem,
  getGrowthTrend,
  type buildTrendChartData,
  getEthnicity,
  type EthnicityData,
  getCulturalIdentity,
  type CulturalIdentityData,
  getCulturalCoreConversion,
  type CulturalCoreItem,
  getCulturalAgeDistribution,
  type CulturalAgeItem,
  getWellnessNeeds,
  type WellnessNeedsData,
} from "@/Services/api/demographics";

export type DemographicTab =
  | "Overview"
  | "Gender Identity"
  | "Cultural Identity"
  | "Ethnicity"
  | "Wellness Needs";

type FilterRange = { from: Date | null; to: Date | null };

export function useDemographics() {
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<DemographicTab>("Overview");

  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [genderDistribution, setGenderDistribution] = useState<GenderItem[]>([]);
  const [trendGroups, setTrendGroups] = useState<Parameters<typeof buildTrendChartData>[0]>([]);
  const [culturalIdentity, setCulturalIdentity] = useState<CulturalIdentityData["data"] | null>(
    null,
  );
  const [ageDistribution, setAgeDistribution] = useState<AgeItem[]>([]);
  const [coreConversion, setCoreConversion] = useState<CoreConversionItem[]>([]);
  const [culturalCoreConversion, setCulturalCoreConversion] = useState<CulturalCoreItem[]>([]);
  const [culturalAgeDistribution, setCulturalAgeDistribution] = useState<CulturalAgeItem[]>([]);
  const [ethnicity, setEthnicity] = useState<EthnicityData["data"] | null>(null);
  const [wellnessNeeds, setWellnessNeeds] = useState<WellnessNeedsData["data"] | null>(null);

  useEffect(() => {
    if (activeTab !== "Overview") return;
    setTabLoading(true);
    Promise.all([
      getOverview(),
      getGenderIdentity(),
      getCulturalIdentity(),
      getGrowthTrend("gender_identity", "all"),
    ])
      .then(([ov, gd, ci, gt]) => {
        setOverview(ov);
        setGenderDistribution(gd.data.distribution);
        setCulturalIdentity(ci.data);
        setTrendGroups(gt.data.trend);
      })
      .finally(() => {
        setLoading(false);
        setTabLoading(false);
      });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Gender Identity") return;
    setTabLoading(true);
    Promise.all([getAgeDistribution(), getCoreConversion()])
      .then(([ad, cc]) => {
        setAgeDistribution(ad.data);
        setCoreConversion(cc.data);
      })
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Cultural Identity") return;
    setTabLoading(true);
    Promise.all([
      getCulturalIdentity({ filter: "all" }),
      getCulturalCoreConversion({ filter: "all" }),
      getCulturalAgeDistribution({ filter: "all" }),
    ])
      .then(([ci, cc, ca]) => {
        setCulturalIdentity(ci.data);
        setCulturalCoreConversion(cc.data);
        setCulturalAgeDistribution(ca.data);
      })
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Ethnicity") return;
    setTabLoading(true);
    getEthnicity({ filter: "all" })
      .then((res) => setEthnicity(res.data))
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Wellness Needs") return;
    setTabLoading(true);
    getWellnessNeeds({ filter: "all" })
      .then((res) => setWellnessNeeds(res.data))
      .finally(() => setTabLoading(false));
  }, [activeTab]);

  const [genderLoading, setGenderLoading] = useState(false);
  const [culturalIdentityLoading, setCulturalIdentityLoading] = useState(false);
  const [growthTrendLoading, setGrowthTrendLoading] = useState(false);
  const [ageDistributionLoading, setAgeDistributionLoading] = useState(false);
  const [insightGridLoading, setInsightGridLoading] = useState(false);
  const [coreConversionLoading, setCoreConversionLoading] = useState(false);
  const [culturalCoreConversionLoading, setCulturalCoreConversionLoading] = useState(false);
  const [culturalAgeDistributionLoading, setCulturalAgeDistributionLoading] = useState(false);
  const [ethnicityDistributionLoading, setEthnicityDistributionLoading] = useState(false);
  const [ethnicityResponseLoading, setEthnicityResponseLoading] = useState(false);
  const [wellnessSupportLoading, setWellnessSupportLoading] = useState(false);
  const [wellnessJourneyLoading, setWellnessJourneyLoading] = useState(false);

  const handleGenderFilter = (val: string, range?: FilterRange) => {
    setGenderLoading(true);
    getGenderIdentity({ filter: val, range })
      .then((res) => setGenderDistribution(res.data.distribution))
      .finally(() => setGenderLoading(false));
  };

  const handleCulturalIdentityFilter = (val: string, range?: FilterRange) => {
    setCulturalIdentityLoading(true);
    getCulturalIdentity({ filter: val, range })
      .then((res) => setCulturalIdentity(res.data))
      .finally(() => setCulturalIdentityLoading(false));
  };

  const handleGrowthTrendFilter = ([groupBy, filter]: string[]) => {
    setGrowthTrendLoading(true);
    getGrowthTrend(groupBy, filter)
      .then((res) => setTrendGroups(res.data.trend))
      .finally(() => setGrowthTrendLoading(false));
  };

  const handleAgeDistributionFilter = (val: string, range?: FilterRange) => {
    setAgeDistributionLoading(true);
    getAgeDistribution({ filter: val, range })
      .then((res) => setAgeDistribution(res.data))
      .finally(() => setAgeDistributionLoading(false));
  };

  const handleInsightGridFilter = (val: string, range?: FilterRange) => {
    setInsightGridLoading(true);
    getAgeDistribution({ filter: val, range })
      .then((res) => setAgeDistribution(res.data))
      .finally(() => setInsightGridLoading(false));
  };

  const handleCoreConversionFilter = (filter: string) => {
    setCoreConversionLoading(true);
    getCoreConversion({ filter })
      .then((res) => setCoreConversion(res.data))
      .finally(() => setCoreConversionLoading(false));
  };

  const handleCulturalCoreConversionFilter = (filter: string) => {
    setCulturalCoreConversionLoading(true);
    getCulturalCoreConversion({ filter })
      .then((res) => setCulturalCoreConversion(res.data))
      .finally(() => setCulturalCoreConversionLoading(false));
  };

  const handleCulturalAgeDistributionFilter = (val: string, range?: FilterRange) => {
    setCulturalAgeDistributionLoading(true);
    getCulturalAgeDistribution({ filter: val, range })
      .then((res) => setCulturalAgeDistribution(res.data))
      .finally(() => setCulturalAgeDistributionLoading(false));
  };

  const handleEthnicityDistributionFilter = (val: string, range?: FilterRange) => {
    setEthnicityDistributionLoading(true);
    getEthnicity({ filter: val, range })
      .then((res) => setEthnicity(res.data))
      .finally(() => setEthnicityDistributionLoading(false));
  };

  const handleEthnicityResponseFilter = (val: string, range?: FilterRange) => {
    setEthnicityResponseLoading(true);
    getEthnicity({ filter: val, range })
      .then((res) => setEthnicity(res.data))
      .finally(() => setEthnicityResponseLoading(false));
  };

  const handleWellnessSupportFilter = (val: string, range?: FilterRange) => {
    setWellnessSupportLoading(true);
    getWellnessNeeds({ filter: val, range })
      .then((res) => setWellnessNeeds(res.data))
      .finally(() => setWellnessSupportLoading(false));
  };

  const handleWellnessJourneyFilter = (val: string, range?: FilterRange) => {
    setWellnessJourneyLoading(true);
    getWellnessNeeds({ filter: val, range })
      .then((res) => setWellnessNeeds(res.data))
      .finally(() => setWellnessJourneyLoading(false));
  };

  return {
    loading,
    tabLoading,
    activeTab,
    setActiveTab,
    overview,
    genderDistribution,
    trendGroups,
    culturalIdentity,
    ageDistribution,
    coreConversion,
    culturalCoreConversion,
    culturalAgeDistribution,
    ethnicity,
    wellnessNeeds,
    genderLoading,
    culturalIdentityLoading,
    growthTrendLoading,
    ageDistributionLoading,
    insightGridLoading,
    coreConversionLoading,
    culturalCoreConversionLoading,
    culturalAgeDistributionLoading,
    ethnicityDistributionLoading,
    ethnicityResponseLoading,
    wellnessSupportLoading,
    wellnessJourneyLoading,
    handleGenderFilter,
    handleCulturalIdentityFilter,
    handleGrowthTrendFilter,
    handleAgeDistributionFilter,
    handleInsightGridFilter,
    handleCoreConversionFilter,
    handleCulturalCoreConversionFilter,
    handleCulturalAgeDistributionFilter,
    handleEthnicityDistributionFilter,
    handleEthnicityResponseFilter,
    handleWellnessSupportFilter,
    handleWellnessJourneyFilter,
  };
}

export type DemographicsState = ReturnType<typeof useDemographics>;

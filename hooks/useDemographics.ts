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

  const handleGenderFilter = (val: string, range?: FilterRange) =>
    getGenderIdentity({ filter: val, range }).then((res) =>
      setGenderDistribution(res.data.distribution),
    );

  const handleCulturalIdentityFilter = (val: string, range?: FilterRange) =>
    getCulturalIdentity({ filter: val, range }).then((res) => setCulturalIdentity(res.data));

  const handleGrowthTrendFilter = ([groupBy, filter]: string[]) =>
    getGrowthTrend(groupBy, filter).then((res) => setTrendGroups(res.data.trend));

  const handleAgeDistributionFilter = (val: string, range?: FilterRange) =>
    getAgeDistribution({ filter: val, range }).then((res) => setAgeDistribution(res.data));

  const handleCoreConversionFilter = (filter: string) =>
    getCoreConversion({ filter }).then((res) => setCoreConversion(res.data));

  const handleCulturalCoreConversionFilter = (filter: string) =>
    getCulturalCoreConversion({ filter }).then((res) => setCulturalCoreConversion(res.data));

  const handleCulturalAgeDistributionFilter = (val: string, range?: FilterRange) =>
    getCulturalAgeDistribution({ filter: val, range }).then((res) =>
      setCulturalAgeDistribution(res.data),
    );

  const handleEthnicityFilter = (val: string, range?: FilterRange) =>
    getEthnicity({ filter: val, range }).then((res) => setEthnicity(res.data));

  const handleWellnessNeedsFilter = (val: string, range?: FilterRange) =>
    getWellnessNeeds({ filter: val, range }).then((res) => setWellnessNeeds(res.data));

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
    handleGenderFilter,
    handleCulturalIdentityFilter,
    handleGrowthTrendFilter,
    handleAgeDistributionFilter,
    handleCoreConversionFilter,
    handleCulturalCoreConversionFilter,
    handleCulturalAgeDistributionFilter,
    handleEthnicityFilter,
    handleWellnessNeedsFilter,
  };
}

export type DemographicsState = ReturnType<typeof useDemographics>;

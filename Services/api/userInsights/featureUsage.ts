import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "@/Services/api/demographics/utils";

export type FeatureUsageItem = {
  feature: string;
  count: number;
};

export const getFeatureUsage = (params?: FilterParams) =>
  clientApi.get<{ data: FeatureUsageItem[] }>(
    `${ENDPOINTS.userInsights.featureUsage}${buildFilterQuery(params)}`,
  );

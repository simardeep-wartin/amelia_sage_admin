import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type CulturalAgeItem = {
  age_range: string;
  by_identity: Record<string, number>;
};

export const getCulturalAgeDistribution = (params?: FilterParams) =>
  clientApi.get<{ data: CulturalAgeItem[] }>(
    `${ENDPOINTS.demographics.culturalAgeDistribution}${buildFilterQuery(params)}`,
  );

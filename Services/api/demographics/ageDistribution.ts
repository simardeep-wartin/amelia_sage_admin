import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type AgeItem = { age_range: string; by_gender: Record<string, number> };

export const getAgeDistribution = (params?: FilterParams) =>
  clientApi.get<{ data: AgeItem[] }>(
    `${ENDPOINTS.demographics.ageDistribution}${buildFilterQuery(params)}`,
  );

import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type CulturalCoreItem = {
  identity: string;
  total_users: number;
  core_users: number;
  conversion_rate: number;
};

export const getCulturalCoreConversion = (params?: FilterParams) =>
  clientApi.get<{ data: CulturalCoreItem[] }>(
    `${ENDPOINTS.demographics.culturalCoreConversion}${buildFilterQuery(params)}`,
  );

import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type CulturalIdentityData = {
  data: {
    total_users: number;
    distinct_identities: number;
    largest_group: { identity: string; count: number; percentage: number };
    least_group: { identity: string; count: number; percentage: number };
    distribution: { identity: string; count: number; percentage: number }[];
  };
};

export const getCulturalIdentity = (params?: FilterParams) =>
  clientApi.get<CulturalIdentityData>(
    `${ENDPOINTS.demographics.culturalIdentity}${buildFilterQuery(params)}`,
  );

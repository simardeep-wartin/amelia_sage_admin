import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type GenderItem = { gender: string; count: number; percentage: number };

export type GenderIdentityResponse = {
  data: { total_users: number; distribution: GenderItem[] };
};

export const getGenderIdentity = (params?: FilterParams) =>
  clientApi.get<GenderIdentityResponse>(
    `${ENDPOINTS.demographics.genderIdentity}${buildFilterQuery(params)}`,
  );

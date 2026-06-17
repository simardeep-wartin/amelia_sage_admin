import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "@/Services/api/demographics/utils";

export type PlanTypesData = {
  premium: number;
  free: number;
  most_completed_feeling_category: { category: string };
};

export const getPlanTypes = (params?: FilterParams) =>
  clientApi.get<{ data: PlanTypesData }>(
    `${ENDPOINTS.dashboard.planTypes}${buildFilterQuery(params)}`,
  );

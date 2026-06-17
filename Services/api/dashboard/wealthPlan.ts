import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "@/Services/api/demographics/utils";

export type WealthPlanItem = {
  category_id: string;
  title: string;
  total_exercises: number;
  total_completions: number;
  percentage: number;
};

export const getWealthPlan = (params?: FilterParams) =>
  clientApi.get<{ data: WealthPlanItem[] }>(
    `${ENDPOINTS.dashboard.wealthPlan}${buildFilterQuery(params)}`,
  );

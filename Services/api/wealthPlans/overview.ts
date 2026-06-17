import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type WealthPlansOverviewData = {
  active_plans: number;
  total_participants: number;
  average_completion: number;
  new_this_month: number;
};

export const getWealthPlansOverview = () =>
  clientApi.get<{ data: WealthPlansOverviewData }>(ENDPOINTS.wealthPlans.overview);

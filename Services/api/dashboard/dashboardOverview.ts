import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type DashboardOverviewData = {
  journals: {
    total: number;
    users_with_at_least_one: number;
  };
  sage: {
    voice_interactions: number;
    total_threads: number;
  };
};

export const getDashboardOverview = () =>
  clientApi.get<{ data: DashboardOverviewData }>(ENDPOINTS.dashboard.overview);

import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type DashboardOverviewData = {
  journals: {
    total: number;
    users_with_at_least_one: number;
  };
  exercises: {
    users_with_at_least_one: number;
  };
  sage: {
    voice_interactions: number;
    total_threads: number;
    satisfaction: number | null;
  };
  most_completed_feeling_category: { category: string } | null;
  content: {
    mindful_total_exercises: number;
    calm_total_tutorials: number;
  };
};

export const getDashboardOverview = () =>
  clientApi.get<{ data: DashboardOverviewData }>(ENDPOINTS.dashboard.overview);

export type ActiveUsersData = {
  value: number;
  total_users: number;
  trend_pct: number;
  chart: { label: string; value: number }[];
};

export const getActiveUsers = () =>
  clientApi.get<{ data: ActiveUsersData }>(ENDPOINTS.dashboard.activeUsers);

import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type UserInsightsOverviewData = {
  total_users: number;
  goal_completion: {
    percentage: number;
    completed: number;
    total_possible: number;
  };
  demographics: {
    top_age_groups: {
      age_range: string;
      percentage: number;
    }[];
  };
};

export const getUserInsightsOverview = () =>
  clientApi.get<{ data: UserInsightsOverviewData }>(ENDPOINTS.userInsights.overview);

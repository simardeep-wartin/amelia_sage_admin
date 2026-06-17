import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type WellnessNeedsData = {
  data: {
    wellness_support_needs: {
      total_users_tracked: number;
      distribution: { area: string; count: number; percentage: number }[];
    };
    wellness_journey_progress: {
      active_progress: { percentage: number; users_count: number };
      goal_achievement: { percentage: number; users_count: number };
    };
  };
};

export const getWellnessNeeds = (params?: FilterParams) =>
  clientApi.get<WellnessNeedsData>(
    `${ENDPOINTS.demographics.wellnessNeeds}${buildFilterQuery(params)}`,
  );

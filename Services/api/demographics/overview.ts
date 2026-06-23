import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type OverviewData = {
  data: {
    total_users: number;
    new_this_month: number;
    new_last_month: number;
    growth_percentage: number;
    average_age: string;
  };
};

export const getOverview = () => clientApi.get<OverviewData>(ENDPOINTS.demographics.overview);

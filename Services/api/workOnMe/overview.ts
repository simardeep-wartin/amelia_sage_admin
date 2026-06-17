import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type WorkOnMeOverviewData = {
  total_emotional_flows: number;
  focus_areas: number;
  total_exercises: number;
};

export const getWorkOnMeOverview = () =>
  clientApi.get<{ data: WorkOnMeOverviewData }>(ENDPOINTS.workOnMe.overview);

import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type FeelingItem = {
  id: string;
  title: string;
  sub_content: string;
  image_url: string;
  description: string;
  sub_title: string;
  exercise_count: number;
};

export const getFeelings = () =>
  clientApi.get<{ data: FeelingItem[] }>(ENDPOINTS.workOnMe.feelings);

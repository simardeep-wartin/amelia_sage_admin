import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type FeelingItem = {
  id: string;
  title: string;
  greet: string;
  sub_content: string;
  sub_title: string;
  description: string;
  image_url: string;
  exercise_count: number;
  intro_is_draft?: boolean;
};

export const getFeelings = () =>
  clientApi.get<{ data: FeelingItem[] }>(ENDPOINTS.workOnMe.feelings);

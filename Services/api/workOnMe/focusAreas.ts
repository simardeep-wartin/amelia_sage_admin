import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type FocusAreaItem = {
  id: string;
  title: string;
  sub_title: string;
  sub_content: string;
  image_url: string;
  description: string;
  sort_order: number;
  exercise_count: number;
};

export const getFocusAreas = () =>
  clientApi.get<{ data: FocusAreaItem[] }>(ENDPOINTS.workOnMe.focusAreas);

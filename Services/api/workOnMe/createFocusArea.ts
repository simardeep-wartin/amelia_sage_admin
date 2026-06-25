import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { FocusAreaItem } from "./focusAreas";

export type CreateFocusAreaPayload = {
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
};

export const createFocusArea = (payload: CreateFocusAreaPayload) =>
  clientApi.post<{ data: FocusAreaItem }>(ENDPOINTS.workOnMe.focusAreas, payload);

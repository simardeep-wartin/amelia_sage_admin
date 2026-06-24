import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type UpdateFocusAreaPayload = {
  title: string;
  description: string;
  image_url: string;
};

export const updateFocusArea = (id: string, payload: UpdateFocusAreaPayload) =>
  clientApi.put<{ data: unknown }>(ENDPOINTS.workOnMe.focusArea(id), payload);

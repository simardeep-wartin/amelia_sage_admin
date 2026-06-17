import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type UpdateFeelingPayload = {
  title: string;
  sub_title: string;
  image_url: string;
};

export const updateFeeling = (id: string, payload: UpdateFeelingPayload) =>
  clientApi.put<{ data: unknown }>(ENDPOINTS.workOnMe.feeling(id), payload);

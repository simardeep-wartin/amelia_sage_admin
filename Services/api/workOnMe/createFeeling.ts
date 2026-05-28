import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { FeelingItem } from "./feelings";

export type CreateFeelingPayload = {
  title: string;
  sub_title: string;
  image_url: string;
};

export const createFeeling = (payload: CreateFeelingPayload) =>
  clientApi.post<{ data: FeelingItem }>(ENDPOINTS.workOnMe.feelings, payload);

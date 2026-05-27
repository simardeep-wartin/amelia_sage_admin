import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type FeelingIntroScreenPayload = {
  subtitle: string;
  sage_says: string;
  description: string;
  is_draft: boolean;
};

export const updateFeelingIntroScreen = (id: string, payload: FeelingIntroScreenPayload) =>
  clientApi.put<{ data: unknown }>(ENDPOINTS.workOnMe.feelingIntroScreen(id), payload);

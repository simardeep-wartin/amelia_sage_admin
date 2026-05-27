import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type FocusAreaIntroScreenPayload = {
  subtitle: string;
  sage_says: string;
  description: string;
  is_draft: boolean;
};

export const updateFocusAreaIntroScreen = (id: string, payload: FocusAreaIntroScreenPayload) =>
  clientApi.put<{ data: unknown }>(ENDPOINTS.workOnMe.focusAreaIntroScreen(id), payload);

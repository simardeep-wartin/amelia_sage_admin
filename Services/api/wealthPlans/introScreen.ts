import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type IntroScreenPayload = {
  subtitle: string;
  sage_says: string;
  description: string;
  intro_title?: string;
  intro_description?: string;
  focused_intentions?: string[];
  is_draft?: boolean;
};

export const updateIntroScreen = (planId: string, payload: IntroScreenPayload) =>
  clientApi.put<{ data: unknown }>(ENDPOINTS.wealthPlans.introScreen(planId), payload);

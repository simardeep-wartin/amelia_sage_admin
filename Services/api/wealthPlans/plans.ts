import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type WealthPlan = {
  id: string;
  title: string;
  sub_title: string;
  sub_content: string;
  description: string;
  greet: string;
  intro_title: string;
  intro_description: string;
  focused_intentions: string[];
  image_url: string;
  exercise_count: number;
  intro_is_draft?: boolean;
};

export const getWealthPlans = () =>
  clientApi.get<{ data: WealthPlan[] }>(ENDPOINTS.wealthPlans.list);

export type CreateWealthPlanPayload = {
  title: string;
  sub_title: string;
  description?: string;
  image_url?: string;
  focused_intentions?: string[];
  intro_title?: string;
  intro_description?: string;
};

export const createWealthPlan = (payload: CreateWealthPlanPayload) =>
  clientApi.post<{ data: WealthPlan }>(ENDPOINTS.wealthPlans.list, payload);

export type UpdateWealthPlanPayload = {
  title: string;
  sub_title: string;
};

export const updateWealthPlan = (id: string, payload: UpdateWealthPlanPayload) =>
  clientApi.put<{ data: WealthPlan }>(ENDPOINTS.wealthPlans.update(id), payload);

export const deleteWealthPlan = (id: string) =>
  clientApi.delete<void>(ENDPOINTS.wealthPlans.delete(id));

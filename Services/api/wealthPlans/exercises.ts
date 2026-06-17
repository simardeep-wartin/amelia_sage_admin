import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type WealthPlanExercise = {
  id: string;
  title: string;
  description: string;
  wealth_plan_category_id: string;
};

export type WealthPlanExercisesData = {
  category_id: string;
  title: string;
  sub_title: string;
  intro_title: string;
  intro_description: string;
  focused_intentions: string[];
  is_draft: boolean;
  exercises: WealthPlanExercise[];
};

export const getWealthPlanExercises = (planId: string) =>
  clientApi.get<{ data: WealthPlanExercisesData }>(ENDPOINTS.wealthPlans.exercises(planId));

export type CreateExercisePayload = {
  title: string;
  description: string;
  is_draft?: boolean;
};

export const createWealthPlanExercise = (planId: string, payload: CreateExercisePayload) =>
  clientApi.post<{ data: WealthPlanExercise }>(ENDPOINTS.wealthPlans.exercises(planId), payload);

export type UpdateExercisePayload = {
  title: string;
  description: string;
  is_draft?: boolean;
};

export const updateWealthPlanExercise = (
  planId: string,
  exerciseId: string,
  payload: UpdateExercisePayload,
) =>
  clientApi.put<{ data: WealthPlanExercise }>(
    ENDPOINTS.wealthPlans.exerciseUpdate(planId, exerciseId),
    payload,
  );

export const deleteWealthPlanExercise = (planId: string, exerciseId: string) =>
  clientApi.delete<{ status: boolean }>(ENDPOINTS.wealthPlans.exerciseUpdate(planId, exerciseId));

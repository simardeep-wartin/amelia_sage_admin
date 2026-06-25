import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { ExerciseDraftEntry } from "@/types";
import {
  updateFeelingExercise,
  updateFocusAreaExercise,
  deleteFeelingExercise,
  deleteFocusAreaExercise,
} from "@/Services/api/workOnMe";
import {
  updateWealthPlanExercise,
  deleteWealthPlanExercise,
} from "@/Services/api/wealthPlans/exercises";

export type JournalExercisesParams = {
  source?: "work_on_me" | "wealth_plan";
  search?: string;
  page: number;
  page_size: number;
};

export type JournalExercisesResponse = {
  data: {
    total: number;
    page: number;
    page_size: number;
    items: ExerciseDraftEntry[];
  };
};

export type UpdateExerciseDraftPayload = { title: string; description: string };

export function updateJournalExercise(
  entry: ExerciseDraftEntry,
  payload: UpdateExerciseDraftPayload,
) {
  const { id, category_id, sub_type } = entry;
  if (!category_id) return Promise.reject(new Error("Missing category_id"));
  if (sub_type === "feelings")
    return updateFeelingExercise(category_id, id, { ...payload, is_draft: true });
  if (sub_type === "focus")
    return updateFocusAreaExercise(category_id, id, { ...payload, is_draft: true });
  if (sub_type === "wealth_plan")
    return updateWealthPlanExercise(category_id, id, { ...payload, is_draft: true });
  return Promise.reject(new Error(`Unknown sub_type: ${sub_type}`));
}

export function deleteJournalExercise(entry: ExerciseDraftEntry) {
  const { id, category_id, sub_type } = entry;
  if (!category_id) return Promise.reject(new Error("Missing category_id"));
  if (sub_type === "feelings") return deleteFeelingExercise(category_id, id);
  if (sub_type === "focus") return deleteFocusAreaExercise(category_id, id);
  if (sub_type === "wealth_plan") return deleteWealthPlanExercise(category_id, id);
  return Promise.reject(new Error(`Unknown sub_type: ${sub_type}`));
}

export function publishJournalExercise(entry: ExerciseDraftEntry) {
  const { id, category_id, sub_type } = entry;
  if (!category_id) return Promise.reject(new Error("Missing category_id"));
  const payload = { is_draft: false };
  if (sub_type === "feelings")
    return clientApi.put(ENDPOINTS.journal.publishFeeling(category_id, id), payload);
  if (sub_type === "focus")
    return clientApi.put(ENDPOINTS.journal.publishFocusArea(category_id, id), payload);
  if (sub_type === "wealth_plan")
    return clientApi.put(ENDPOINTS.journal.publishWealthPlan(category_id, id), payload);
  return Promise.reject(new Error(`Unknown sub_type: ${sub_type}`));
}

export function getJournalExercises(params: JournalExercisesParams) {
  const qs = new URLSearchParams();
  if (params.source) qs.set("source", params.source);
  if (params.search?.trim()) qs.set("search", params.search.trim());
  qs.set("page", String(params.page));
  qs.set("page_size", String(params.page_size));

  return clientApi.get<JournalExercisesResponse>(`${ENDPOINTS.journal.exercises}?${qs.toString()}`);
}

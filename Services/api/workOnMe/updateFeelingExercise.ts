import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type UpdateFeelingExercisePayload = {
  title: string;
  description: string;
  is_draft: boolean;
};

export const updateFeelingExercise = (
  categoryId: string,
  exerciseId: string,
  payload: UpdateFeelingExercisePayload,
) =>
  clientApi.put<{ data: unknown }>(
    ENDPOINTS.workOnMe.feelingExercise(categoryId, exerciseId),
    payload,
  );

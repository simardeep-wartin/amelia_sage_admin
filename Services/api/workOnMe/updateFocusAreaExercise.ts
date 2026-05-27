import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type UpdateFocusAreaExercisePayload = {
  title: string;
  description: string;
  is_draft: boolean;
};

export const updateFocusAreaExercise = (
  focusId: string,
  exerciseId: string,
  payload: UpdateFocusAreaExercisePayload,
) =>
  clientApi.put<{ data: unknown }>(
    ENDPOINTS.workOnMe.focusAreaExercise(focusId, exerciseId),
    payload,
  );

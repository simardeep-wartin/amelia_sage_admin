import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { FocusAreaExercise } from "./focusAreaExercises";

export type CreateFocusAreaExercisePayload = {
  title: string;
  description: string;
  is_draft: boolean;
};

export const createFocusAreaExercise = (
  focusAreaId: string,
  payload: CreateFocusAreaExercisePayload,
) =>
  clientApi.post<{ data: FocusAreaExercise }>(
    ENDPOINTS.workOnMe.focusAreaExercises(focusAreaId),
    payload,
  );

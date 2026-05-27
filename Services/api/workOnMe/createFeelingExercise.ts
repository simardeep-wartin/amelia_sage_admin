import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { FeelingExercise } from "./feelingExercises";

export type CreateFeelingExercisePayload = {
  title: string;
  description: string;
  is_draft: boolean;
};

export const createFeelingExercise = (feelingId: string, payload: CreateFeelingExercisePayload) =>
  clientApi.post<{ data: FeelingExercise }>(
    ENDPOINTS.workOnMe.feelingExercises(feelingId),
    payload,
  );

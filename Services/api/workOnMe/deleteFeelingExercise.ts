import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export const deleteFeelingExercise = (categoryId: string, exerciseId: string) =>
  clientApi.delete<{ data: unknown }>(ENDPOINTS.workOnMe.feelingExercise(categoryId, exerciseId));

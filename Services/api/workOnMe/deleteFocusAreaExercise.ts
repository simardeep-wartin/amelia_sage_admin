import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export const deleteFocusAreaExercise = (focusId: string, exerciseId: string) =>
  clientApi.delete<{ data: unknown }>(ENDPOINTS.workOnMe.focusAreaExercise(focusId, exerciseId));

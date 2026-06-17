import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export const deleteFocusArea = (id: string) =>
  clientApi.delete<void>(ENDPOINTS.workOnMe.focusArea(id));

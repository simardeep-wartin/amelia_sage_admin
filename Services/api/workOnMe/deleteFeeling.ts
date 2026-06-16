import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export const deleteFeeling = (id: string) => clientApi.delete<void>(ENDPOINTS.workOnMe.feeling(id));

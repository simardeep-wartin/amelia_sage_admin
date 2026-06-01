import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export const logout = () => clientApi.post<{ message: string }>(ENDPOINTS.auth.logout, {});

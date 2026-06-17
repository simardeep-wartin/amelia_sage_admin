import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import type { SignInRequest, SignInResponse } from "@/types";

export const authApi = {
  login: (payload: SignInRequest) =>
    clientApi.post(ENDPOINTS.auth.login, payload) as Promise<SignInResponse>,
};

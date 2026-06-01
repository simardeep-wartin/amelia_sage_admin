import type { SignInRequest, SignInResponse } from "@/types";

export interface IAuthService {
  login(payload: SignInRequest): Promise<SignInResponse>;
}

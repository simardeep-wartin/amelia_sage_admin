import type { SignInRequest, SignInResponse } from "@/types/auth";

export interface IAuthService {
  login(payload: SignInRequest): Promise<SignInResponse>;
}

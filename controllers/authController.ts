import type { SignInRequest, SignInResponse } from "@/models/authModel";
import type { AuthService } from "@/Services/authService";

export type AuthController = {
  login(input: SignInRequest): Promise<SignInResponse>;
};

export function createAuthController(service: AuthService): AuthController {
  return {
    async login(input) {
      return service.login(input);
    },
  };
}

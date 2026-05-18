// TODO: [DEAD CODE] This controller is never instantiated. If MVC controller pattern is
// needed in the future, wire it up via the API route or delete this file.
import type { SignInRequest, SignInResponse } from "@/types/auth";
import type { authService } from "@/Services/authService";
type AuthService = typeof authService;

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

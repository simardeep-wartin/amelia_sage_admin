import type { SignInRequest, SignInResponse } from "@/models/authModel";

export type AuthService = {
  login(payload: SignInRequest): Promise<SignInResponse>;
};

export const authService: AuthService = {
  async login(payload) {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      throw new Error(data?.message ?? "Unable to sign in right now.");
    }

    return (await response.json()) as SignInResponse;
  },
};

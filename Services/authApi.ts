// TODO: [DEAD CODE] Real backend API client — never called because NEXT_PUBLIC_API_BASE_URL
// is not configured. Wire up in authService.ts once the backend is ready, then delete the
// mock route at app/api/auth/signin/route.ts.
import type { SignInRequest, SignupRequest, AuthUser } from "@/types";

export type { SignInRequest, SignupRequest };

type ApiError = {
  message?: string;
};

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing.");
  return baseUrl.replace(/\/$/, "");
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? "Request failed.";
  } catch {
    return "Request failed.";
  }
}

export type AuthResponse = { token: string; user: AuthUser };

export async function loginApi(payload: SignInRequest): Promise<AuthResponse> {
  const response = await fetch(`${getApiBaseUrl()}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AuthResponse;
}

export async function signupApi(payload: SignupRequest): Promise<AuthResponse> {
  const response = await fetch(`${getApiBaseUrl()}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AuthResponse;
}

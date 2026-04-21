"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { SignInRequest } from "@/models/authModel";
import { authService } from "@/Services/authService";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const router = useRouter();
  const { setAuth, clearAuth, token, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (payload: SignInRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await authService.login(payload);
        setAuth(result.token, result.user);
        return result;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Unable to sign in right now.";
        setError(message);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth],
  );

  const signOut = useCallback(() => {
    clearAuth();
    router.push("/signin");
  }, [clearAuth, router]);

  return {
    signIn,
    signOut,
    isLoading,
    error,
    clearError: () => setError(null),
    token,
    user,
    isAuthenticated: token !== null,
  };
}

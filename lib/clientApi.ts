async function fetchOnce<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) throw new Error((data as { message?: string })?.message ?? "Request failed.");
  return data as T;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  try {
    return await fetchOnce<T>(method, path, body);
  } catch (err) {
    // On Unauthorized — attempt silent token refresh then retry once
    const message = err instanceof Error ? err.message : "";
    if (message === "Unauthorized." || message.toLowerCase().includes("unauthorized")) {
      const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
      if (refreshRes.ok) {
        return fetchOnce<T>(method, path, body);
      }
      // Refresh also failed — session is truly dead
      window.location.href = "/signin";
      throw new Error("Session expired. Please sign in again.");
    }
    throw err;
  }
}

export const clientApi = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body: unknown) => request<T>("PUT", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};

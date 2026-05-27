async function request(
  method: string,
  path: string,
  opts: { token?: string; apiKey?: string; body?: unknown } = {},
) {
  const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(opts.apiKey && { "x-api-key": opts.apiKey }),
      ...(opts.token && { Authorization: `Bearer ${opts.token}` }),
    },
    ...(opts.body !== undefined && { body: JSON.stringify(opts.body) }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? "Request failed.");
  return data;
}

export const apiClient = {
  get: (path: string, opts?: { token?: string; apiKey?: string }) => request("GET", path, opts),
  post: (path: string, body?: unknown, opts?: { token?: string; apiKey?: string }) =>
    request("POST", path, { ...opts, body }),
  put: (path: string, body?: unknown, opts?: { token?: string; apiKey?: string }) =>
    request("PUT", path, { ...opts, body }),
  delete: (path: string, opts?: { token?: string; apiKey?: string }) =>
    request("DELETE", path, opts),
};

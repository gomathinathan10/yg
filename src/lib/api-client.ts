function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  // In production the server calls its own API routes during SSR, so this
  // must match whatever port/host the server actually bound to. Prefer an
  // explicit APP_URL (documented in .env.example); otherwise derive it from
  // the same PORT the server itself listens on, so a bare `node app.js` /
  // `node .output/server/index.mjs` works without extra configuration.
  const port = process.env["PORT"] || "3000";
  return process.env["APP_URL"] || `http://127.0.0.1:${port}`;
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data && typeof data === "object" && "error" in data) {
        errorMsg = String(data.error);
      }
    } catch {
      /* ignore */
    }
    throw new Error(errorMsg);
  }
  return (await res.json()) as T;
}

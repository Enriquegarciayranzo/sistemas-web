import { getToken } from "../store/auth";

export const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) throw new Error("VITE_API_BASE_URL is not defined");

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  // No pisar headers del caller
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Solo poner Content-Type si hay body y no existe ya
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "omit", 
  });

  if (!res.ok) {
    // Si token inválido -> logout automático y a /login
    if (res.status === 401) {
      localStorage.removeItem("token"); 
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  // Si no hay contenido
  if (res.status === 204) return null as unknown as T;

  return (await res.json()) as T;
}

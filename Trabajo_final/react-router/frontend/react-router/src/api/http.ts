import { getToken } from "../store/auth";

export const API_BASE = "http://127.0.0.1:8001";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as any),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  // 204 no content
  if (res.status === 204) return null;

  return res.json();
}
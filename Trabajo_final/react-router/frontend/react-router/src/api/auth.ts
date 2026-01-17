import { apiFetch } from "./http";

export function register(email: string, password: string) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function login(email: string, password: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }) as Promise<{ access_token: string; token_type: string }>;
}
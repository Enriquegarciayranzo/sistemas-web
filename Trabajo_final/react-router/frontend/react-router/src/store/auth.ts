const TOKEN_KEY = "token";
const EMAIL_KEY = "email";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}

export function getEmail() {
  return localStorage.getItem(EMAIL_KEY);
}

export function setAuth(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}
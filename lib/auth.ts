// Simple authentication utilities for admin dashboard

export const ADMIN_CREDENTIALS = {
  email: "admin@psoregnskap.no",
  password: "admin123",
};

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const auth = localStorage.getItem("pso_admin_auth");
  return auth === "true";
}

export function login(email: string, password: string): boolean {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem("pso_admin_auth", "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem("pso_admin_auth");
}

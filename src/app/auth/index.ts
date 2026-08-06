const ACCESS_TOKEN_KEY = "access_token";

export function isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
}

export function login(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export * from "./useAuth";

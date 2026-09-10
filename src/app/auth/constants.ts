export const USER_ROLES = {
    ADMIN: "BFF.Administrator",
    EDITOR: "BFF.Editor",
    VIEWER: "BFF.Viewer",
} as const;

export const AUTH_STATUS = {
    LOADING: "loading",
    AUTHENTICATED: "authenticated",
    ANONYMOUS: "anonymous",
} as const;

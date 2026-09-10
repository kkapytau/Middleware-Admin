import type { AUTH_STATUS, USER_ROLES } from "./constants";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export interface Session {
    authenticated: boolean;
    name: string | null;
    email: string | null;
    roles: UserRole[];
}

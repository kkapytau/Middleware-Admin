import type { UserRole } from "@/app/auth";
import { AUTH_STATUS } from "@/app/auth";

import { useAuthContext } from "./context";

export function useAuth() {
    const { status, user, signIn, signOut } = useAuthContext();

    const roles = user?.roles ?? [];

    const hasRole = (role: UserRole) => roles.includes(role);

    const hasAnyRole = (...requiredRoles: UserRole[]) =>
        requiredRoles.some((role) => roles.includes(role));

    return {
        isAuthenticated: status === AUTH_STATUS.AUTHENTICATED,
        isLoading: status === AUTH_STATUS.LOADING,
        user,
        roles,
        hasRole,
        hasAnyRole,
        signIn,
        signOut,
    };
}

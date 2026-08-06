import { useCallback } from "react";

import { isAuthenticated, login, logout } from "./index";

export function useAuth() {
    const signIn = useCallback((token: string) => {
        login(token);
    }, []);

    const signOut = useCallback(() => {
        logout();
    }, []);

    return {
        isAuthenticated: isAuthenticated(),
        signIn,
        signOut,
    };
}

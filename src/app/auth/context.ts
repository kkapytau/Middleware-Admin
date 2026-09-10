import { createContext, useContext } from "react";

import type { AuthStatus, Session } from "@/app/auth";

export type AuthState = {
    status: AuthStatus;
    user: Session | null;
    signIn: () => void;
    signOut: () => void;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function useAuthContext(): AuthState {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}

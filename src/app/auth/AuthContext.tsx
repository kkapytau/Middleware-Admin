import { type ReactNode, useEffect, useMemo, useState } from "react";

import { AUTH_STATUS } from "@/app/auth";

import { AuthContext, type AuthState } from "./context";
import { fetchSession, login, logout } from "./session";
import type { Session } from "./types";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        void fetchSession().then((nextSession) => {
            if (!active) {
                return;
            }

            setSession(nextSession);
            setLoading(false);
        });

        return () => {
            active = false;
        };
    }, []);

    const value: AuthState = useMemo(
        () => ({
            status: loading
                ? AUTH_STATUS.LOADING
                : session?.authenticated
                  ? AUTH_STATUS.AUTHENTICATED
                  : AUTH_STATUS.ANONYMOUS,
            user: session,
            signIn: login,
            signOut: logout,
        }),
        [loading, session],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

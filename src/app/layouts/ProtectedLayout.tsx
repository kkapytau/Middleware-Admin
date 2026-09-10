import { Navigate } from "react-router";

import { useAuth } from "@/app/auth";
import { AppShell } from "@/shared/components";

export function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <AppShell />;
}

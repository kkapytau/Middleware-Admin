import { Navigate } from "react-router";

import { isAuthenticated } from "@/app/auth";
import { AppShell } from "@/shared/components/layout/AppShell";

export function ProtectedLayout() {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <AppShell />;
}

import { Navigate } from "react-router";

import { isAuthenticated } from "@/app/auth";

import { AppLayout } from "./AppLayout";

export function ProtectedLayout() {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <AppLayout />;
}

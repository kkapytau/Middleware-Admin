import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/app/auth";

export function PublicLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

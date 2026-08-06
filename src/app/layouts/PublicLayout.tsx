import { Navigate, Outlet } from "react-router";

import { isAuthenticated } from "@/app/auth";

export function PublicLayout() {
    if (isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

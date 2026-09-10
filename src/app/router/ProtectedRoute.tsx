import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/app/auth";
import { hasPermission, type Permission } from "@/app/auth";

type ProtectedRouteProps = {
    permission: Permission;
    children: ReactNode;
};

export function ProtectedRoute({ permission, children }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!hasPermission(user.roles, permission)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

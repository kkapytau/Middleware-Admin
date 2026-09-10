import { hasPermission, PERMISSIONS, useAuth } from "@/app/auth";

export function usePermissions() {
    const { roles } = useAuth();

    return {
        canRead: hasPermission(roles, PERMISSIONS.READ),
        canCreate: hasPermission(roles, PERMISSIONS.CREATE),
        canUpdate: hasPermission(roles, PERMISSIONS.UPDATE),
        canDelete: hasPermission(roles, PERMISSIONS.DELETE),
    };
}

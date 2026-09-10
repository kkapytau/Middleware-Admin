import type { UserRole } from "@/app/auth";
import { USER_ROLES } from "@/app/auth";

export const PERMISSIONS = {
    READ: "read",
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
    ADMIN_AREA: "admin-area",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
    [USER_ROLES.ADMIN]: [
        PERMISSIONS.READ,
        PERMISSIONS.CREATE,
        PERMISSIONS.UPDATE,
        PERMISSIONS.DELETE,
        PERMISSIONS.ADMIN_AREA,
    ],

    [USER_ROLES.EDITOR]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE],

    [USER_ROLES.VIEWER]: [PERMISSIONS.READ],
};

export function hasPermission(roles: readonly UserRole[], permission: Permission): boolean {
    return roles.some((role) => ROLE_PERMISSIONS[role]?.includes(permission));
}

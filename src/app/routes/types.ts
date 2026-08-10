import type { ComponentType } from "react";

import type { NavigationKey } from "@/shared/types/navigation";
import type { Permission } from "@/shared/types/permissions";

export type RouteAccess = "public" | "protected";

interface BaseRoute {
    key: string;

    access: RouteAccess;

    titleKey: NavigationKey;

    icon?: ComponentType;

    permissions?: Permission[];

    showInNavigation?: boolean;
}

export interface PageRoute extends BaseRoute {
    type: "page";
    path: string;
    component: ComponentType;
}

export interface GroupRoute extends BaseRoute {
    type: "group";

    children: AppRoute[];
}

export type AppRoute = PageRoute | GroupRoute;

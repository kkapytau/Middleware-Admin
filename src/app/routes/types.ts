import type { ComponentType } from "react";

import type { Permission } from "@/shared/types/permissions";

export type RouteAccess = "public" | "protected";

interface BaseRoute {
    key: string;

    access: RouteAccess;

    path: string;

    titleKey: string;

    icon?: ComponentType;

    permissions?: Permission[];

    showInNavigation?: boolean;
}

export interface PageRoute extends BaseRoute {
    type: "page";

    component: ComponentType;
}

export interface GroupRoute extends BaseRoute {
    type: "group";

    children: AppRoute[];
}

export type AppRoute = PageRoute | GroupRoute;

import type { ComponentType } from "react";

import type { NavigationKey, Permission } from "@/shared/types";

type RouteAccess = "public" | "protected";

interface BaseRoute {
    key: string;

    access: RouteAccess;

    titleKey: NavigationKey;

    icon?: ComponentType;

    permissions?: Permission[];

    showInNavigation?: boolean;
}

interface PageRoute extends BaseRoute {
    type: "page";
    path: string;
    component: ComponentType;
}

interface GroupRoute extends BaseRoute {
    type: "group";

    children: AppRoute[];
}

export type AppRoute = PageRoute | GroupRoute;

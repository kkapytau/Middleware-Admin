import type { ComponentType } from "react";

import { type Permission } from "@/app/auth";
import type { NavigationKey } from "@/shared/types";

type RouteAccess = "public" | "protected";

interface BaseRoute {
    key: string;

    access: RouteAccess;

    titleKey: NavigationKey;

    icon?: ComponentType;

    showInNavigation?: boolean;

    permission?: Permission;
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

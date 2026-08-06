import { createElement } from "react";
import type { RouteObject } from "react-router";

import type { AppRoute } from "@/app/routes";

export function buildRouteObjects(routes: AppRoute[]): RouteObject[] {
    return routes.flatMap((route) => {
        if (route.type === "group") {
            return buildRouteObjects(route.children ?? []);
        }

        const Component = route.component;

        return {
            path: route.path,
            element: Component ? createElement(Component) : undefined,
        };
    });
}

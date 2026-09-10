import { createElement } from "react";
import type { RouteObject } from "react-router";

import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import type { AppRoute } from "@/app/routes";

export function buildRouteObjects(routes: AppRoute[]): RouteObject[] {
    return routes.flatMap((route) => {
        if (route.type === "group") {
            return buildRouteObjects(route.children);
        }

        const Component = route.component;
        const element = createElement(Component);

        return {
            path: route.path,
            element: route.permission
                ? createElement(ProtectedRoute, {
                      permission: route.permission,
                      children: element,
                  })
                : element,
        };
    });
}

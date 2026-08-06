import { createElement } from "react";
import type { RouteObject } from "react-router";

import type { AppRoute } from "@/app/routes";

export function mapRoutes(routes: AppRoute[]): RouteObject[] {
    return routes.flatMap((route) => {
        if (route.type === "group") {
            return mapRoutes(route.children);
        }

        return {
            path: route.path,
            element: createElement(route.component),
        };
    });
}

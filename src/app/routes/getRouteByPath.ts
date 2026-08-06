import type { AppRoute } from "./types";

export function getRouteByPath(routes: AppRoute[], pathname: string): AppRoute | undefined {
    for (const route of routes) {
        if (route.type === "page" && route.path === pathname) {
            return route;
        }

        if (route.type === "group") {
            const child = getRouteByPath(route.children, pathname);

            if (child) {
                return child;
            }
        }
    }

    return undefined;
}

import { locationGroup } from "./location";
import { loginRoute } from "./public";
import type { AppRoute } from "./types";

export const appRoutes: AppRoute[] = [loginRoute, locationGroup];

export * from "./getRouteByPath.ts";
export * from "./types";

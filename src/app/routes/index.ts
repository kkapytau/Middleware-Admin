import { flowsRoute } from "./flows";
import { functionsRoute } from "./functions";
import { locationGroup } from "./location";
import { loginRoute } from "./public";
import type { AppRoute } from "./types";

export const appRoutes: AppRoute[] = [loginRoute, locationGroup, functionsRoute, flowsRoute];

export * from "./getRouteByPath.ts";
export * from "./types";

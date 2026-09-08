import { flowRulesRoute } from "./flowRules";
import { flowsRoute } from "./flows";
import { functionsRoute } from "./functions";
import { locationGroup } from "./location";
import { loginRoute } from "./public";
import { systemSettingsGroup } from "./systemSettings";
import type { AppRoute } from "./types";

export const appRoutes: AppRoute[] = [
    loginRoute,
    systemSettingsGroup,
    locationGroup,
    functionsRoute,
    flowsRoute,
    flowRulesRoute,
];

export * from "./getRouteByPath";
export * from "./types";

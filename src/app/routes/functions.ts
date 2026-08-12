import { FlowFunctionsPage } from "@/pages/Functions";

import type { AppRoute } from "./types";

export const functionsRoute: AppRoute = {
    key: "functions",

    type: "page",

    access: "protected",

    path: "/functions",

    titleKey: "navigation.functions",

    showInNavigation: true,

    component: FlowFunctionsPage,
};

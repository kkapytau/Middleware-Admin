import { FlowRulesPage } from "@/pages/FlowRules";

import type { AppRoute } from "./types";

export const flowRulesRoute: AppRoute = {
    key: "flowRules",

    type: "page",

    access: "protected",

    path: "/flow-rules",

    titleKey: "navigation.flowRules",

    showInNavigation: true,

    component: FlowRulesPage,
};

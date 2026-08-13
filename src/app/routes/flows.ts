import { FlowsPage } from "@/pages/Flows/FlowsPage";

import type { AppRoute } from "./types";

export const flowsRoute: AppRoute = {
    key: "flows",

    type: "page",

    access: "protected",

    path: "/flows",

    titleKey: "navigation.flows",

    showInNavigation: true,

    component: FlowsPage,
};

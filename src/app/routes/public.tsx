import { LoginPage } from "@/pages/Login";

import type { AppRoute } from "./types";

export const loginRoute: AppRoute = {
    key: "login",

    type: "page",

    access: "public",

    path: "/login",

    titleKey: "navigation.login",

    showInNavigation: false,

    component: LoginPage,
};

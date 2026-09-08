import { GlobalOutlined } from "@ant-design/icons";

import type { AppRoute } from "@/app/routes/types";
import { LocalesPage } from "@/pages/Locales";

const localesRoute: AppRoute = {
    key: "locales",

    type: "page",

    access: "protected",

    path: "/locales",

    titleKey: "navigation.locales",

    icon: GlobalOutlined,

    showInNavigation: true,

    component: LocalesPage,
};

export const systemSettingsGroup: AppRoute = {
    key: "system-settings",

    type: "group",

    access: "protected",

    titleKey: "navigation.systemSettings",

    showInNavigation: true,

    children: [localesRoute],
};

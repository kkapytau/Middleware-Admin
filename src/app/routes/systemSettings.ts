import {
    ApartmentOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    GlobalOutlined,
} from "@ant-design/icons";

import type { AppRoute } from "@/app/routes/types";
import { CurrenciesPage } from "@/pages/Currencies";
import { GeographicTypesPage } from "@/pages/GeographicTypes";
import { LocalesPage } from "@/pages/Locales";
import { TimezonesPage } from "@/pages/Timezones";

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

const geographicTypesRoute: AppRoute = {
    key: "geographicTypes",

    type: "page",

    access: "protected",

    path: "/geographicTypes",

    titleKey: "navigation.geographicTypes",

    icon: ApartmentOutlined,

    showInNavigation: true,

    component: GeographicTypesPage,
};

const currenciesRoute: AppRoute = {
    key: "currencies",

    type: "page",

    access: "protected",

    path: "/currencies",

    titleKey: "navigation.currencies",

    icon: DollarOutlined,

    showInNavigation: true,

    component: CurrenciesPage,
};

const timezonesRoute: AppRoute = {
    key: "timezones",

    type: "page",

    access: "protected",

    path: "/timezones",

    titleKey: "navigation.timezones",

    icon: ClockCircleOutlined,

    showInNavigation: true,

    component: TimezonesPage,
};

export const systemSettingsGroup: AppRoute = {
    key: "system-settings",

    type: "group",

    access: "protected",

    titleKey: "navigation.systemSettings",

    showInNavigation: true,

    children: [localesRoute, geographicTypesRoute, currenciesRoute, timezonesRoute],
};

import { AppstoreOutlined, EnvironmentOutlined } from "@ant-design/icons";

import { AirportsPage } from "@/pages/Airports";
import { AreasPage } from "@/pages/Areas";
import { CitiesPage } from "@/pages/Cities";
import { CountriesPage } from "@/pages/Countries";
import { MarketGroupsPage } from "@/pages/MarketGroups";

import type { AppRoute } from "./types";

const airportsRoute: AppRoute = {
    key: "airports",

    type: "page",

    access: "protected",

    path: "/airports",

    titleKey: "navigation.airports",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    component: AirportsPage,
};

const countriesRoute: AppRoute = {
    key: "countries",

    type: "page",

    access: "protected",

    path: "/countries",

    titleKey: "navigation.countries",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    component: CountriesPage,
};

const areasRoute: AppRoute = {
    key: "areas",

    type: "page",

    access: "protected",

    path: "/areas",

    titleKey: "navigation.areas",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    component: AreasPage,
};

const citiesRoute: AppRoute = {
    key: "cities",

    type: "page",

    access: "protected",

    path: "/cities",

    titleKey: "navigation.cities",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    component: CitiesPage,
};

const marketGroupsRoute: AppRoute = {
    key: "marketGroups",

    type: "page",

    access: "protected",

    path: "/marketGroups",

    titleKey: "navigation.marketGroups",

    icon: AppstoreOutlined,

    showInNavigation: true,

    component: MarketGroupsPage,
};

export const locationGroup: AppRoute = {
    key: "location",

    type: "group",

    access: "protected",

    titleKey: "navigation.location",

    showInNavigation: true,

    children: [airportsRoute, citiesRoute, countriesRoute, areasRoute, marketGroupsRoute],
};

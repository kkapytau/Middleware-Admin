import { EnvironmentOutlined } from "@ant-design/icons";

import { AirportsPage } from "@/pages/Airports";
import { CitiesPage } from "@/pages/Cities";
import { ContinentsPage } from "@/pages/Continents";
import { CountriesPage } from "@/pages/Countries";

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

const continentsRoute: AppRoute = {
    key: "continents",

    type: "page",

    access: "protected",

    path: "/continents",

    titleKey: "navigation.continents",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    component: ContinentsPage,
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

export const locationGroup: AppRoute = {
    key: "location",

    type: "group",

    access: "protected",

    titleKey: "navigation.location",

    showInNavigation: true,

    children: [airportsRoute, citiesRoute, countriesRoute, continentsRoute],
};

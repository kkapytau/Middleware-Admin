import { EnvironmentOutlined } from "@ant-design/icons";

import { AirportsPage } from "@/pages/Airports";
import { CitiesPage } from "@/pages/Cities";
import { CountriesPage } from "@/pages/Countries";
import { permissions } from "@/shared/types/permissions";

import type { AppRoute } from "./types";

export const airportsRoute: AppRoute = {
    key: "airports",

    type: "page",

    access: "protected",

    path: "/location/airports",

    titleKey: "navigation.airports",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    permissions: [permissions.airport.read],

    component: AirportsPage,
};

export const countriesRoute: AppRoute = {
    key: "countries",

    type: "page",

    access: "protected",

    path: "/location/countries",

    titleKey: "navigation.countries",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    permissions: [permissions.country.read],

    component: CountriesPage,
};

export const citiesRoute: AppRoute = {
    key: "cities",

    type: "page",

    access: "protected",

    path: "/location/cities",

    titleKey: "navigation.cities",

    icon: EnvironmentOutlined,

    showInNavigation: true,

    permissions: [permissions.city.read],

    component: CitiesPage,
};

export const locationGroup: AppRoute = {
    key: "location",

    type: "group",

    access: "protected",

    titleKey: "navigation.location",

    showInNavigation: true,

    children: [airportsRoute, countriesRoute, citiesRoute],
};

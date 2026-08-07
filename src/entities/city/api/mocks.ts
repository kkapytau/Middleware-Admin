import { countryMocks } from "@/entities/country/api/mocks";

import type { City } from "../model";

export const cityMocks: City[] = [
    {
        cityCode: "PAR",

        cityName: "Paris",

        country: countryMocks[0]!,
    },

    {
        cityCode: "MRS",

        cityName: "Marseille",

        country: countryMocks[0]!,
    },

    {
        cityCode: "MAD",

        cityName: "Madrid",

        country: countryMocks[1]!,
    },

    {
        cityCode: "BCN",

        cityName: "Barcelona",

        country: countryMocks[1]!,
    },

    {
        cityCode: "CMN",

        cityName: "Casablanca",

        country: countryMocks[2]!,
    },

    {
        cityCode: "RAK",

        cityName: "Marrakech",

        country: countryMocks[2]!,
    },
];

import { continentMocks } from "@/entities/continent/api/mocks";

import type { Country } from "../model";

export const countryMocks: Country[] = [
    {
        countryCode: "FR",
        countryName: "France",

        continent: continentMocks[0]!,
    },

    {
        countryCode: "ES",
        countryName: "Spain",

        continent: continentMocks[0]!,
    },

    {
        countryCode: "MA",
        countryName: "Morocco",

        continent: continentMocks[1]!,
    },
];

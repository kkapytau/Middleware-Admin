import { cityMocks } from "@/entities/city/api/mocks";

import type { Airport } from "../model";

export const airportMocks: Airport[] = [
    {
        id: "airport-1",

        airportCode: "CDG",

        airportName: "Charles de Gaulle",

        isMetropolitan: true,

        coordinates: {
            latitude: 49.0097,

            longitude: 2.5479,
        },

        city: cityMocks[0]!,
    },

    {
        id: "airport-2",

        airportCode: "ORY",

        airportName: "Paris Orly",

        isMetropolitan: true,

        coordinates: {
            latitude: 48.7262,

            longitude: 2.3652,
        },

        city: cityMocks[0]!,
    },

    {
        id: "airport-3",
        airportCode: "MRS",

        airportName: "Marseille Provence",

        isMetropolitan: false,

        coordinates: {
            latitude: 43.4393,

            longitude: 5.2214,
        },

        city: cityMocks[1]!,
    },

    {
        id: "airport-4",
        airportCode: "MAD",

        airportName: "Adolfo Suárez Madrid–Barajas",

        isMetropolitan: true,

        coordinates: {
            latitude: 40.4983,

            longitude: -3.5676,
        },

        city: cityMocks[2]!,
    },

    {
        id: "airport-5",
        airportCode: "BCN",

        airportName: "Barcelona–El Prat",

        isMetropolitan: true,

        coordinates: {
            latitude: 41.2974,

            longitude: 2.0833,
        },

        city: cityMocks[3]!,
    },

    {
        id: "airport-6",
        airportCode: "CMN",

        airportName: "Mohammed V",

        isMetropolitan: true,

        coordinates: {
            latitude: 33.3675,

            longitude: -7.5899,
        },

        city: cityMocks[4]!,
    },

    {
        id: "airport-7",
        airportCode: "RAK",

        airportName: "Marrakech Menara",

        isMetropolitan: false,

        coordinates: {
            latitude: 31.6069,

            longitude: -8.0363,
        },

        city: cityMocks[5]!,
    },
];

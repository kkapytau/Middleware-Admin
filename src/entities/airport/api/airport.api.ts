import { getCities } from "@/entities/city";

import type { Airport, AirportFormValues } from "../model";
import { airportMocks } from "./mocks";

const NETWORK_DELAY = 500;

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAirports(): Promise<Airport[]> {
    await delay(NETWORK_DELAY);

    return airportMocks;
}

export async function createAirport(values: AirportFormValues): Promise<Airport> {
    await delay(NETWORK_DELAY);

    const cities = await getCities();

    const city = cities.find((item) => item.cityCode === values.cityId);

    if (!city) {
        throw new Error(`City "${values.cityId}" not found`);
    }

    return {
        id: crypto.randomUUID(),
        airportCode: values.airportCode,
        airportName: values.airportName,
        isMetropolitan: values.isMetropolitan,
        coordinates: {
            latitude: values.latitude,
            longitude: values.longitude,
        },
        city,
    };
}

import type { Airport } from "./types";

export interface AirportFormValues {
    airportCode: string;

    airportName: string;

    cityId: string;

    latitude: number;

    longitude: number;

    isMetropolitan: boolean;
}

export const defaultAirportFormValues: AirportFormValues = {
    airportCode: "",
    airportName: "",
    cityId: "",
    latitude: 0,
    longitude: 0,
    isMetropolitan: false,
};

export function airportToForm(airport: Airport): AirportFormValues {
    return {
        airportCode: airport.airportCode,
        airportName: airport.airportName,
        cityId: airport.city.cityCode,
        latitude: airport.coordinates.latitude,
        longitude: airport.coordinates.longitude,
        isMetropolitan: airport.isMetropolitan,
    };
}

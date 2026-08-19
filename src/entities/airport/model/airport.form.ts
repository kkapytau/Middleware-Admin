import type { AirportDetail, AirportFormValues } from "./types";

export function airportToFormValues(airport: AirportDetail): AirportFormValues {
    return {
        code: airport.code,
        name: airport.name,
        cityId: airport.cityId,
        latitude: airport.latitude,
        longitude: airport.longitude,
        metropolitan: airport.metropolitan,
    };
}

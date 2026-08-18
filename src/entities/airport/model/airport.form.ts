import type { AirportDetail, AirportFormValues } from "./types";

export function airportToFormValues(airport: AirportDetail): AirportFormValues {
    return {
        code: airport.code,
        name: airport.name,
        cityId: airport.city.id,
        latitude: airport.coordinates?.latitude,
        longitude: airport.coordinates?.longitude,
        metropolitan: airport.metropolitan,
    };
}

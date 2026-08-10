import type { AirportFormValues } from "./airport.schema";
import type { Airport } from "./types";

export function airportToFormValues(airport: Airport): AirportFormValues {
    return {
        airportCode: airport.airportCode,
        airportName: airport.airportName,
        cityId: airport.city.cityCode,
        latitude: airport.coordinates.latitude,
        longitude: airport.coordinates.longitude,
        isMetropolitan: airport.isMetropolitan,
    };
}

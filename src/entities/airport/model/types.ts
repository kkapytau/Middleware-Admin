import type { City } from "@/entities/city";

export interface Coordinates {
    latitude: number;

    longitude: number;
}

export interface Airport {
    airportCode: string;

    airportName: string;

    isMetropolitan: boolean;

    coordinates: Coordinates;

    city: City;
}

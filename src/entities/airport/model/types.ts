export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Airport {
    id: number;
    code: string;
    name: string;
}

export interface AirportCity {
    id: number;
    code: string;
    name: string;
}

export interface AirportDetail {
    id: number;
    code: string;
    name: string;
    translations: Record<string, string>;
    coordinates: Coordinates;
    metropolitan: boolean;
    city: AirportCity;
}

export interface AirportFormValues {
    code: string;
    name: string;
    cityId: number | null;
    latitude: number | undefined;
    longitude: number | undefined;
    metropolitan: boolean;
}

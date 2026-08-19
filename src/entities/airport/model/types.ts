export interface Airport {
    id: number;
    code: string;
    name: string;
}

export interface AirportDetail {
    id: number;
    code: string;
    name: string;
    cityId: number;
    latitude: number;
    longitude: number;
    metropolitan: boolean;
}

export interface AirportFormValues {
    code: string;
    name: string;
    cityId: number;
    latitude: number;
    longitude: number;
    metropolitan: boolean;
}

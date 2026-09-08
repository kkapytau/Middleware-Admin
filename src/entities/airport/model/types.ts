import type { TranslationFormValue } from "@/shared/types";

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
    translations: Record<string, string>;
}

export interface AirportFormValues {
    code: string;
    name: string;
    cityId: number;
    latitude: number;
    longitude: number;
    translations: TranslationFormValue[];
}

export const defaultAirportFormValues: AirportFormValues = {
    code: "",
    name: "",
    cityId: 0,
    latitude: 0,
    longitude: 0,
    translations: [],
};

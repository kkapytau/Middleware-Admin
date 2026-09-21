import type { Area } from "@/entities/area";
import type { Timezone } from "@/entities/timezone";
import type { TranslationFormValue } from "@/shared/types";

export interface City {
    id: number;
    code: string;
    name: string;
}

export interface CityDetail {
    id: number;
    code: string;
    name: string;
    timeZone: Timezone;
    translations: Record<string, string>;
    area: Area;
    country: {
        id: number;
        code: string;
        name: string;
        translations: Record<string, string>;
    };
}

export interface CityFormValues {
    code: string;
    name: string;
    timeZoneId: number;
    areaId: number;
    countryId: number;
    translations: TranslationFormValue[];
}

export const defaultCityFormValues: CityFormValues = {
    code: "",
    name: "",
    countryId: 0,
    timeZoneId: 0,
    areaId: 0,
    translations: [],
};

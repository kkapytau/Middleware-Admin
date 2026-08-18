import type { ContinentDetail } from "@/entities/continent";

export interface Country {
    id: number;
    code: string;
    name: string;
}

export interface CountryDetail extends Country {
    translations: Record<string, string>;
    continent: ContinentDetail;
}

export interface CountryFormValues {
    code: string;
    name: string;
    continentId: number;
    translations: Record<string, string>;
}

export const defaultCountryFormValues: CountryFormValues = {
    code: "",
    name: "",
    continentId: 0,
    translations: {},
};

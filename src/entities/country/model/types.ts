import type { ContinentDetail } from "@/entities/continent";
import type { TranslationFormValue } from "@/shared/types";

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
    translations: TranslationFormValue[];
}

export const defaultCountryFormValues: CountryFormValues = {
    code: "",
    name: "",
    continentId: 0,
    translations: [],
};

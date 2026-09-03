import type { TranslationFormValue } from "@/shared/types";

export interface Continent {
    id: number;
    code: string;
    name: string;
}

export interface ContinentDetail extends Continent {
    translations: Record<string, string>;
}

export interface ContinentFormValues {
    code: string;
    name: string;
    translations: TranslationFormValue[];
}

export const defaultContinentFormValues: ContinentFormValues = {
    code: "",
    name: "",
    translations: [],
};

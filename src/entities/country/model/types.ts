import type { Currency } from "@/entities/currency";
import type { MarketGroupDetail } from "@/entities/marketGroup";
import type { TranslationFormValue } from "@/shared/types";

export interface Country {
    id: number;
    code: string;
    codeNumeric: string | null;
    name: string;
    isCountry: boolean;
    isMarket: boolean;
}

export interface CountryDetail extends Country {
    translations: Record<string, string>;
    currency: Currency | null;
    marketGroup: MarketGroupDetail | null;
}

export interface CountryFormValues {
    code: string;
    codeNumeric: string;
    name: string;
    currencyId: number | null;
    marketGroupId: number | null;
    isCountry: boolean;
    isMarket: boolean;
    translations: TranslationFormValue[];
}

export const defaultCountryFormValues: CountryFormValues = {
    code: "",
    codeNumeric: "",
    name: "",
    currencyId: null,
    marketGroupId: null,
    isCountry: false,
    isMarket: false,
    translations: [],
};

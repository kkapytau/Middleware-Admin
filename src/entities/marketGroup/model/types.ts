import type { TranslationFormValue } from "@/shared/types";

export interface MarketGroup {
    id: number;
    code: string;
    disabled: boolean;
}

export interface MarketGroupFormValues {
    code: string;
    disabled: boolean;
    translations: TranslationFormValue[];
}

export interface MarketGroupDetail {
    id: number;
    code: string;
    disabled: boolean;
    translations: Record<string, string>;
}

export const defaultMarketGroupFormValues: MarketGroupFormValues = {
    code: "",
    disabled: false,
    translations: [],
};

export interface Currency {
    id: number;
    code: string;
    disabled: boolean;
}

export interface CurrencyFormValues {
    code: string;
    disabled: boolean;
}

export const defaultCurrencyFormValues: CurrencyFormValues = {
    code: "",
    disabled: false,
};

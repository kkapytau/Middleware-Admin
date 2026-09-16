export interface Currency {
    id: number;
    code: string;
    deleted: boolean;
}

export interface CurrencyFormValues {
    code: string;
    deleted: boolean;
}

export const defaultCurrencyFormValues: CurrencyFormValues = {
    code: "",
    deleted: false,
};

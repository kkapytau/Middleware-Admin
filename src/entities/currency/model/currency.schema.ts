import { z } from "zod";

export interface CurrencyValidationMessages {
    required: string;
    currencyCodePattern: string;
}

export function createCurrencyFormSchema(messages: CurrencyValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z]{3}$/, messages.currencyCodePattern),
        deleted: z.boolean(),
    });
}

import { z } from "zod";

export interface CountryValidationMessages {
    required: string;
    codePattern: string;
    codeNumericPattern: string;
}

export function createCountryFormSchema(messages: CountryValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z]{2,3}$/, messages.codePattern),

        codeNumeric: z.string().regex(/^[0-9]{3}$/, messages.codeNumericPattern),

        name: z.string().min(1, messages.required).max(100),

        currencyId: z.number().positive(messages.required),

        marketGroupId: z.number().positive(messages.required),

        isCountry: z.boolean(),

        isMarket: z.boolean(),

        translations: z.array(
            z.object({
                language: z.string(),
                value: z.string(),
            }),
        ),
    });
}

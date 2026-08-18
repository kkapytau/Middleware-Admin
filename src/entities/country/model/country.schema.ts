import { z } from "zod";

export interface CountryValidationMessages {
    required: string;
    codePattern: string;
}

export function createCountryFormSchema(messages: CountryValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z]{2}$/, messages.codePattern),

        name: z.string().min(1, messages.required).max(100),

        continentId: z.number().positive(messages.required),

        translations: z.record(z.string(), z.string()),
    });
}

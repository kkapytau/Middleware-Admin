import { z } from "zod";

export interface ContinentValidationMessages {
    required: string;
    codePattern: string;
}

export function createContinentFormSchema(messages: ContinentValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z]{2}$/, messages.codePattern),

        name: z.string().min(1, messages.required).max(50),

        translations: z.record(z.string(), z.string()),
    });
}

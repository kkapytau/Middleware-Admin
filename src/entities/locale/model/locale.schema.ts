import { z } from "zod";

export interface LocaleValidationMessages {
    required: string;
    codePattern: string;
}

export function createLocaleFormSchema(messages: LocaleValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z]{2}$/, messages.codePattern),
        name: z.string().min(1, messages.required).max(100),
        deleted: z.boolean(),
    });
}

export type LocaleFormValues = z.infer<ReturnType<typeof createLocaleFormSchema>>;

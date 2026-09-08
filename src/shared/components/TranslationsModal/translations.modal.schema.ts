import { z } from "zod";

interface TranslationsModalValidationMessages {
    required: string;
}

export function createTranslationsSchema(messages: TranslationsModalValidationMessages) {
    return z.object({
        translations: z.array(
            z.object({
                language: z.string(),
                value: z.string().trim().min(1, messages.required),
            }),
        ),
    });
}

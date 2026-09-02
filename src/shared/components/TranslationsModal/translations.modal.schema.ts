import { z } from "zod";

interface TranslationsModalValidationMessages {
    required: string;
    duplicateLanguage: string;
    languagePattern: string;
}

export function createTranslationsSchema(messages: TranslationsModalValidationMessages) {
    return z.object({
        translations: z
            .array(
                z.object({
                    language: z
                        .string()
                        .trim()
                        .min(1, messages.required)
                        .regex(/^[A-Za-z]+$/, messages.languagePattern),
                    value: z.string().trim().min(1, messages.required),
                }),
            )
            .superRefine((translations, ctx) => {
                const languages = new Map<string, number>();

                translations.forEach(({ language }, index) => {
                    const normalizedLanguage = language.toUpperCase();

                    const firstIndex = languages.get(normalizedLanguage);

                    if (firstIndex !== undefined) {
                        ctx.addIssue({
                            code: "custom",
                            message: messages.duplicateLanguage,
                            path: [index, "language"],
                        });

                        ctx.addIssue({
                            code: "custom",
                            message: messages.duplicateLanguage,
                            path: [firstIndex, "language"],
                        });

                        return;
                    }

                    languages.set(normalizedLanguage, index);
                });
            }),
    });
}

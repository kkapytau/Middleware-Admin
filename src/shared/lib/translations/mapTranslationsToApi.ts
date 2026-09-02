import type { TranslationFormValue } from "@/shared/types/translations";

export function mapTranslationsToApi(translations: TranslationFormValue[]): Record<string, string> {
    return Object.fromEntries(
        translations
            .filter(({ language, value }) => language.trim() && value.trim())
            .map(({ language, value }) => [language.trim().toUpperCase(), value.trim()]),
    );
}

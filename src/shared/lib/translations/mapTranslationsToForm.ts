import type { TranslationFormValue } from "@/shared/types";

export function mapTranslationsToForm(
    translations?: Record<string, string> | null,
): TranslationFormValue[] {
    return Object.entries(translations ?? {}).map(([language, value]) => ({
        language,
        value,
    }));
}

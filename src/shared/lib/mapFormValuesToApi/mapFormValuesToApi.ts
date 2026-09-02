import { mapTranslationsToApi } from "@/shared/lib/translations/mapTranslationsToApi";
import type { TranslationFormValue } from "@/shared/types/translations";

export function mapFormValuesToApi<TFormValues extends { translations: TranslationFormValue[] }>(
    values: TFormValues,
): Omit<TFormValues, "translations"> & {
    translations: Record<string, string>;
} {
    return {
        ...values,
        translations: mapTranslationsToApi(values.translations),
    };
}

import { useState } from "react";
import type { Control, FieldValues, UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { TranslationFormValue } from "@/shared/types";

interface TranslationFormFields extends FieldValues {
    translations: TranslationFormValue[];
}

interface UseTranslationsFormParams<T extends TranslationFormFields> {
    control: Control<T>;
    setValue: UseFormSetValue<T>;
}

export function useTranslationsForm<T extends TranslationFormFields>({
    control,
    setValue,
}: UseTranslationsFormParams<T>) {
    const [translationsOpen, setTranslationsOpen] = useState(false);

    const translations = useWatch({
        control,
        // @ts-expect-error react-hook-form cannot infer "translations" as Path<T>
        // inside a generic hook, even though T is constrained to contain translations.
        name: "translations",
    }) as TranslationFormValue[] | undefined;

    const handleTranslationsDone = (nextTranslations: TranslationFormValue[]) => {
        // @ts-expect-error react-hook-form cannot infer "translations" as Path<T>
        // inside a generic hook, even though T is constrained to contain translations.
        setValue("translations", nextTranslations, {
            shouldDirty: true,
            shouldValidate: true,
        });

        setTranslationsOpen(false);
    };

    const handleTranslationsCancel = () => {
        setTranslationsOpen(false);
    };

    return {
        translations,
        translationsOpen,
        setTranslationsOpen,
        handleTranslationsDone,
        handleTranslationsCancel,
    };
}

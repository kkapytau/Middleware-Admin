import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type LocaleFormValues } from "@/entities/locale";
import { FormCheckbox, FormInput } from "@/shared/components/form";
import { MAX_CODE_LENGTH } from "@/shared/constants";

interface LocaleFormProps {
    isEditing: boolean;
    control: Control<LocaleFormValues>;
}

export function LocaleForm({ isEditing, control }: LocaleFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH}
                uppercase
                disabled={isEditing}
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            {isEditing && (
                <FormCheckbox control={control} name="deleted">
                    {t("form.deleted")}
                </FormCheckbox>
            )}
        </>
    );
}

import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type LocaleFormValues } from "@/entities/locale";
import { FormInput, FormSwitch } from "@/shared/components/form";
import { MAX_CODE_LENGTH } from "@/shared/constants";

interface LocaleFormProps {
    entityName: string;
    isEditing: boolean;
    control: Control<LocaleFormValues>;
}

export function LocaleForm({ isEditing, control, entityName }: LocaleFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                entityName={entityName}
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH}
                uppercase
                disabled={isEditing}
            />

            <FormInput
                entityName={entityName}
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            <FormSwitch
                entityName={entityName}
                control={control}
                name="isRtl"
                label={t("form.isRtl")}
            />

            {isEditing && (
                <FormSwitch
                    entityName={entityName}
                    control={control}
                    name="disabled"
                    label={t("form.disabled")}
                />
            )}
        </>
    );
}

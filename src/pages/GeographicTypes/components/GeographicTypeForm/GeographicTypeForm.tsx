import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { GeographicTypeFormValues } from "@/entities/geographicType";
import { FormInput, FormSwitch } from "@/shared/components/form";

interface GeographicTypeFormProps {
    isEditing: boolean;
    control: Control<GeographicTypeFormValues>;
}

export function GeographicTypeForm({ isEditing, control }: GeographicTypeFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.code")}
                maxLength={50}
                uppercase
            />

            {isEditing && (
                <FormSwitch control={control} name="deleted" label={t("form.disabled")} />
            )}
        </>
    );
}

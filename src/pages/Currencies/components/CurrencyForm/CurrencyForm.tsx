import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { CurrencyFormValues } from "@/entities/currency";
import { FormInput, FormSwitch } from "@/shared/components/form";

interface CurrencyFormProps {
    entityName: string;
    isEditing: boolean;
    control: Control<CurrencyFormValues>;
}

export function CurrencyForm({ isEditing, control, entityName }: CurrencyFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                entityName={entityName}
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.code")}
                maxLength={3}
                uppercase
                disabled={isEditing}
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

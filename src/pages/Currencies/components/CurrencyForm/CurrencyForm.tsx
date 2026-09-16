import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { CurrencyFormValues } from "@/entities/currency";
import { FormInput, FormSwitch } from "@/shared/components/form";

interface CurrencyFormProps {
    isEditing: boolean;
    control: Control<CurrencyFormValues>;
}

export function CurrencyForm({ isEditing, control }: CurrencyFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.code")}
                maxLength={3}
                uppercase
                disabled={isEditing}
            />

            {isEditing && (
                <FormSwitch control={control} name="deleted" label={t("form.disabled")} />
            )}
        </>
    );
}

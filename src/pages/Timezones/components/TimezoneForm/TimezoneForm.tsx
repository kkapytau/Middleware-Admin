import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { TimezoneFormValues } from "@/entities/timezone";
import { FormInput, FormSwitch } from "@/shared/components/form";

interface TimezoneFormProps {
    isEditing: boolean;
    control: Control<TimezoneFormValues>;
}

export function TimezoneForm({ isEditing, control }: TimezoneFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                control={control}
                name="code"
                label={t("form.timezoneCode")}
                placeholder={t("form.enterTimezoneCode")}
                maxLength={63}
            />

            <FormInput
                control={control}
                name="utcOffset"
                label={t("form.utcOffset")}
                placeholder={t("form.enterUtcOffset")}
            />

            {isEditing && (
                <FormSwitch control={control} name="disabled" label={t("form.disabled")} />
            )}
        </>
    );
}

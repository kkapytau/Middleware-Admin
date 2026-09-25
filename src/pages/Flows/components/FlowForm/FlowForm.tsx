import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type FlowFormValues } from "@/entities/flow";
import { FormInput } from "@/shared/components/form";
import { MAX_CODE_LENGTH } from "@/shared/constants";

interface FlowFormProps {
    entityName: string;
    control: Control<FlowFormValues>;
}

export function FlowForm({ control, entityName }: FlowFormProps) {
    const { t } = useTranslation("app");

    return (
        <>
            <FormInput
                entityName={entityName}
                control={control}
                name="code"
                label={t("form.flowCode")}
                placeholder={t("form.flowCodePlaceholder")}
                minLength={MAX_CODE_LENGTH + 1}
                maxLength={50}
                uppercase
            />

            <FormInput
                entityName={entityName}
                control={control}
                name="name"
                label={t("form.flowName")}
                placeholder={t("form.flowNamePlaceholder")}
            />
        </>
    );
}

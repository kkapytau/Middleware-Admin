import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { MarketGroupFormValues } from "@/entities/marketGroup";
import { FormSwitch, TranslationsModal } from "@/shared/components";
import { FormInput } from "@/shared/components/form";
import { TranslationsButton } from "@/shared/components/form/TranslationsButton";
import { useTranslationsForm } from "@/shared/hooks";

interface MarketGroupFormProps {
    isEditing: boolean;
    entityName: string;
    control: Control<MarketGroupFormValues>;
    setValue: UseFormSetValue<MarketGroupFormValues>;
}

export function MarketGroupForm({
    isEditing,
    control,
    setValue,
    entityName,
}: MarketGroupFormProps) {
    const { t } = useTranslation("app");

    const {
        translations,
        translationsOpen,
        setTranslationsOpen,
        handleTranslationsDone,
        handleTranslationsCancel,
    } = useTranslationsForm({
        control,
        setValue,
    });

    return (
        <>
            <FormInput
                entityName={entityName}
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.code")}
                maxLength={50}
                uppercase
            />

            {isEditing && (
                <FormSwitch
                    entityName={entityName}
                    control={control}
                    name="disabled"
                    label={t("form.disabled")}
                />
            )}

            <TranslationsButton
                entityName={entityName}
                disabled={false}
                onClick={() => setTranslationsOpen(true)}
            ></TranslationsButton>

            <TranslationsModal
                entityName={entityName}
                key={translationsOpen ? "open" : "closed"}
                open={translationsOpen}
                value={translations ?? []}
                onDone={handleTranslationsDone}
                onCancel={handleTranslationsCancel}
            />
        </>
    );
}

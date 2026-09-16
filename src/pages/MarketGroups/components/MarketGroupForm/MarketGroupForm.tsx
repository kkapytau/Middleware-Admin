import { Button, Flex } from "antd";
import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { MarketGroupFormValues } from "@/entities/marketGroup";
import { FormSwitch, TranslationsModal } from "@/shared/components";
import { FormInput } from "@/shared/components/form";
import { useTranslationsForm } from "@/shared/hooks";

interface MarketGroupFormProps {
    isEditing: boolean;
    control: Control<MarketGroupFormValues>;
    setValue: UseFormSetValue<MarketGroupFormValues>;
}

export function MarketGroupForm({ isEditing, control, setValue }: MarketGroupFormProps) {
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
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.code")}
                maxLength={50}
                uppercase
            />

            {isEditing && (
                <FormSwitch control={control} name="disabled" label={t("form.disabled")} />
            )}

            <Flex justify="flex-start">
                <Button type="default" disabled={false} onClick={() => setTranslationsOpen(true)}>
                    🌐 {t("translations.manage")}
                </Button>
            </Flex>

            <TranslationsModal
                key={translationsOpen ? "open" : "closed"}
                open={translationsOpen}
                value={translations ?? []}
                onDone={handleTranslationsDone}
                onCancel={handleTranslationsCancel}
            />
        </>
    );
}

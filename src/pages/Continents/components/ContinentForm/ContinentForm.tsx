import { Button, Flex } from "antd";
import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { ContinentFormValues } from "@/entities/continent";
import { FormInput } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface ContinentFormProps {
    control: Control<ContinentFormValues>;
    setValue: UseFormSetValue<ContinentFormValues>;
}

export function ContinentForm({ control, setValue }: ContinentFormProps) {
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
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH}
                uppercase
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            <Flex justify="flex-start">
                <Button type="default" onClick={() => setTranslationsOpen(true)}>
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

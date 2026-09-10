import { Button, Flex } from "antd";
import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useContinents } from "@/entities/continent";
import { type CountryFormValues } from "@/entities/country";
import { FormInput, FormSelect } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface CountryFormProps {
    control: Control<CountryFormValues>;
    setValue: UseFormSetValue<CountryFormValues>;
}

export function CountryForm({ control, setValue }: CountryFormProps) {
    const { t } = useTranslation("app");

    const { data: continents = [], isLoading: isContinentsLoading } = useContinents();

    const continentsOptions = continents.map((continent) => ({
        value: continent.id,
        label: `${continent.code} - ${continent.name}`,
    }));

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

            <FormSelect
                control={control}
                name="continentId"
                label={t("form.continent")}
                placeholder={t("form.selectContinent")}
                options={continentsOptions}
                loading={isContinentsLoading}
                allowClear
                showSearch
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

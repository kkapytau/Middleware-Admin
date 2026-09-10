import { Button, Flex } from "antd";
import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type CityFormValues } from "@/entities/city";
import { useAllCountries } from "@/entities/country";
import { FormInput, FormSelect } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface CityFormProps {
    control: Control<CityFormValues>;
    setValue: UseFormSetValue<CityFormValues>;
}

export function CityForm({ control, setValue }: CityFormProps) {
    const { t } = useTranslation("app");

    const { data: countries = [], isLoading: isLoadingCountries } = useAllCountries();

    const countryOptions = countries.map((country) => ({
        value: country.id,
        label: `${country.code} — ${country.name}`,
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
                maxLength={MAX_CODE_LENGTH + 1}
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
                name="countryId"
                label={t("form.country")}
                placeholder={t("form.selectCountry")}
                options={countryOptions}
                loading={isLoadingCountries}
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

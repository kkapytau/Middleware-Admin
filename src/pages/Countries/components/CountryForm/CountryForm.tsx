import { Button, Flex } from "antd";
import { type Control, type UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type CountryFormValues } from "@/entities/country";
import { useAllCurrencies } from "@/entities/currency";
import { useAllMarketGroups } from "@/entities/marketGroup";
import { FormInput, FormSelect, FormSwitch } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface CountryFormProps {
    control: Control<CountryFormValues>;
    setValue: UseFormSetValue<CountryFormValues>;
}

export function CountryForm({ control, setValue }: CountryFormProps) {
    const { t } = useTranslation("app");

    const { data: currencies = [], isLoading: isCurrenciesLoading } = useAllCurrencies();

    const { data: marketGroups = [], isLoading: isMarketGroupsLoading } = useAllMarketGroups();

    const currenciesOptions = currencies.map((currency) => ({
        value: currency.id,
        label: currency.code,
    }));

    const marketGroupsOptions = marketGroups.map((marketGroup) => ({
        value: marketGroup.id,
        label: marketGroup.code,
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
                name="codeNumeric"
                label={t("form.codeNumeric")}
                placeholder={t("form.enterCodeNumeric")}
                maxLength={3}
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            <FormSelect
                control={control}
                name="currencyId"
                label={t("form.currency")}
                placeholder={t("form.selectCurrency")}
                options={currenciesOptions}
                loading={isCurrenciesLoading}
                allowClear
                showSearch
            />

            <FormSelect
                control={control}
                name="marketGroupId"
                label={t("form.marketGroup")}
                placeholder={t("form.selectMarketGroup")}
                options={marketGroupsOptions}
                loading={isMarketGroupsLoading}
                allowClear
                showSearch
            />

            <FormSwitch control={control} name="isCountry" label={t("form.isCountry")} />

            <FormSwitch control={control} name="isMarket" label={t("form.isMarket")} />

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

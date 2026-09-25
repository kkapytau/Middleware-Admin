import { useEffect, useRef } from "react";
import { type Control, type UseFormSetValue, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type CountryFormValues } from "@/entities/country";
import { useAllCurrencies } from "@/entities/currency";
import { useAllMarketGroups } from "@/entities/marketGroup";
import { FormInput, FormSelect, FormSwitch } from "@/shared/components/form";
import { TranslationsButton } from "@/shared/components/form/TranslationsButton";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface CountryFormProps {
    entityName: string;
    control: Control<CountryFormValues>;
    setValue: UseFormSetValue<CountryFormValues>;
}

export function CountryForm({ control, setValue, entityName }: CountryFormProps) {
    const { t } = useTranslation("app");

    const { data: currencies = [], isLoading: isCurrenciesLoading } = useAllCurrencies({
        disabled: false,
    });

    const { data: marketGroups = [], isLoading: isMarketGroupsLoading } = useAllMarketGroups({
        disabled: false,
    });

    const currenciesOptions = currencies.map((currency) => ({
        value: currency.id,
        label: currency.code,
    }));

    const marketGroupsOptions = marketGroups.map((marketGroup) => ({
        value: marketGroup.id,
        label: marketGroup.code,
    }));

    const isCountry = useWatch({
        control,
        name: "isCountry",
    });

    const isMarket = useWatch({
        control,
        name: "isMarket",
    });

    const previousIsCountry = useRef(isCountry);
    const previousIsMarket = useRef(isMarket);

    useEffect(() => {
        if (previousIsCountry.current && !isCountry) {
            setValue("codeNumeric", "");
            setValue("currencyId", null);
        }

        previousIsCountry.current = isCountry;
    }, [isCountry, setValue]);

    useEffect(() => {
        if (previousIsMarket.current && !isMarket) {
            setValue("marketGroupId", null);
        }

        previousIsMarket.current = isMarket;
    }, [isMarket, setValue]);

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
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH + 1}
                uppercase
            />

            <FormInput
                entityName={entityName}
                control={control}
                name="codeNumeric"
                label={t("form.codeNumeric")}
                placeholder={t("form.enterCodeNumeric")}
                maxLength={3}
                disabled={!isCountry}
            />

            <FormInput
                entityName={entityName}
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            <FormSelect
                entityName={entityName}
                control={control}
                name="currencyId"
                label={t("form.currency")}
                placeholder={t("form.selectCurrency")}
                options={currenciesOptions}
                loading={isCurrenciesLoading}
                allowClear
                showSearch
                disabled={!isCountry}
            />

            <FormSelect
                entityName={entityName}
                control={control}
                name="marketGroupId"
                label={t("form.marketGroup")}
                placeholder={t("form.selectMarketGroup")}
                options={marketGroupsOptions}
                loading={isMarketGroupsLoading}
                allowClear
                showSearch
                disabled={!isMarket}
            />

            <FormSwitch
                entityName={entityName}
                control={control}
                name="isCountry"
                label={t("form.isCountry")}
            />

            <FormSwitch
                entityName={entityName}
                control={control}
                name="isMarket"
                label={t("form.isMarket")}
            />

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

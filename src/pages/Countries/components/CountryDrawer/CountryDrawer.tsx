import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    type Country,
    type CountryFormValues,
    type CountryRequestValues,
    createCountryFormSchema,
    defaultCountryFormValues,
    useCountry,
    useCreateCountry,
    useUpdateCountry,
} from "@/entities/country";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useEntityMutation, useMutationErrorHandler } from "@/shared/hooks";
import { mapTranslationsToApi, mapTranslationsToForm } from "@/shared/lib";

import { CountryForm } from "../CountryForm";

interface CountryDrawerProps {
    open: boolean;
    country?: Country;
    onClose: () => void;
}

export function CountryDrawer({ open, country, onClose }: CountryDrawerProps) {
    const { t } = useTranslation("app");

    const createCountry = useCreateCountry();
    const updateCountry = useUpdateCountry();
    const { handleError } = useMutationErrorHandler();

    const countryId = country?.id ?? null;

    const { data: countryDetail, isLoading: isLoadingCountry } = useCountry(countryId);

    const transformValues = (values: CountryFormValues): CountryRequestValues => ({
        ...values,
        translations: mapTranslationsToApi(values.translations),
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: country,
        createMutation: createCountry,
        updateMutation: updateCountry,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<CountryFormValues | undefined>(
        () =>
            countryDetail
                ? {
                      code: countryDetail.code,
                      codeNumeric: countryDetail.codeNumeric,
                      name: countryDetail.name,
                      currencyId: countryDetail.currency?.id ?? 0,
                      marketGroupId: countryDetail.marketGroup?.id ?? 0,
                      isCountry: countryDetail.isCountry,
                      isMarket: countryDetail.isMarket,
                      translations: mapTranslationsToForm(countryDetail.translations),
                  }
                : undefined,
        [countryDetail],
    );

    const countryFormSchema = createCountryFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
        codeNumericPattern: t("validation.codeNumeric"),
    });

    const {
        control,
        setValue,
        handleSubmit: handleRHFSubmit,
    } = useEntityForm<CountryFormValues>({
        open,
        defaultValues: defaultCountryFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(countryFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            loading={isEditing && isLoadingCountry}
            submitting={isSubmitting}
            formId="country-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.countries"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.countries"),
                      })
            }
            onClose={onClose}
        >
            <CountryForm control={control} setValue={setValue} />
        </EntityDrawer>
    );
}

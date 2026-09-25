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
    entityName: string;
    country?: Country;
    onClose: () => void;
}

export function CountryDrawer({ open, country, onClose, entityName }: CountryDrawerProps) {
    const { t } = useTranslation("app");

    const createCountry = useCreateCountry();
    const updateCountry = useUpdateCountry();
    const { handleError } = useMutationErrorHandler();

    const countryId = country?.id ?? null;

    const { data: countryDetail, isLoading: isLoadingCountry } = useCountry(countryId);

    const transformValues = (values: CountryFormValues): CountryRequestValues => ({
        code: values.code,
        name: values.name,
        isCountry: values.isCountry,
        isMarket: values.isMarket,
        translations: mapTranslationsToApi(values.translations),

        ...(values.codeNumeric ? { codeNumeric: values.codeNumeric } : {}),

        ...(values.currencyId !== null ? { currencyId: values.currencyId } : {}),

        ...(values.marketGroupId !== null ? { marketGroupId: values.marketGroupId } : {}),
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
                      codeNumeric: countryDetail.codeNumeric ?? "",
                      name: countryDetail.name,
                      currencyId: countryDetail.currency?.id ?? null,
                      marketGroupId: countryDetail.marketGroup?.id ?? null,
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
            entityName={entityName}
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
            <CountryForm entityName={entityName} control={control} setValue={setValue} />
        </EntityDrawer>
    );
}

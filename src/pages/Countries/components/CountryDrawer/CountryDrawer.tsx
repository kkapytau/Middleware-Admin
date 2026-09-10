import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    type CountryDetail,
    type CountryFormValues,
    type CountryRequestValues,
    createCountryFormSchema,
    defaultCountryFormValues,
    useCreateCountry,
    useUpdateCountry,
} from "@/entities/country";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib";
import { mapTranslationsToForm } from "@/shared/lib";

import { CountryForm } from "../CountryForm";

interface CountryDrawerProps {
    open: boolean;
    country?: CountryDetail;
    onClose: () => void;
}

export function CountryDrawer({ open, country, onClose }: CountryDrawerProps) {
    const { t } = useTranslation("app");

    const createCountry = useCreateCountry();
    const updateCountry = useUpdateCountry();
    const { handleError } = useMutationErrorHandler();

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
            country
                ? {
                      code: country.code,
                      name: country.name,
                      continentId: country.continent.id,
                      translations: mapTranslationsToForm(country.translations),
                  }
                : undefined,
        [country],
    );

    const countryFormSchema = createCountryFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
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
            submitting={isSubmitting}
            onSubmit={handleFormFinish}
            formId="country-form"
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

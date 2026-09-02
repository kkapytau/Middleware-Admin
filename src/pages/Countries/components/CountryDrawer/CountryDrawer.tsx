import { useTranslation } from "react-i18next";

import {
    type CountryDetail,
    type CountryFormValues,
    type CountryRequestValues,
    useCreateCountry,
    useUpdateCountry,
} from "@/entities/country";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib/translations/mapTranslationsToApi";
import { mapTranslationsToForm } from "@/shared/lib/translations/mapTranslationsToForm";

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

    return (
        <EntityDrawer
            open={open}
            submitting={isSubmitting}
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
            <CountryForm
                defaultValues={
                    country
                        ? {
                              code: country.code,
                              name: country.name,
                              continentId: country.continent.id,
                              translations: mapTranslationsToForm(country.translations),
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}

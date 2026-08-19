import { useTranslation } from "react-i18next";

import {
    type CountryDetail,
    type CountryFormValues,
    useCreateCountry,
    useUpdateCountry,
} from "@/entities/country";
import { EntityDrawer } from "@/shared/components/EntityDrawer";

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

    const isEditing = Boolean(country);
    const isSubmitting = createCountry.isPending || updateCountry.isPending;

    const handleSubmit = async (values: CountryFormValues) => {
        if (country) {
            await updateCountry.mutateAsync({
                id: country.id,
                values,
            });
        } else {
            await createCountry.mutateAsync(values);
        }

        onClose();
    };

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
                              translations: country.translations,
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}

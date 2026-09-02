import { useTranslation } from "react-i18next";

import {
    type City,
    type CityFormValues,
    type CityRequestValues,
    useCity,
    useCreateCity,
    useUpdateCity,
} from "@/entities/city";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib/translations/mapTranslationsToApi";
import { mapTranslationsToForm } from "@/shared/lib/translations/mapTranslationsToForm";

import { CityForm } from "../CityForm";

interface CityDrawerProps {
    open: boolean;
    city?: City;
    onClose: () => void;
}

export function CityDrawer({ open, city, onClose }: CityDrawerProps) {
    const { t } = useTranslation("app");

    const createCity = useCreateCity();
    const updateCity = useUpdateCity();
    const { handleError } = useMutationErrorHandler();

    const transformValues = (values: CityFormValues): CityRequestValues => ({
        ...values,
        translations: mapTranslationsToApi(values.translations),
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: city,
        createMutation: createCity,
        updateMutation: updateCity,
        transform: transformValues,
        onClose,
        handleError,
    });

    const { data: cityDetail } = useCity(city?.id, {
        enabled: isEditing,
    });

    return (
        <EntityDrawer
            open={open}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.city"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.city"),
                      })
            }
            submitting={isSubmitting}
            formId="city-form"
            onClose={onClose}
        >
            <CityForm
                defaultValues={
                    cityDetail
                        ? {
                              code: cityDetail.code,
                              name: cityDetail.name,
                              countryId: cityDetail.country.id,
                              translations: mapTranslationsToForm(cityDetail.translations),
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}

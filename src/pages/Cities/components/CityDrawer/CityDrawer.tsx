import { useTranslation } from "react-i18next";

import {
    type City,
    type CityFormValues,
    useCity,
    useCreateCity,
    useUpdateCity,
} from "@/entities/city";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";

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

    const isEditing = Boolean(city);

    const { data: cityDetail } = useCity(city?.id, {
        enabled: isEditing,
    });
    const isSubmitting = createCity.isPending || updateCity.isPending;

    const handleSubmit = async (values: CityFormValues) => {
        try {
            if (city) {
                await updateCity.mutateAsync({
                    id: city.id,
                    values,
                });
            } else {
                await createCity.mutateAsync(values);
            }

            onClose();
        } catch (error) {
            if (handleError(error, t("errors.createConflict"))) {
                return;
            }

            throw error;
        }
    };

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
                              translations: cityDetail.translations,
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}

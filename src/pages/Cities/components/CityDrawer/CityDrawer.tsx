import { useTranslation } from "react-i18next";

import {
    type City,
    type CityFormValues,
    useCity,
    useCreateCity,
    useUpdateCity,
} from "@/entities/city";
import { EntityDrawer } from "@/shared/components/EntityDrawer";

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

    const isEditing = Boolean(city);

    const { data: cityDetail } = useCity(city?.id, {
        enabled: isEditing,
    });
    const isSubmitting = createCity.isPending || updateCity.isPending;

    const handleSubmit = async (values: CityFormValues) => {
        if (city) {
            await updateCity.mutateAsync({
                id: city.id,
                values,
            });
        } else {
            await createCity.mutateAsync(values);
        }

        onClose();
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

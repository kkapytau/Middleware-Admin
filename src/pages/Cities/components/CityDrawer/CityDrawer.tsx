import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    type City,
    type CityFormValues,
    type CityRequestValues,
    createCityFormSchema,
    defaultCityFormValues,
    useCity,
    useCreateCity,
    useUpdateCity,
} from "@/entities/city";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib";
import { mapTranslationsToForm } from "@/shared/lib";

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

    const defaultValues = useMemo<CityFormValues | undefined>(
        () =>
            cityDetail
                ? {
                      code: cityDetail.code,
                      name: cityDetail.name,
                      countryId: cityDetail.country.id,
                      translations: mapTranslationsToForm(cityDetail.translations),
                  }
                : undefined,
        [cityDetail],
    );

    const cityFormSchema = createCityFormSchema({
        required: t("validation.required"),
        cityCodeLength: t("validation.cityCodeLength"),
        cityCodePattern: t("validation.cityCodePattern"),
    });

    const {
        control,
        setValue,
        handleSubmit: handleRHFSubmit,
    } = useEntityForm<CityFormValues>({
        open,
        defaultValues: defaultCityFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(cityFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            onSubmit={handleFormFinish}
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
            <CityForm control={control} setValue={setValue} />
        </EntityDrawer>
    );
}

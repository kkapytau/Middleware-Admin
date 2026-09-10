import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
    type Airport,
    type AirportRequestValues,
    createAirportFormSchema,
    defaultAirportFormValues,
    useAirport,
    useCreateAirport,
    useUpdateAirport,
} from "@/entities/airport";
import { type AirportFormValues } from "@/entities/airport/model";
import { AirportForm } from "@/pages/Airports/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useEntityForm, useMutationErrorHandler } from "@/shared/hooks";
import { useEntityMutation } from "@/shared/hooks";
import { mapTranslationsToApi } from "@/shared/lib";
import { mapTranslationsToForm } from "@/shared/lib";

interface AirportDrawerProps {
    open: boolean;
    airport?: Airport;
    onClose: () => void;
}

export function AirportDrawer({ open, airport, onClose }: AirportDrawerProps) {
    const { t } = useTranslation("app");

    const createAirport = useCreateAirport();
    const updateAirport = useUpdateAirport();
    const { handleError } = useMutationErrorHandler();

    const airportId = airport?.id ?? null;

    const { data: airportDetail, isLoading: isLoadingAirport } = useAirport(airportId);

    const transformValues = (values: AirportFormValues): AirportRequestValues => ({
        ...values,
        translations: mapTranslationsToApi(values.translations),
    });

    const { isEditing, isSubmitting, handleSubmit } = useEntityMutation({
        entity: airport,
        createMutation: createAirport,
        updateMutation: updateAirport,
        transform: transformValues,
        onClose,
        handleError,
    });

    const defaultValues = useMemo<AirportFormValues | undefined>(
        () =>
            airportDetail
                ? {
                      code: airportDetail.code,
                      name: airportDetail.name,
                      cityId: airportDetail.cityId,
                      latitude: airportDetail.latitude,
                      longitude: airportDetail.longitude,
                      translations: mapTranslationsToForm(airportDetail.translations),
                      deleted: airportDetail.deleted,
                  }
                : undefined,
        [airportDetail],
    );

    const airportFormSchema = createAirportFormSchema({
        required: t("validation.required"),
        airportCodeLength: t("validation.airportCodeLength"),
        latitudeRange: t("validation.latitudeRange"),
        longitudeRange: t("validation.longitudeRange"),
    });

    const {
        control,
        setValue,
        handleSubmit: handleRHFSubmit,
    } = useEntityForm<AirportFormValues>({
        open,
        defaultValues: defaultAirportFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(airportFormSchema),
    });

    const handleFormFinish = () => handleRHFSubmit(handleSubmit)();

    return (
        <EntityDrawer
            open={open}
            loading={isEditing && isLoadingAirport}
            submitting={isSubmitting}
            formId="airport-form"
            onSubmit={handleFormFinish}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.airports"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.airports"),
                      })
            }
            onClose={onClose}
        >
            <AirportForm isEditing={isEditing} control={control} setValue={setValue} />
        </EntityDrawer>
    );
}

import { useTranslation } from "react-i18next";

import {
    type Airport,
    type AirportRequestValues,
    useAirport,
    useCreateAirport,
    useUpdateAirport,
} from "@/entities/airport";
import { type AirportFormValues } from "@/entities/airport/model";
import { AirportForm } from "@/pages/Airports/components";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";
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

    return (
        <EntityDrawer
            open={open}
            loading={isEditing && isLoadingAirport}
            submitting={isSubmitting}
            formId="airport-form"
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
            <AirportForm
                id="airport-form"
                isEditing={isEditing}
                defaultValues={
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
                        : undefined
                }
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}

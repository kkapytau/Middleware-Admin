import { useTranslation } from "react-i18next";

import { type Airport, useAirport, useCreateAirport, useUpdateAirport } from "@/entities/airport";
import { type AirportFormValues, airportToFormValues } from "@/entities/airport/model";
import { AirportForm } from "@/pages/Airports/components/AirportForm";
import { EntityDrawer } from "@/shared/components/EntityDrawer";
import { useMutationErrorHandler } from "@/shared/hooks";

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

    const isEditing = Boolean(airport);
    const isSubmitting = createAirport.isPending || updateAirport.isPending;

    async function handleSubmit(values: AirportFormValues): Promise<void> {
        try {
            if (airport) {
                await updateAirport.mutateAsync({
                    id: airport.id,
                    values,
                });
            } else {
                await createAirport.mutateAsync(values);
            }

            onClose();
        } catch (error) {
            if (handleError(error, t("errors.createConflict"))) {
                return;
            }

            throw error;
        }
    }

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
                defaultValues={airportDetail ? airportToFormValues(airportDetail) : undefined}
                onSubmit={handleSubmit}
            />
        </EntityDrawer>
    );
}

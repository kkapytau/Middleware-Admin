import { Button, Drawer, Space } from "antd";
import { useTranslation } from "react-i18next";

import { type Airport, useAirport, useCreateAirport, useUpdateAirport } from "@/entities/airport";
import { type AirportFormValues, airportToFormValues } from "@/entities/airport/model";
import { AirportForm } from "@/pages/Airports/components/AirportForm";

import styles from "./AirportDrawer.module.scss";

interface AirportDrawerProps {
    open: boolean;
    airport?: Airport;
    onClose: () => void;
}

export function AirportDrawer({ open, airport, onClose }: AirportDrawerProps) {
    const { t } = useTranslation("app");

    const createAirport = useCreateAirport();
    const updateAirport = useUpdateAirport();

    const airportId = airport?.id ?? null;

    const { data: airportDetail, isLoading: isLoadingAirport } = useAirport(airportId);

    const isEdit = airport !== undefined;
    const isSaving = createAirport.isPending || updateAirport.isPending;

    async function handleSubmit(values: AirportFormValues): Promise<void> {
        if (airport) {
            await updateAirport.mutateAsync({
                id: airport.id,
                values,
            });
        } else {
            await createAirport.mutateAsync(values);
        }

        onClose();
    }

    return (
        <Drawer
            open={open}
            destroyOnHidden
            loading={isEdit && isLoadingAirport}
            title={
                isEdit
                    ? t("actions.edit")
                    : t("actions.addEntity", {
                          entity: t("navigation.airports"),
                      })
            }
            onClose={onClose}
            footer={
                <div className={styles.footer}>
                    <Space>
                        <Button onClick={onClose} disabled={isSaving}>
                            {t("actions.cancel")}
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            form="airport-form"
                            loading={isSaving}
                        >
                            {t("actions.save")}
                        </Button>
                    </Space>
                </div>
            }
        >
            <div className={styles.content}>
                <AirportForm
                    id="airport-form"
                    defaultValues={airportDetail ? airportToFormValues(airportDetail) : undefined}
                    onSubmit={handleSubmit}
                />
            </div>
        </Drawer>
    );
}

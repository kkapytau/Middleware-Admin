import { Button, Drawer, Space } from "antd";
import { useTranslation } from "react-i18next";

import { useCreateAirport, useUpdateAirport } from "@/entities/airport";
import {
    type Airport,
    type AirportFormValues,
    airportToFormValues,
} from "@/entities/airport/model";
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

    const isEdit = airport !== undefined;

    async function handleSubmit(values: AirportFormValues) {
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

    const isSaving = createAirport.isPending || updateAirport.isPending;

    return (
        <Drawer
            open={open}
            destroyOnHidden
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
                        <Button onClick={onClose}>{t("actions.cancel")}</Button>

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
                    defaultValues={airport ? airportToFormValues(airport) : undefined}
                    onSubmit={handleSubmit}
                />
            </div>
        </Drawer>
    );
}

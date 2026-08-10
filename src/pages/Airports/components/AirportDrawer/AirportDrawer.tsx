import { Button, Drawer } from "antd";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { type AirportFormValues, useCreateAirport } from "@/entities/airport";
import { AirportForm, type AirportFormRef } from "@/pages/Airports/components/AirportForm";

import styles from "./AirportDrawer.module.scss";

interface AirportDrawerProps {
    open: boolean;

    onClose: () => void;
}

export function AirportDrawer({ open, onClose }: AirportDrawerProps) {
    const { t } = useTranslation("app");

    const formRef = useRef<AirportFormRef>(null);

    const createAirportMutation = useCreateAirport();

    async function handleSubmit(values: AirportFormValues) {
        await createAirportMutation.mutateAsync(values);

        onClose();
    }

    return (
        <Drawer
            open={open}
            size={520}
            destroyOnHidden
            title={t("actions.addEntity", {
                entity: t("navigation.airports"),
            })}
            onClose={onClose}
            footer={
                <div className={styles.footer}>
                    <Button onClick={onClose}>{t("actions.cancel")}</Button>

                    <Button
                        type="primary"
                        loading={createAirportMutation.isPending}
                        onClick={() => {
                            formRef.current?.submit();
                        }}
                    >
                        {t("actions.save")}
                    </Button>
                </div>
            }
        >
            <div className={styles.content}>
                <AirportForm ref={formRef} onSubmit={handleSubmit} />
            </div>
        </Drawer>
    );
}

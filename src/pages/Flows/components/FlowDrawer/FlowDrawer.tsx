import { Button, Drawer, Space } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { type Flow, type FlowFormValues, useCreateFlow, useUpdateFlow } from "@/entities/flow";

import { FlowForm } from "../FlowForm";
import styles from "./FlowDrawer.module.scss";

interface FlowDrawerProps {
    open: boolean;
    flow?: Flow;
    onClose: () => void;
}

export function FlowDrawer({ open, flow, onClose }: FlowDrawerProps) {
    const { t } = useTranslation("app");

    const createFlow = useCreateFlow();
    const updateFlow = useUpdateFlow();

    const isEditing = Boolean(flow);

    const isSubmitting = createFlow.isPending || updateFlow.isPending;

    const handleSubmit = async (values: FlowFormValues) => {
        if (flow) {
            await updateFlow.mutateAsync({
                id: flow.id,
                values,
            });
        } else {
            await createFlow.mutateAsync(values);
        }

        onClose();
    };

    useEffect(() => {
        if (!open) {
            createFlow.reset();
            updateFlow.reset();
        }
    }, [open, createFlow, updateFlow]);

    return (
        <Drawer
            open={open}
            title={
                isEditing
                    ? t("actions.editEntity", {
                          entity: t("navigation.flow"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.flow"),
                      })
            }
            onClose={onClose}
            destroyOnHidden
            footer={
                <div className={styles.footer}>
                    <Space>
                        <Button onClick={onClose} disabled={isSubmitting}>
                            {t("actions.cancel")}
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            form="flow-form"
                            loading={isSubmitting}
                        >
                            {t("actions.save")}
                        </Button>
                    </Space>
                </div>
            }
        >
            <FlowForm defaultValues={flow} onSubmit={handleSubmit} />
        </Drawer>
    );
}

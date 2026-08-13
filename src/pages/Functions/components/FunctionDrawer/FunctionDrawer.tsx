import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

import type { FlowFunctionDetail, FlowFunctionFormValues } from "@/entities/flowFunction/model";
import { FunctionForm } from "@/pages/Functions/components/FunctionForm";

import styles from "./FunctionDrawer.module.scss";

interface FunctionDrawerProps {
    open: boolean;
    loading: boolean;
    flowFunction?: FlowFunctionDetail;
    onClose: () => void;
    onSubmit: (values: FlowFunctionFormValues) => Promise<void>;
}

export function FunctionDrawer({
    open,
    loading,
    flowFunction,
    onClose,
    onSubmit,
}: FunctionDrawerProps) {
    const { t } = useTranslation("app");

    const isEditMode = Boolean(flowFunction);

    return (
        <Drawer
            open={open}
            loading={loading}
            title={
                isEditMode
                    ? t("actions.editEntity", {
                          entity: t("navigation.function"),
                      })
                    : t("actions.addEntity", {
                          entity: t("navigation.function"),
                      })
            }
            onClose={onClose}
            size="default"
            closable
            destroyOnHidden
        >
            <div className={styles.content}>
                <FunctionForm
                    defaultValues={
                        flowFunction
                            ? {
                                  name: flowFunction.name,
                                  values: flowFunction.values,
                              }
                            : undefined
                    }
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />
            </div>
        </Drawer>
    );
}

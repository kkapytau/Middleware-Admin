import { Button, Drawer, Form, Space } from "antd";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { usePermissions } from "@/app/auth";

import styles from "./EntityDrawer.module.scss";

type EntityDrawerProps<TFormValues> = {
    open: boolean;
    loading?: boolean;
    title: ReactNode;
    formId: string;
    submitting?: boolean;
    onClose: () => void;
    onSubmit: (values: TFormValues) => Promise<void>;
    children: ReactNode;
};

export function EntityDrawer<TFormValues>({
    open,
    loading = false,
    title,
    formId,
    submitting = false,
    onClose,
    onSubmit,
    children,
}: EntityDrawerProps<TFormValues>) {
    const { t } = useTranslation("app");

    const { canUpdate } = usePermissions();

    const handleFormFinish = (values: TFormValues) => {
        if (!canUpdate) {
            return;
        }

        void onSubmit(values);
    };

    return (
        <Drawer
            open={open}
            loading={loading}
            title={title}
            onClose={onClose}
            destroyOnHidden
            footer={
                <div className={styles.footer}>
                    <Space>
                        <Button onClick={onClose} disabled={submitting}>
                            {t("actions.cancel")}
                        </Button>

                        {canUpdate && (
                            <Button
                                type="primary"
                                htmlType="submit"
                                form={formId}
                                loading={submitting}
                            >
                                {t("actions.save")}
                            </Button>
                        )}
                    </Space>
                </div>
            }
        >
            <Form id={formId} layout="vertical" disabled={!canUpdate} onFinish={handleFormFinish}>
                {children}
            </Form>
        </Drawer>
    );
}

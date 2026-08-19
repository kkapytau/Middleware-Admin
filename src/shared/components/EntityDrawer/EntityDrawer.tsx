import { Button, Drawer, Space } from "antd";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import styles from "./EntityDrawer.module.scss";

interface EntityDrawerProps {
    open: boolean;
    loading?: boolean;
    title: string;
    formId: string;
    submitting?: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function EntityDrawer({
    open,
    loading = false,
    title,
    formId,
    submitting = false,
    onClose,
    children,
}: EntityDrawerProps) {
    const { t } = useTranslation("app");

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

                        <Button type="primary" htmlType="submit" form={formId} loading={submitting}>
                            {t("actions.save")}
                        </Button>
                    </Space>
                </div>
            }
        >
            {children}
        </Drawer>
    );
}

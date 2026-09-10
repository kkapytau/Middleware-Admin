import { Button, Popconfirm, Space } from "antd";
import { useTranslation } from "react-i18next";

import { usePermissions } from "@/app/auth";

interface EntityActionsProps<T> {
    record: T;
    onEdit: (record: T) => void;
    onDelete?: (record: T) => Promise<void>;
}

export function EntityActions<T>({ record, onEdit, onDelete }: EntityActionsProps<T>) {
    const { t } = useTranslation("app");

    const handleDelete = () => {
        if (onDelete) {
            void onDelete(record);
        }
    };

    const { canUpdate, canDelete } = usePermissions();

    return (
        <Space>
            <Button onClick={() => onEdit(record)}>
                {canUpdate ? t("actions.edit") : t("actions.view")}
            </Button>

            {onDelete && canDelete && (
                <Popconfirm
                    title={t("actions.delete")}
                    description={t("actions.deleteConfirmation")}
                    onConfirm={handleDelete}
                    okText={t("actions.delete")}
                    cancelText={t("actions.cancel")}
                >
                    <Button danger>{t("actions.delete")}</Button>
                </Popconfirm>
            )}
        </Space>
    );
}

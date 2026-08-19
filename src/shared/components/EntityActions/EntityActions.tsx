import { Button, Popconfirm, Space } from "antd";
import { useTranslation } from "react-i18next";

interface EntityActionsProps<T> {
    record: T;
    onEdit: (record: T) => void;
    onDelete: (record: T) => Promise<void>;
    deleting?: boolean;
}

export function EntityActions<T>({
    record,
    onEdit,
    onDelete,
    deleting = false,
}: EntityActionsProps<T>) {
    const { t } = useTranslation("app");

    const handleDelete = () => {
        void onDelete(record);
    };

    return (
        <Space>
            <Button onClick={() => onEdit(record)}>{t("actions.edit")}</Button>

            <Popconfirm
                title={t("actions.delete")}
                description={t("actions.deleteConfirmation")}
                onConfirm={handleDelete}
                okText={t("actions.delete")}
                cancelText={t("actions.cancel")}
            >
                <Button danger loading={deleting}>
                    {t("actions.delete")}
                </Button>
            </Popconfirm>
        </Space>
    );
}

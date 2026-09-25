import { Button, Popconfirm, Space } from "antd";
import { useTranslation } from "react-i18next";

import { usePermissions } from "@/app/auth";
import { AUTOMATION_ID } from "@/shared/lib";

interface EntityActionsProps<T> {
    record: T;
    entityName: string;
    onEdit: (record: T) => void;
    onDelete?: (record: T) => Promise<void>;
}

export function EntityActions<T>({ record, onEdit, onDelete, entityName }: EntityActionsProps<T>) {
    const { t } = useTranslation("app");

    const handleDelete = () => {
        if (onDelete) {
            void onDelete(record);
        }
    };

    const { canUpdate, canDelete } = usePermissions();

    return (
        <Space>
            <Button data-testid={AUTOMATION_ID.edit(entityName)} onClick={() => onEdit(record)}>
                {canUpdate ? t("actions.edit") : t("actions.view")}
            </Button>

            {onDelete && canDelete && (
                <Popconfirm
                    title={t("actions.delete")}
                    description={t("actions.deleteConfirmation")}
                    onConfirm={handleDelete}
                    okText={t("actions.delete")}
                    cancelText={t("actions.cancel")}
                    okButtonProps={{
                        "data-testid": AUTOMATION_ID.deleteConfirm(entityName),
                    }}
                    cancelButtonProps={{
                        "data-testid": AUTOMATION_ID.deleteCancel(entityName),
                    }}
                >
                    <Button data-testid={AUTOMATION_ID.delete(entityName)} danger>
                        {t("actions.delete")}
                    </Button>
                </Popconfirm>
            )}
        </Space>
    );
}

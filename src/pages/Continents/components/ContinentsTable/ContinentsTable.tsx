import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Continent } from "@/entities/continent";

interface ContinentsTableProps {
    data: Continent[];
    loading: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function ContinentsTable({ data, loading, onEdit, onDelete }: ContinentsTableProps) {
    const { t } = useTranslation("app");
    const columns: ColumnsType<Continent> = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
        },
        {
            title: t("columns.name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: 180,
            render: (_, record) => (
                <Space>
                    <Button type="default" onClick={() => onEdit(record.id)}>
                        {t("actions.edit")}
                    </Button>

                    <Popconfirm
                        title={t("actions.delete")}
                        description={t("actions.deleteConfirmation")}
                        onConfirm={() => onDelete(record.id)}
                        okText={t("actions.delete")}
                        cancelText={t("actions.cancel")}
                    >
                        <Button danger>{t("actions.delete")}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table<Continent> rowKey="id" columns={columns} dataSource={data} loading={loading} />;
}

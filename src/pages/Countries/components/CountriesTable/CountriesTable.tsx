import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Country } from "@/entities/country";

interface CountriesTableProps {
    data: Country[];
    loading: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function CountriesTable({ data, loading, onEdit, onDelete }: CountriesTableProps) {
    const { t } = useTranslation("app");
    const columns: ColumnsType<Country> = [
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
                    <Button onClick={() => onEdit(record.id)}>{t("actions.edit")}</Button>

                    <Popconfirm
                        title={t("actions.deleteConfirmation")}
                        onConfirm={() => {
                            void onDelete(record.id);
                        }}
                        okText={t("actions.delete")}
                        cancelText={t("actions.cancel")}
                    >
                        <Button danger>{t("actions.delete")}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table<Country> rowKey="id" columns={columns} dataSource={data} loading={loading} />;
}

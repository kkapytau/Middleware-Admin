import { Button, Popconfirm, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { FlowFunction } from "@/entities/flowFunction";

interface FunctionsTableProps {
    data: FlowFunction[];

    loading: boolean;

    onEdit: (flowFunction: FlowFunction) => void;

    onDelete: (flowFunction: FlowFunction) => void;
}

export function FunctionsTable({ data, loading, onEdit, onDelete }: FunctionsTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<FlowFunction> = [
        {
            title: t("form.functionName"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("form.keyValuePairs"),
            key: "values",
            render: (_, flowFunction) => (
                <Space orientation="vertical" size={2}>
                    {flowFunction.values.map(({ key, value }) => (
                        <Typography.Text key={key}>
                            <Typography.Text strong>{key}</Typography.Text> → {value}
                        </Typography.Text>
                    ))}
                </Space>
            ),
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: 180,
            render: (_, flowFunction) => (
                <Space>
                    <Button type="default" onClick={() => onEdit(flowFunction)}>
                        {t("actions.edit")}
                    </Button>

                    <Popconfirm
                        title={t("actions.delete")}
                        description={t("actions.deleteConfirmation")}
                        onConfirm={() => onDelete(flowFunction)}
                        okText={t("actions.delete")}
                        cancelText={t("actions.cancel")}
                    >
                        <Button danger>{t("actions.delete")}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table<FlowFunction>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
        />
    );
}

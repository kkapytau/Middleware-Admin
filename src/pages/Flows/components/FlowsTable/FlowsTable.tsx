import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Flow } from "@/entities/flow";

interface FlowsTableProps {
    data: Flow[];
    loading?: boolean;
    deletingFlowId?: number;
    onEdit: (flow: Flow) => void;
    onDelete: (flow: Flow) => Promise<void>;
}

export function FlowsTable({ data, loading, deletingFlowId, onEdit, onDelete }: FlowsTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<Flow> = [
        {
            title: t("form.flowCode"),
            dataIndex: "code",
            key: "code",
        },
        {
            title: t("form.flowName"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            align: "right",
            render: (_, flow) => (
                <Space>
                    <Button onClick={() => onEdit(flow)}>
                        {t("actions.editEntity", {
                            entity: t("navigation.flow"),
                        })}
                    </Button>

                    <Popconfirm
                        title={t("actions.deleteConfirmation")}
                        onConfirm={() => {
                            void onDelete(flow);
                        }}
                        okText={t("actions.delete")}
                        cancelText={t("actions.cancel")}
                    >
                        <Button danger loading={deletingFlowId === flow.id}>
                            {t("actions.delete")}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table<Flow>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
        />
    );
}

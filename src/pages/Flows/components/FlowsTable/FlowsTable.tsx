import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Flow } from "@/entities/flow";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";

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
            width: 180,
            render: (_, flow) => (
                <EntityActions
                    record={flow}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleting={deletingFlowId === flow.id}
                />
            ),
        },
    ];

    return (
        <EntityTable<Flow>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
        />
    );
}

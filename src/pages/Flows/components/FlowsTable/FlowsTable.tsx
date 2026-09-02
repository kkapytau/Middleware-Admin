import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Flow } from "@/entities/flow";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH } from "@/shared/constants/formView";

interface FlowsTableProps {
    data: Flow[];
    loading?: boolean;
    pagination?: TablePaginationConfig;
    deletingFlowId?: number;
    onEdit: (flow: Flow) => void;
    onDelete: (flow: Flow) => Promise<void>;
}

export function FlowsTable({
    data,
    loading,
    deletingFlowId,
    onEdit,
    onDelete,
    pagination,
}: FlowsTableProps) {
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
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
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
            pagination={pagination}
        />
    );
}

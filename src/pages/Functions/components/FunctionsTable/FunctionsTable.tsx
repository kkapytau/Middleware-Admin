import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { FlowFunction } from "@/entities/flowFunction";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH } from "@/shared/constants";

interface FunctionsTableProps {
    data: FlowFunction[];
    entityName: string;
    loading: boolean;
    pagination?: TablePaginationConfig;
    onEdit: (flowFunction: FlowFunction) => void;
    onDelete: (flowFunction: FlowFunction) => Promise<void>;
}

export function FunctionsTable({
    data,
    loading,
    onEdit,
    onDelete,
    pagination,
    entityName,
}: FunctionsTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<FlowFunction> = [
        {
            title: t("form.functionName"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
            render: (_, flowFunction) => (
                <EntityActions
                    entityName={entityName}
                    record={flowFunction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <EntityTable<FlowFunction>
            rowKey="id"
            entityName={entityName}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

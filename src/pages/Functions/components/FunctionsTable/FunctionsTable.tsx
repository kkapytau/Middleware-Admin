import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { FlowFunction } from "@/entities/flowFunction";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";

interface FunctionsTableProps {
    data: FlowFunction[];
    loading: boolean;
    onEdit: (flowFunction: FlowFunction) => void;
    onDelete: (flowFunction: FlowFunction) => Promise<void>;
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
            title: t("actions.actions"),
            key: "actions",
            width: 180,
            render: (_, flowFunction) => (
                <EntityActions record={flowFunction} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];

    return (
        <EntityTable<FlowFunction>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
        />
    );
}

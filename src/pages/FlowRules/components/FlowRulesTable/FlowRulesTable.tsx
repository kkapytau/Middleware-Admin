import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { FlowRule } from "@/entities/flowRule";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH } from "@/shared/constants/formView";

interface FlowRulesTableProps {
    data: FlowRule[];
    loading?: boolean;
    pagination?: TablePaginationConfig;
    deletingFlowRuleId?: number;
    onEdit: (flowRule: FlowRule) => void;
    onDelete: (flowRule: FlowRule) => Promise<void>;
}

export function FlowRulesTable({
    data,
    loading,
    deletingFlowRuleId,
    onEdit,
    onDelete,
    pagination,
}: FlowRulesTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<FlowRule> = [
        {
            title: t("form.flowRuleName"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("form.flow"),
            key: "flow",
            render: (_, flowRule) => flowRule.flow.name,
        },
        {
            title: t("form.enabled"),
            dataIndex: "enabled",
            key: "enabled",
            render: (enabled: boolean) => (enabled ? t("common.yes") : t("common.no")),
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
            render: (_, flowRule) => (
                <EntityActions
                    record={flowRule}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleting={deletingFlowRuleId === flowRule.id}
                />
            ),
        },
    ];

    return (
        <EntityTable<FlowRule>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

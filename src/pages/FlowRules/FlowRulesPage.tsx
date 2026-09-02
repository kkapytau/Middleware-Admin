import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type FlowRule, useDeleteFlowRule, useFlowRule, useFlowRules } from "@/entities/flowRule";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler, useUrlPagination } from "@/shared/hooks";

import { FlowRulesDrawer } from "./components/FlowRulesDrawer";
import { FlowRulesTable } from "./components/FlowRulesTable";

export function FlowRulesPage() {
    const { t } = useTranslation("app");

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data, isLoading } = useFlowRules(apiPage, pageSize);
    const deleteFlowRule = useDeleteFlowRule();
    const { handleError } = useMutationErrorHandler();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFlowRuleId, setEditingFlowRuleId] = useState<number>();

    const { data: editingFlowRule } = useFlowRule(editingFlowRuleId);

    const handleCreate = () => {
        setEditingFlowRuleId(undefined);
        setDrawerOpen(true);
    };

    const handleEdit = (flowRule: FlowRule) => {
        setEditingFlowRuleId(flowRule.id);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setEditingFlowRuleId(undefined);
    };

    const handleDelete = async (flowRule: FlowRule) => {
        try {
            await deleteFlowRule.mutateAsync(flowRule.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar entity={t("navigation.flowRule")} onAdd={handleCreate} />

            <FlowRulesTable
                data={data?.content ?? []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.totalElements ?? 0,
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                deletingFlowRuleId={deleteFlowRule.isPending ? deleteFlowRule.variables : undefined}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FlowRulesDrawer
                open={drawerOpen}
                flowRule={editingFlowRule}
                onClose={handleDrawerClose}
            />
        </Space>
    );
}

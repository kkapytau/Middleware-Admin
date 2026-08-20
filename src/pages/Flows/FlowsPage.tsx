import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Flow, useDeleteFlow, useFlows } from "@/entities/flow";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";

import { FlowDrawer } from "./components/FlowDrawer";
import { FlowsTable } from "./components/FlowsTable";

export function FlowsPage() {
    const { data = [], isLoading } = useFlows();
    const { t } = useTranslation("app");
    const deleteFlow = useDeleteFlow();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFlow, setEditingFlow] = useState<Flow | undefined>();
    const { handleError } = useMutationErrorHandler();

    const handleCreate = () => {
        setEditingFlow(undefined);
        setDrawerOpen(true);
    };

    const handleEdit = (flow: Flow) => {
        setEditingFlow(flow);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setEditingFlow(undefined);
    };

    const handleDelete = async (flow: Flow) => {
        try {
            await deleteFlow.mutateAsync(flow.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar entity={t("navigation.flow")} onAdd={handleCreate} />
            <FlowsTable
                data={data}
                loading={isLoading}
                deletingFlowId={deleteFlow.isPending ? deleteFlow.variables : undefined}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <FlowDrawer open={drawerOpen} flow={editingFlow} onClose={handleDrawerClose} />
        </Space>
    );
}

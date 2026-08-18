import { Space } from "antd";
import { useState } from "react";

import { type Flow, useDeleteFlow, useFlows } from "@/entities/flow";

import { FlowDrawer } from "./components/FlowDrawer";
import { FlowsTable } from "./components/FlowsTable";
import { FlowsToolbar } from "./components/FlowsToolbar";

export function FlowsPage() {
    const { data = [], isLoading } = useFlows();
    const deleteFlow = useDeleteFlow();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFlow, setEditingFlow] = useState<Flow | undefined>();

    const handleAdd = () => {
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
        await deleteFlow.mutateAsync(flow.id);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <FlowsToolbar onAdd={handleAdd} />

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

import { Space } from "antd";
import { useState } from "react";

import type { FlowFunction } from "@/entities/flowFunction";
import { useDeleteFlowFunction, useFlowFunction, useFlowFunctions } from "@/entities/flowFunction";
import { FunctionsToolbar } from "@/pages/Functions/components";

import { FunctionDrawer } from "./components/FunctionDrawer";
import { FunctionsTable } from "./components/FunctionsTable";

export function FlowFunctionsPage() {
    const { data = [], isLoading } = useFlowFunctions();
    const deleteFlowFunction = useDeleteFlowFunction();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFunctionId, setEditingFunctionId] = useState<number | null>(null);

    const { data: editingFunction } = useFlowFunction(editingFunctionId);

    function handleAdd() {
        setEditingFunctionId(null);
        setDrawerOpen(true);
    }

    function handleEdit(flowFunction: FlowFunction) {
        setEditingFunctionId(flowFunction.id);
        setDrawerOpen(true);
    }

    function handleDelete(flowFunction: FlowFunction) {
        deleteFlowFunction.mutate(flowFunction.id);
    }

    function handleDrawerClose() {
        setDrawerOpen(false);
        setEditingFunctionId(null);
    }

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <FunctionsToolbar onAdd={handleAdd} />

            <FunctionsTable
                data={data}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FunctionDrawer
                open={drawerOpen}
                flowFunction={editingFunction}
                onClose={handleDrawerClose}
            />
        </Space>
    );
}

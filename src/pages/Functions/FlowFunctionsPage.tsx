import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { FlowFunction } from "@/entities/flowFunction";
import { useDeleteFlowFunction, useFlowFunction, useFlowFunctions } from "@/entities/flowFunction";
import { EntityToolbar } from "@/shared/components/EntityToolbar";

import { FunctionDrawer } from "./components/FunctionDrawer";
import { FunctionsTable } from "./components/FunctionsTable";

export function FlowFunctionsPage() {
    const { data = [], isLoading } = useFlowFunctions();
    const { t } = useTranslation("app");
    const deleteFlowFunction = useDeleteFlowFunction();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFunctionId, setEditingFunctionId] = useState<number | null>(null);

    const { data: editingFunction } = useFlowFunction(editingFunctionId);

    function handleCreate() {
        setEditingFunctionId(null);
        setDrawerOpen(true);
    }

    function handleEdit(flowFunction: FlowFunction) {
        setEditingFunctionId(flowFunction.id);
        setDrawerOpen(true);
    }

    const handleDelete = async (flowFunction: FlowFunction) => {
        await deleteFlowFunction.mutateAsync(flowFunction.id);
    };

    function handleDrawerClose() {
        setDrawerOpen(false);
        setEditingFunctionId(null);
    }

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar entity={t("navigation.function")} onAdd={handleCreate} />

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

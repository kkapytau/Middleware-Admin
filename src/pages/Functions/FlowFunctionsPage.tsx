import { useState } from "react";

import type { FlowFunction, FlowFunctionFormValues } from "@/entities/flowFunction";
import {
    useCreateFlowFunction,
    useDeleteFlowFunction,
    useFlowFunction,
    useFlowFunctions,
    useUpdateFlowFunction,
} from "@/entities/flowFunction";
import { FunctionsToolbar } from "@/pages/Functions/components";

import { FunctionDrawer } from "./components/FunctionDrawer";
import { FunctionsTable } from "./components/FunctionsTable";
import styles from "./FlowFunctionsPage.module.scss";

export function FlowFunctionsPage() {
    const { data = [], isLoading } = useFlowFunctions();

    const createFlowFunction = useCreateFlowFunction();
    const updateFlowFunction = useUpdateFlowFunction();
    const deleteFlowFunction = useDeleteFlowFunction();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFunctionId, setEditingFunctionId] = useState<number | null>(null);

    const { data: editingFunction, isLoading: isEditingFunctionLoading } =
        useFlowFunction(editingFunctionId);

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

    async function handleSubmit(values: FlowFunctionFormValues): Promise<void> {
        if (editingFunctionId !== null) {
            await updateFlowFunction.mutateAsync({
                id: editingFunctionId,
                values,
            });

            handleDrawerClose();

            return;
        }

        await createFlowFunction.mutateAsync(values);

        handleDrawerClose();
    }

    return (
        <div className={styles.page}>
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
                loading={isEditingFunctionLoading}
                onClose={handleDrawerClose}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

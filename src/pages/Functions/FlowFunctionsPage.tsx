import { useState } from "react";

import type { FlowFunction, FlowFunctionFormValues } from "@/entities/flowFunction";
import {
    useCreateFlowFunction,
    useDeleteFlowFunction,
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
    const [editingFunction, setEditingFunction] = useState<FlowFunction | null>(null);

    function handleAdd() {
        setEditingFunction(null);
        setDrawerOpen(true);
    }

    function handleEdit(flowFunction: FlowFunction) {
        setEditingFunction(flowFunction);
        setDrawerOpen(true);
    }

    function handleDelete(flowFunction: FlowFunction) {
        deleteFlowFunction.mutate(flowFunction.id);
    }

    function handleDrawerClose() {
        setDrawerOpen(false);
        setEditingFunction(null);
    }

    async function handleSubmit(values: FlowFunctionFormValues): Promise<void> {
        if (editingFunction) {
            await updateFlowFunction.mutateAsync({
                id: editingFunction.id,
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
                flowFunction={editingFunction ?? undefined}
                onClose={handleDrawerClose}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

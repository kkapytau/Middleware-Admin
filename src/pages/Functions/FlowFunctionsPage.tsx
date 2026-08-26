import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import type { FlowFunction } from "@/entities/flowFunction";
import { useDeleteFlowFunction, useFlowFunction, useFlowFunctions } from "@/entities/flowFunction";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";
import { getPaginationParams } from "@/shared/lib/pagination/getPaginationParams.ts";

import { FunctionDrawer } from "./components/FunctionDrawer";
import { FunctionsTable } from "./components/FunctionsTable";

export function FlowFunctionsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, pageSize } = getPaginationParams(searchParams);

    const { t } = useTranslation("app");

    const apiPage = page - 1;
    const { data, isLoading } = useFlowFunctions(apiPage, pageSize);

    const deleteFlowFunction = useDeleteFlowFunction();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFunctionId, setEditingFunctionId] = useState<number | null>(null);

    const { data: editingFunction } = useFlowFunction(editingFunctionId);
    const { handleError } = useMutationErrorHandler();

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setSearchParams({
            page: String(nextPage),
            size: String(nextPageSize),
        });
    };

    function handleCreate() {
        setEditingFunctionId(null);
        setDrawerOpen(true);
    }

    function handleEdit(flowFunction: FlowFunction) {
        setEditingFunctionId(flowFunction.id);
        setDrawerOpen(true);
    }

    const handleDelete = async (flowFunction: FlowFunction) => {
        try {
            await deleteFlowFunction.mutateAsync(flowFunction.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    function handleDrawerClose() {
        setDrawerOpen(false);
        setEditingFunctionId(null);
    }

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar entity={t("navigation.function")} onAdd={handleCreate} />

            <FunctionsTable
                data={data?.content ?? []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.totalElements ?? 0,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                }}
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

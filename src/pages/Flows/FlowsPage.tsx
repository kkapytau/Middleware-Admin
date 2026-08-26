import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { type Flow, useDeleteFlow, useFlows } from "@/entities/flow";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";
import { getPaginationParams } from "@/shared/lib/pagination/getPaginationParams.ts";

import { FlowDrawer } from "./components/FlowDrawer";
import { FlowsTable } from "./components/FlowsTable";

export function FlowsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, pageSize } = getPaginationParams(searchParams);

    const { t } = useTranslation("app");

    const apiPage = page - 1;
    const { data, isLoading } = useFlows(apiPage, pageSize);

    const deleteFlow = useDeleteFlow();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFlow, setEditingFlow] = useState<Flow | undefined>();
    const { handleError } = useMutationErrorHandler();

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setSearchParams({
            page: String(nextPage),
            size: String(nextPageSize),
        });
    };

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
                data={data?.content ?? []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.totalElements ?? 0,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                }}
                deletingFlowId={deleteFlow.isPending ? deleteFlow.variables : undefined}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <FlowDrawer open={drawerOpen} flow={editingFlow} onClose={handleDrawerClose} />
        </Space>
    );
}

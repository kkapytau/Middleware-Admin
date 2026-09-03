import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Flow, useAllFlows, useDeleteFlow, useFlows } from "@/entities/flow";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { FilterSearch } from "@/shared/components/FilterSearch";
import { CODE_NAME_FILTER_FIELDS, EMPTY_CODE_NAME_FILTERS } from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";

import { FlowDrawer } from "./components/FlowDrawer";
import { FlowsTable } from "./components/FlowsTable";

export function FlowsPage() {
    const { t } = useTranslation("app");

    const filterFields = CODE_NAME_FILTER_FIELDS;
    const {
        filters,
        hasActiveFilters,
        activeFiltersCount,
        shouldLoadAll,
        open: searchOpen,
        setOpen: setSearchOpen,
        handleChange: handleFiltersChange,
        handleReset: handleFiltersReset,
    } = useUrlFilters({
        fields: filterFields,
        emptyFilters: EMPTY_CODE_NAME_FILTERS,
    });

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data: allFlows = [], isLoading: allFlowsLoading } = useAllFlows(shouldLoadAll);

    const filteredFlows = useFilter(allFlows, filters, filterFields);

    const { data, isLoading, isFetching } = useFlows(apiPage, pageSize);

    const deleteFlow = useDeleteFlow();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFlow, setEditingFlow] = useState<Flow | undefined>();
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredFlows : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allFlowsLoading : isLoading || isFetching;

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
            <EntityToolbar
                entity={t("navigation.flow")}
                onAdd={handleCreate}
                actions={
                    <FilterButton
                        label={t("filters.title")}
                        activeCount={activeFiltersCount}
                        open={searchOpen}
                        onOpenChange={setSearchOpen}
                    >
                        <FilterSearch
                            fields={filterFields}
                            initialValues={filters}
                            emptyValues={EMPTY_CODE_NAME_FILTERS}
                            onChange={handleFiltersChange}
                            onReset={handleFiltersReset}
                        />
                    </FilterButton>
                }
            />
            <FlowsTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredFlows.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                deletingFlowId={deleteFlow.isPending ? deleteFlow.variables : undefined}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <FlowDrawer open={drawerOpen} flow={editingFlow} onClose={handleDrawerClose} />
        </Space>
    );
}

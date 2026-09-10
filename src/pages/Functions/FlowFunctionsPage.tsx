import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type FlowFunction, useAllFlowFunctions } from "@/entities/flowFunction";
import { useDeleteFlowFunction, useFlowFunction, useFlowFunctions } from "@/entities/flowFunction";
import { FilterButton, FilterSearch } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { EMPTY_FUNCTION_FILTERS, NAME_FILTER_FIELDS } from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";

import { FunctionDrawer } from "./components";
import { FunctionsTable } from "./components";

export function FlowFunctionsPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFunctionId, setEditingFunctionId] = useState<number | null>(null);

    const { t } = useTranslation("app");

    const filterFields = NAME_FILTER_FIELDS;
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
        emptyFilters: EMPTY_FUNCTION_FILTERS,
    });

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data: allFunctions = [], isLoading: allFunctionsLoading } =
        useAllFlowFunctions(shouldLoadAll);

    const filteredFunctions = useFilter(allFunctions, filters, filterFields);

    const { data, isLoading, isFetching } = useFlowFunctions(apiPage, pageSize);

    const deleteFlowFunction = useDeleteFlowFunction();

    const { data: editingFunction } = useFlowFunction(editingFunctionId);
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredFunctions : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allFunctionsLoading : isLoading || isFetching;

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
            <EntityToolbar
                entity={t("navigation.function")}
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
                            emptyValues={EMPTY_FUNCTION_FILTERS}
                            onChange={handleFiltersChange}
                            onReset={handleFiltersReset}
                            onClose={() => setSearchOpen(false)}
                        />
                    </FilterButton>
                }
            />

            <FunctionsTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredFunctions.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
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

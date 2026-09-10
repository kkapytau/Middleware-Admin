import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type FlowRule,
    useAllFlowRules,
    useDeleteFlowRule,
    useFlowRule,
    useFlowRules,
} from "@/entities/flowRule";
import { FilterButton, FilterSearch } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { EMPTY_FLOW_RULE_FILTERS, FLOW_RULE_FILTER_FIELDS } from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";

import { FlowRulesDrawer } from "./components/FlowRulesDrawer";
import { FlowRulesTable } from "./components/FlowRulesTable";

export function FlowRulesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFlowRuleId, setEditingFlowRuleId] = useState<number>();

    const { t } = useTranslation("app");

    const filterFields = FLOW_RULE_FILTER_FIELDS;
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
        emptyFilters: EMPTY_FLOW_RULE_FILTERS,
    });

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data: allFlowRules = [], isLoading: allFlowRulesLoading } =
        useAllFlowRules(shouldLoadAll);

    const filteredFlowRules = useFilter(allFlowRules, filters, filterFields);

    const { data, isLoading, isFetching } = useFlowRules(apiPage, pageSize);
    const deleteFlowRule = useDeleteFlowRule();
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredFlowRules : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allFlowRulesLoading : isLoading || isFetching;

    const { data: editingFlowRule } = useFlowRule(editingFlowRuleId);

    const handleCreate = () => {
        setEditingFlowRuleId(undefined);
        setDrawerOpen(true);
    };

    const handleEdit = (flowRule: FlowRule) => {
        setEditingFlowRuleId(flowRule.id);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setEditingFlowRuleId(undefined);
    };

    const handleDelete = async (flowRule: FlowRule) => {
        try {
            await deleteFlowRule.mutateAsync(flowRule.id);
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
                entity={t("navigation.flowRule")}
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
                            emptyValues={EMPTY_FLOW_RULE_FILTERS}
                            onChange={handleFiltersChange}
                            onReset={handleFiltersReset}
                            onClose={() => setSearchOpen(false)}
                        />
                    </FilterButton>
                }
            />

            <FlowRulesTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredFlowRules.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                deletingFlowRuleId={deleteFlowRule.isPending ? deleteFlowRule.variables : undefined}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FlowRulesDrawer
                open={drawerOpen}
                flowRule={editingFlowRule}
                onClose={handleDrawerClose}
            />
        </Space>
    );
}

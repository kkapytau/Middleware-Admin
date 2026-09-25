import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type MarketGroup,
    useAllMarketGroups,
    useDeleteMarketGroup,
    useDownloadMarketGroups,
    useMarketGroup,
    useMarketGroups,
} from "@/entities/marketGroup";
import { DownloadButton } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { FilterSearch } from "@/shared/components/FilterSearch";
import { CODE_DISABLED_FILTER_FIELDS, EMPTY_CODE_DISABLED_FILTERS } from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";
import { AUTOMATION_ID, downloadBlob } from "@/shared/lib";

import { MarketGroupDrawer, MarketGroupsTable } from "./components";

const entityName = "market-groups";

export function MarketGroupsPage() {
    const { t } = useTranslation("app");

    const downloadMarketGroups = useDownloadMarketGroups();

    const filterFields = CODE_DISABLED_FILTER_FIELDS;
    const emptyFilterFields = EMPTY_CODE_DISABLED_FILTERS;

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
        emptyFilters: emptyFilterFields,
    });

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data: allMarketGroups = [], isLoading: allMarketGroupsLoading } = useAllMarketGroups({
        enabled: shouldLoadAll,
    });

    const filteredMarketGroups = useFilter(allMarketGroups, filters, filterFields);

    const { data, isLoading, isFetching } = useMarketGroups(apiPage, pageSize);

    const deleteMarketGroup = useDeleteMarketGroup();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedMarketGroupId, setSelectedMarketGroupId] = useState<number | null>(null);

    const { data: marketGroupDetail } = useMarketGroup(selectedMarketGroupId);

    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredMarketGroups : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allMarketGroupsLoading : isLoading || isFetching;

    function handleCreate() {
        setSelectedMarketGroupId(null);
        setDrawerOpen(true);
    }

    function handleEdit(marketGroup: MarketGroup) {
        setSelectedMarketGroupId(marketGroup.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedMarketGroupId(null);
    }

    const handleDelete = async (marketGroup: MarketGroup) => {
        try {
            await deleteMarketGroup.mutateAsync(marketGroup.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    const handleDownload = async () => {
        const blob = await downloadMarketGroups.mutateAsync();

        downloadBlob(blob, `${entityName}.csv`);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                testId={AUTOMATION_ID.add(entityName)}
                entity={t("navigation.marketGroups")}
                onAdd={handleCreate}
                actions={
                    <>
                        <FilterButton
                            testId={AUTOMATION_ID.filterActivator(entityName)}
                            label={t("filters.title")}
                            activeCount={activeFiltersCount}
                            open={searchOpen}
                            onOpenChange={setSearchOpen}
                        >
                            <FilterSearch
                                entityName={entityName}
                                fields={filterFields}
                                initialValues={filters}
                                emptyValues={emptyFilterFields}
                                onChange={handleFiltersChange}
                                onReset={handleFiltersReset}
                                onClose={() => setSearchOpen(false)}
                            />
                        </FilterButton>

                        <DownloadButton
                            testId={AUTOMATION_ID.download(entityName)}
                            loading={downloadMarketGroups.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
                }
            />

            <MarketGroupsTable
                entityName={entityName}
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters
                        ? filteredMarketGroups.length
                        : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <MarketGroupDrawer
                entityName={entityName}
                open={drawerOpen}
                marketGroup={marketGroupDetail}
                onClose={handleClose}
            />
        </Space>
    );
}

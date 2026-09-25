import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Area,
    useAllAreas,
    useArea,
    useAreas,
    useDeleteArea,
    useDownloadAreas,
} from "@/entities/area";
import { AreaDrawer } from "@/pages/Areas/components/AreaDrawer";
import { AreasTable } from "@/pages/Areas/components/AreasTable";
import { DownloadButton, FilterButton, FilterSearch } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import {
    CODE_NAME_DISABLED_FILTER_FIELDS,
    EMPTY_CODE_NAME_DISABLED_FILTERS,
} from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";
import { AUTOMATION_ID, downloadBlob } from "@/shared/lib";

const entityName = "areas";

export function AreasPage() {
    const { t } = useTranslation("app");

    const downloadAreas = useDownloadAreas();

    const filterFields = CODE_NAME_DISABLED_FILTER_FIELDS;
    const emptyFilterFields = EMPTY_CODE_NAME_DISABLED_FILTERS;

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

    const { data: allAreas = [], isLoading: allAreasLoading } = useAllAreas({
        enabled: shouldLoadAll,
    });

    const filteredAreas = useFilter(allAreas, filters, filterFields);

    const { data, isLoading, isFetching } = useAreas(apiPage, pageSize);

    const deleteArea = useDeleteArea();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingAreaId, setEditingAreaId] = useState<number | null>(null);

    const { data: editingArea } = useArea(editingAreaId);
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredAreas : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allAreasLoading : isLoading || isFetching;

    const handleCreate = () => {
        setEditingAreaId(null);
        setDrawerOpen(true);
    };

    const handleEdit = (area: Area) => {
        setEditingAreaId(area.id);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingAreaId(null);
    };

    const handleDelete = async (area: Area) => {
        try {
            await deleteArea.mutateAsync(area.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    const handleDownload = async () => {
        const blob = await downloadAreas.mutateAsync();

        downloadBlob(blob, `${entityName}.csv`);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                testId={AUTOMATION_ID.add(entityName)}
                entity={t("navigation.area")}
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
                            loading={downloadAreas.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
                }
            />

            <AreasTable
                entityName={entityName}
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredAreas.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AreaDrawer
                entityName={entityName}
                open={drawerOpen}
                area={editingArea}
                onClose={handleClose}
            />
        </Space>
    );
}

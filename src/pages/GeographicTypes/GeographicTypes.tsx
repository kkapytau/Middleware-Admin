import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type GeographicType,
    useAllGeographicTypes,
    useDeleteGeographicType,
    useDownloadGeographicTypes,
    useGeographicType,
    useGeographicTypes,
} from "@/entities/geographicType";
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

import { GeographicTypeDrawer, GeographicTypesTable } from "./components";

const entityName = "geographic-types";

export function GeographicTypesPage() {
    const { t } = useTranslation("app");

    const downloadGeographicTypes = useDownloadGeographicTypes();

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

    const { data: allGeographicTypes = [], isLoading: allGeographicTypesLoading } =
        useAllGeographicTypes({
            enabled: shouldLoadAll,
        });

    const filteredGeographicTypes = useFilter(allGeographicTypes, filters, filterFields);

    const { data, isLoading, isFetching } = useGeographicTypes(apiPage, pageSize);

    const deleteGeographicType = useDeleteGeographicType();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedGeographicTypeId, setSelectedGeographicTypeId] = useState<number | null>(null);

    const { data: geographicTypeDetail } = useGeographicType(selectedGeographicTypeId);

    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredGeographicTypes : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allGeographicTypesLoading : isLoading || isFetching;

    function handleCreate() {
        setSelectedGeographicTypeId(null);
        setDrawerOpen(true);
    }

    function handleEdit(geographicType: GeographicType) {
        setSelectedGeographicTypeId(geographicType.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedGeographicTypeId(null);
    }

    const handleDelete = async (geographicType: GeographicType) => {
        try {
            await deleteGeographicType.mutateAsync(geographicType.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    const handleDownload = async () => {
        const blob = await downloadGeographicTypes.mutateAsync();

        downloadBlob(blob, `${entityName}.csv`);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                testId={AUTOMATION_ID.add(entityName)}
                entity={t("navigation.geographicTypes")}
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
                            loading={downloadGeographicTypes.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
                }
            />

            <GeographicTypesTable
                entityName={entityName}
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters
                        ? filteredGeographicTypes.length
                        : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <GeographicTypeDrawer
                entityName={entityName}
                open={drawerOpen}
                geographicType={geographicTypeDetail}
                onClose={handleClose}
            />
        </Space>
    );
}

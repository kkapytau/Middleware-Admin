import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Airport,
    useAirport,
    useAirports,
    useDeleteAirport,
    useDownloadAirports,
} from "@/entities/airport";
import { useAllAirports } from "@/entities/airport/hooks/useAllAirports";
import { DownloadButton } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { FilterSearch } from "@/shared/components/FilterSearch";
import { AIRPORT_FILTER_FIELDS, EMPTY_AIRPORT_FILTERS } from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";
import { downloadBlob } from "@/shared/lib";

import { AirportDrawer } from "./components";
import { AirportsTable } from "./components";

export function AirportsPage() {
    const { t } = useTranslation("app");

    const filterFields = AIRPORT_FILTER_FIELDS;
    const emptyFilterFields = EMPTY_AIRPORT_FILTERS;
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

    const downloadAirports = useDownloadAirports();

    const { data: allAirports = [], isLoading: allAirportsLoading } = useAllAirports(shouldLoadAll);

    const filteredAirports = useFilter(allAirports, filters, filterFields);

    const { data, isLoading, isFetching } = useAirports(apiPage, pageSize);

    const deleteAirport = useDeleteAirport();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAirportId, setSelectedAirportId] = useState<number | null>(null);

    const { data: airportDetail } = useAirport(selectedAirportId);
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredAirports : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allAirportsLoading : isLoading || isFetching;

    function handleCreate() {
        setSelectedAirportId(null);
        setDrawerOpen(true);
    }

    function handleEdit(airport: Airport) {
        setSelectedAirportId(airport.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedAirportId(null);
    }

    const handleDelete = async (airport: Airport) => {
        try {
            await deleteAirport.mutateAsync(airport.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    const handleDownload = async () => {
        const blob = await downloadAirports.mutateAsync();

        downloadBlob(blob, "airports.csv");
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                entity={t("navigation.airports")}
                onAdd={handleCreate}
                actions={
                    <>
                        <FilterButton
                            label={t("filters.title")}
                            activeCount={activeFiltersCount}
                            open={searchOpen}
                            onOpenChange={setSearchOpen}
                        >
                            <FilterSearch
                                fields={filterFields}
                                initialValues={filters}
                                emptyValues={emptyFilterFields}
                                onChange={handleFiltersChange}
                                onReset={handleFiltersReset}
                                onClose={() => setSearchOpen(false)}
                            />
                        </FilterButton>

                        <DownloadButton
                            loading={downloadAirports.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
                }
            />

            <AirportsTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredAirports.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AirportDrawer open={drawerOpen} airport={airportDetail} onClose={handleClose} />
        </Space>
    );
}

import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Airport, useAirport, useAirports, useDeleteAirport } from "@/entities/airport";
import { useAllAirports } from "@/entities/airport/hooks/useAllAirports.ts";
import { CodeNameSearch } from "@/shared/components/CodeNameSearch";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import {
    useCodeNameFiltering,
    useCodeNameFilters,
    useMutationErrorHandler,
    useUrlPagination,
} from "@/shared/hooks";

import { AirportDrawer } from "./components/AirportDrawer";
import { AirportsTable } from "./components/AirportsTable";

export function AirportsPage() {
    const { t } = useTranslation("app");

    const {
        filters,
        hasActiveFilters,
        activeFiltersCount,
        shouldLoadAll,
        open: searchOpen,
        setOpen: setSearchOpen,
        handleChange: handleFiltersChange,
        handleReset: handleFiltersReset,
    } = useCodeNameFilters();

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data: allAirports = [], isLoading: allAirportsLoading } = useAllAirports(shouldLoadAll);

    const filteredAirports = useCodeNameFiltering(allAirports, filters);

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

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                entity={t("navigation.airports")}
                onAdd={handleCreate}
                actions={
                    <FilterButton
                        label={t("filters.title")}
                        activeCount={activeFiltersCount}
                        open={searchOpen}
                        onOpenChange={setSearchOpen}
                    >
                        <CodeNameSearch
                            initialValues={filters}
                            onChange={handleFiltersChange}
                            onReset={handleFiltersReset}
                        />
                    </FilterButton>
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

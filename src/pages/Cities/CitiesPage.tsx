import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type City, useAllCities, useCities, useDeleteCity } from "@/entities/city";
import { CityDrawer } from "@/pages/Cities/components/CityDrawer";
import { CityTable } from "@/pages/Cities/components/CityTable";
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

export function CitiesPage() {
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

    const { data: allCities = [], isLoading: allCitiesLoading } = useAllCities(shouldLoadAll);

    const filteredCities = useFilter(allCities, filters, filterFields);

    const { data, isLoading, isFetching } = useCities(apiPage, pageSize);
    const deleteCity = useDeleteCity();
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredCities : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allCitiesLoading : isLoading || isFetching;

    const [openDrawer, setOpenDrawer] = useState(false);
    const [editingCity, setEditingCity] = useState<City | undefined>();

    const handleAdd = () => {
        setEditingCity(undefined);
        setOpenDrawer(true);
    };

    const handleEdit = (city: City) => {
        setEditingCity(city);
        setOpenDrawer(true);
    };

    const handleDelete = async (city: City) => {
        try {
            await deleteCity.mutateAsync(city.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    const handleClose = () => {
        setOpenDrawer(false);
        setEditingCity(undefined);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                entity={t("navigation.city")}
                onAdd={handleAdd}
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
                            onClose={() => setSearchOpen(false)}
                        />
                    </FilterButton>
                }
            />

            <CityTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredCities.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                deleting={deleteCity.isPending}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CityDrawer open={openDrawer} city={editingCity} onClose={handleClose} />
        </Space>
    );
}

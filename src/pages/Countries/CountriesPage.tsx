import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Country,
    useAllCountries,
    useCountries,
    useCountry,
    useDeleteCountry,
} from "@/entities/country";
import { CountriesTable } from "@/pages/Countries/components/CountriesTable";
import { CountryDrawer } from "@/pages/Countries/components/CountryDrawer";
import { CodeNameSearch } from "@/shared/components/CodeNameSearch";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import {
    useCodeNameFiltering,
    useCodeNameFilters,
    useMutationErrorHandler,
    useUrlPagination,
} from "@/shared/hooks";

export function CountriesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingCountryId, setEditingCountryId] = useState<number | null>(null);

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

    const { data: allCountries = [], isLoading: allCountriesLoading } =
        useAllCountries(shouldLoadAll);

    const filteredCountries = useCodeNameFiltering(allCountries, filters);

    const { data, isLoading, isFetching } = useCountries(apiPage, pageSize);

    const { data: editingCountry } = useCountry(editingCountryId);

    const deleteCountry = useDeleteCountry();
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredCountries : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allCountriesLoading : isLoading || isFetching;

    const handleCreate = () => {
        setEditingCountryId(null);
        setDrawerOpen(true);
    };

    const handleEdit = (country: Country) => {
        setEditingCountryId(country.id);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingCountryId(null);
    };

    const handleDelete = async (country: Country) => {
        try {
            await deleteCountry.mutateAsync(country.id);
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
                entity={t("navigation.countries")}
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

            <CountriesTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredCountries.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CountryDrawer open={drawerOpen} country={editingCountry} onClose={handleClose} />
        </Space>
    );
}

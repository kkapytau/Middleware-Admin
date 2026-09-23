import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Country,
    useAllCountries,
    useCountries,
    useDeleteCountry,
    useDownloadCountries,
} from "@/entities/country";
import { CountriesTable } from "@/pages/Countries/components/CountriesTable";
import { CountryDrawer } from "@/pages/Countries/components/CountryDrawer";
import { DownloadButton } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { FilterSearch } from "@/shared/components/FilterSearch";
import { COUNTRY_FILTER_FIELDS, EMPTY_COUNTRY_FILTERS } from "@/shared/config/filters";
import {
    useFilter,
    useMutationErrorHandler,
    useUrlFilters,
    useUrlPagination,
} from "@/shared/hooks";
import { downloadBlob } from "@/shared/lib";

export function CountriesPage() {
    const { t } = useTranslation("app");

    const downloadCountries = useDownloadCountries();

    const filterFields = COUNTRY_FILTER_FIELDS;
    const emptyFilterFields = EMPTY_COUNTRY_FILTERS;

    const {
        filters,
        hasActiveFilters,
        activeFiltersCount,
        shouldLoadAll,
        open: searchOpen,
        setOpen: setSearchOpen,
        handleChange: handleFiltersChange,
        handleReset: handleFiltersReset,
    } = useUrlFilters({ fields: filterFields, emptyFilters: emptyFilterFields });

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data: allCountries = [], isLoading: allCountriesLoading } = useAllCountries({
        enabled: shouldLoadAll,
    });

    const filteredCountries = useFilter(allCountries, filters, filterFields);

    const { data, isLoading, isFetching } = useCountries(apiPage, pageSize);

    const deleteCountry = useDeleteCountry();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingCountry, setEditingCountry] = useState<Country | undefined>();

    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredCountries : (data?.content ?? []);
    const tableLoading = hasActiveFilters ? allCountriesLoading : isLoading || isFetching;

    const handleCreate = () => {
        setEditingCountry(undefined);
        setDrawerOpen(true);
    };

    const handleEdit = (country: Country) => {
        setEditingCountry(country);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingCountry(undefined);
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

    const handleDownload = async () => {
        const blob = await downloadCountries.mutateAsync();

        downloadBlob(blob, "countries.csv");
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                entity={t("navigation.countries")}
                onAdd={handleCreate}
                actions={
                    <>
                        <FilterButton
                            label={t("filters.title")}
                            activeCount={activeFiltersCount}
                            open={searchOpen}
                            onOpenChange={setSearchOpen}
                            placement="bottom"
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
                            loading={downloadCountries.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
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

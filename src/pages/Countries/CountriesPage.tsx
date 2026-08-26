import { Space } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
    type Country,
    useAllCountries,
    useCountries,
    useCountry,
    useDeleteCountry,
} from "@/entities/country";
import { CountriesSearch, type CountryFilters } from "@/pages/Countries/components/CountriesSearch";
import { CountriesTable } from "@/pages/Countries/components/CountriesTable";
import { CountryDrawer } from "@/pages/Countries/components/CountryDrawer";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { useMutationErrorHandler } from "@/shared/hooks";
import { hasActiveFilters as hasAnyValue } from "@/shared/lib/activeFilter/hasActiveFilters";
import { getPaginationParams } from "@/shared/lib/pagination/getPaginationParams";
import { updateSearchParams } from "@/shared/lib/updateSearchParams/updateSearchParams";

export function CountriesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingCountryId, setEditingCountryId] = useState<number | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, pageSize } = getPaginationParams(searchParams);

    const filters = useMemo<CountryFilters>(
        () => ({
            code: searchParams.get("code") ?? "",
            name: searchParams.get("name") ?? "",
        }),
        [searchParams],
    );

    const hasActiveFilters = hasAnyValue(filters);
    const shouldLoadAllCountries = searchOpen || hasActiveFilters;

    const { data: allCountries = [], isLoading: allCountriesLoading } =
        useAllCountries(shouldLoadAllCountries);

    const { t } = useTranslation("app");

    const filteredCountries = useMemo(() => {
        if (!hasActiveFilters) {
            return [];
        }

        const code = filters.code.trim().toLowerCase();
        const name = filters.name.trim().toLowerCase();

        return allCountries.filter((country) => {
            const matchesCode = !code || country.code.toLowerCase().includes(code);

            const matchesName = !name || country.name.toLowerCase().includes(name);

            return matchesCode && matchesName;
        });
    }, [allCountries, filters, hasActiveFilters]);

    const apiPage = page - 1;

    const { data, isLoading, isFetching } = useCountries(apiPage, pageSize);

    const { data: editingCountry } = useCountry(editingCountryId);

    const deleteCountry = useDeleteCountry();
    const { handleError } = useMutationErrorHandler();

    const tableData = hasActiveFilters ? filteredCountries : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allCountriesLoading : isLoading || isFetching;

    const handleFiltersChange = useCallback(
        (nextFilters: CountryFilters) => {
            updateSearchParams(setSearchParams, {
                page: "1",
                code: nextFilters.code.trim() || null,
                name: nextFilters.name.trim() || null,
            });
        },
        [setSearchParams],
    );

    const handleFiltersReset = useCallback(() => {
        updateSearchParams(setSearchParams, {
            page: "1",
            code: null,
            name: null,
        });
    }, [setSearchParams]);

    const handlePaginationChange = useCallback(
        (nextPage: number, nextPageSize: number) => {
            updateSearchParams(setSearchParams, {
                page: String(nextPage),
                size: String(nextPageSize),
            });
        },
        [setSearchParams],
    );

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

    const activeFiltersCount = [filters.code, filters.name].filter(Boolean).length;

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
                        <CountriesSearch
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

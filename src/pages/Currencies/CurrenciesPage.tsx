import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Currency,
    useAllCurrencies,
    useCurrencies,
    useCurrency,
    useDownloadCurrencies,
} from "@/entities/currency";
import { DownloadButton } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { FilterSearch } from "@/shared/components/FilterSearch";
import { CODE_DISABLED_FILTER_FIELDS, EMPTY_CODE_DISABLED_FILTERS } from "@/shared/config/filters";
import { useFilter, useUrlFilters, useUrlPagination } from "@/shared/hooks";
import { downloadBlob } from "@/shared/lib";

import { CurrenciesTable, CurrencyDrawer } from "./components";

export function CurrenciesPage() {
    const { t } = useTranslation("app");

    const downloadCurrencies = useDownloadCurrencies();

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

    const { data: allCurrencies = [], isLoading: allCurrenciesLoading } = useAllCurrencies({
        enabled: shouldLoadAll,
    });

    const filteredCurrencies = useFilter(allCurrencies, filters, filterFields);

    const { data, isLoading, isFetching } = useCurrencies(apiPage, pageSize);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(null);

    const { data: currencyDetail } = useCurrency(selectedCurrencyId);

    const tableData = hasActiveFilters ? filteredCurrencies : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allCurrenciesLoading : isLoading || isFetching;

    function handleCreate() {
        setSelectedCurrencyId(null);
        setDrawerOpen(true);
    }

    function handleEdit(currency: Currency) {
        setSelectedCurrencyId(currency.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedCurrencyId(null);
    }

    const handleDownload = async () => {
        const blob = await downloadCurrencies.mutateAsync();

        downloadBlob(blob, "currencies.csv");
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                entity={t("navigation.currencies")}
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
                            loading={downloadCurrencies.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
                }
            />

            <CurrenciesTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters
                        ? filteredCurrencies.length
                        : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
            />

            <CurrencyDrawer open={drawerOpen} currency={currencyDetail} onClose={handleClose} />
        </Space>
    );
}

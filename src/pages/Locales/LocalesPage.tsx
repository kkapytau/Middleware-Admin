import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Locale, useAllLocales, useLocale, useLocales } from "@/entities/locale";
import { FilterButton, FilterSearch } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { EMPTY_LOCALE_FILTERS, LOCALE_FILTER_FIELDS } from "@/shared/config/filters";
import { useFilter, useUrlFilters, useUrlPagination } from "@/shared/hooks";
import { AUTOMATION_ID } from "@/shared/lib";

import { LocaleDrawer } from "./components/LocaleDrawer";
import { LocaleTable } from "./components/LocaleTable";

const entityName = "locales";

export function LocalesPage() {
    const { t } = useTranslation("app");

    const filterFields = LOCALE_FILTER_FIELDS;
    const emptyFilterFields = EMPTY_LOCALE_FILTERS;

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

    const { data, isLoading, isFetching } = useLocales(apiPage, pageSize);

    const { data: allLocales = [], isLoading: allLocalesLoading } = useAllLocales({
        enabled: shouldLoadAll,
    });

    const filteredLocales = useFilter(allLocales, filters, filterFields);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingLocaleId, setEditingLocaleId] = useState<number | null>(null);

    const { data: editingLocale } = useLocale(editingLocaleId as number);

    const tableData = hasActiveFilters ? filteredLocales : (data?.content ?? []);
    const tableLoading = hasActiveFilters ? allLocalesLoading : isLoading || isFetching;

    const handleCreate = () => {
        setEditingLocaleId(null);
        setDrawerOpen(true);
    };

    const handleEdit = (locale: Locale) => {
        setEditingLocaleId(locale.id);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingLocaleId(null);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                testId={AUTOMATION_ID.add(entityName)}
                entity={t("navigation.locales")}
                onAdd={handleCreate}
                actions={
                    <>
                        <FilterButton
                            testId={AUTOMATION_ID.filterActivator(entityName)}
                            label={t("filters.title")}
                            activeCount={activeFiltersCount}
                            open={searchOpen}
                            onOpenChange={setSearchOpen}
                            placement="bottom"
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
                    </>
                }
            />

            <LocaleTable
                entityName={entityName}
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredLocales.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
            />

            <LocaleDrawer
                entityName={entityName}
                open={drawerOpen}
                locale={editingLocale}
                onClose={handleClose}
            />
        </Space>
    );
}

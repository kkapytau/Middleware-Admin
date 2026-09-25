import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Timezone,
    useDownloadTimezones,
    useTimezone,
    useTimezones,
} from "@/entities/timezone";
import { useAllTimezones } from "@/entities/timezone/hooks/useAllTimezones";
import { DownloadButton } from "@/shared/components";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { FilterButton } from "@/shared/components/FilterButton";
import { FilterSearch } from "@/shared/components/FilterSearch";
import { CODE_DISABLED_FILTER_FIELDS, EMPTY_CODE_DISABLED_FILTERS } from "@/shared/config/filters";
import { useFilter, useUrlFilters, useUrlPagination } from "@/shared/hooks";
import { AUTOMATION_ID, downloadBlob } from "@/shared/lib";

import { TimezoneDrawer, TimezonesTable } from "./components";

const entityName = "time-zones";

export function TimezonesPage() {
    const { t } = useTranslation("app");

    const downloadTimezones = useDownloadTimezones();

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

    const { data: allTimezones = [], isLoading: allTimezonesLoading } = useAllTimezones({
        enabled: shouldLoadAll,
    });

    const filteredTimezones = useFilter(allTimezones, filters, filterFields);

    const { data, isLoading, isFetching } = useTimezones(apiPage, pageSize);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTimezoneId, setSelectedTimezoneId] = useState<number | null>(null);

    const { data: timezoneDetail } = useTimezone(selectedTimezoneId);

    const tableData = hasActiveFilters ? filteredTimezones : (data?.content ?? []);

    const tableLoading = hasActiveFilters ? allTimezonesLoading : isLoading || isFetching;

    function handleCreate() {
        setSelectedTimezoneId(null);
        setDrawerOpen(true);
    }

    function handleEdit(timezone: Timezone) {
        setSelectedTimezoneId(timezone.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedTimezoneId(null);
    }

    const handleDownload = async () => {
        const blob = await downloadTimezones.mutateAsync();

        downloadBlob(blob, `${entityName}.csv`);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar
                testId={AUTOMATION_ID.add(entityName)}
                entity={t("navigation.timezones")}
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
                            loading={downloadTimezones.isPending}
                            onClick={() => {
                                void handleDownload();
                            }}
                        />
                    </>
                }
            />

            <TimezonesTable
                entityName={entityName}
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: hasActiveFilters ? filteredTimezones.length : (data?.totalElements ?? 0),
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
            />

            <TimezoneDrawer
                entityName={entityName}
                open={drawerOpen}
                timezone={timezoneDetail}
                onClose={handleClose}
            />
        </Space>
    );
}

import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Locale, useLocale, useLocales } from "@/entities/locale";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useUrlPagination } from "@/shared/hooks";

import { LocaleDrawer } from "./components/LocaleDrawer";
import { LocaleTable } from "./components/LocaleTable";

export function LocalesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingLocaleId, setEditingLocaleId] = useState<number | null>(null);

    const { t } = useTranslation("app");

    const { page, pageSize, apiPage, handlePaginationChange } = useUrlPagination();

    const { data, isLoading, isFetching } = useLocales(apiPage, pageSize);

    const { data: editingLocale } = useLocale(editingLocaleId as number);

    const tableData = data?.content ?? [];
    const tableLoading = isLoading || isFetching;

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
            <EntityToolbar entity={t("navigation.locales")} onAdd={handleCreate} />

            <LocaleTable
                data={tableData}
                loading={tableLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.totalElements ?? 0,
                    showSizeChanger: false,
                    onChange: handlePaginationChange,
                }}
                onEdit={handleEdit}
            />

            <LocaleDrawer open={drawerOpen} locale={editingLocale} onClose={handleClose} />
        </Space>
    );
}

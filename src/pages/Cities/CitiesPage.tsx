import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { type City, useCities, useDeleteCity } from "@/entities/city";
import { CityDrawer } from "@/pages/Cities/components/CityDrawer";
import { CityTable } from "@/pages/Cities/components/CityTable";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";
import { getPaginationParams } from "@/shared/lib/pagination/getPaginationParams.ts";

export function CitiesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, pageSize } = getPaginationParams(searchParams);
    const { t } = useTranslation("app");

    const apiPage = page - 1;

    const { data, isLoading } = useCities(apiPage, pageSize);
    const deleteCity = useDeleteCity();
    const { handleError } = useMutationErrorHandler();

    const [openDrawer, setOpenDrawer] = useState(false);
    const [editingCity, setEditingCity] = useState<City | undefined>();

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setSearchParams({
            page: String(nextPage),
            size: String(nextPageSize),
        });
    };

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
            <EntityToolbar entity={t("navigation.city")} onAdd={handleAdd} />

            <CityTable
                data={data?.content ?? []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.totalElements ?? 0,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                }}
                deleting={deleteCity.isPending}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CityDrawer open={openDrawer} city={editingCity} onClose={handleClose} />
        </Space>
    );
}

import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type City, useCities, useDeleteCity } from "@/entities/city";
import { CityDrawer } from "@/pages/Cities/components/CityDrawer";
import { CityTable } from "@/pages/Cities/components/CityTable";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";

export function CitiesPage() {
    const { t } = useTranslation("app");

    const { data: cities = [], isLoading } = useCities();
    const deleteCity = useDeleteCity();
    const { handleError } = useMutationErrorHandler();

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
            <EntityToolbar entity={t("navigation.city")} onAdd={handleAdd} />

            <CityTable
                cities={cities}
                loading={isLoading}
                deleting={deleteCity.isPending}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CityDrawer open={openDrawer} city={editingCity} onClose={handleClose} />
        </Space>
    );
}

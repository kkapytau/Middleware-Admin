import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Country, useCountries, useCountry, useDeleteCountry } from "@/entities/country";
import { CountriesTable } from "@/pages/Countries/components/CountriesTable";
import { CountryDrawer } from "@/pages/Countries/components/CountryDrawer";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";

export function CountriesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { t } = useTranslation("app");
    const [editingCountryId, setEditingCountryId] = useState<number | null>(null);

    const { data: countries = [], isLoading } = useCountries();

    const { data: editingCountry } = useCountry(editingCountryId);

    const deleteCountry = useDeleteCountry();
    const { handleError } = useMutationErrorHandler();

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
            <EntityToolbar entity={t("navigation.countries")} onAdd={handleCreate} />

            <CountriesTable
                data={countries}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CountryDrawer open={drawerOpen} country={editingCountry} onClose={handleClose} />
        </Space>
    );
}

import { Space } from "antd";
import { useState } from "react";

import { useCountries, useCountry, useDeleteCountry } from "@/entities/country";
import { CountriesTable } from "@/pages/Countries/components/CountriesTable";
import { CountriesToolbar } from "@/pages/Countries/components/CountriesToolbar";
import { CountryDrawer } from "@/pages/Countries/components/CountryDrawer";

export function CountriesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingCountryId, setEditingCountryId] = useState<number | null>(null);

    const { data: countries = [], isLoading } = useCountries();

    const { data: editingCountry } = useCountry(editingCountryId);

    const deleteCountry = useDeleteCountry();

    const handleCreate = () => {
        setEditingCountryId(null);
        setDrawerOpen(true);
    };

    const handleEdit = (id: number) => {
        setEditingCountryId(id);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingCountryId(null);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCountry.mutateAsync(id);
        } catch {
            console.error("Failed to delete country");
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <CountriesToolbar onCreate={handleCreate} />

            <CountriesTable
                data={countries}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={(id) => {
                    void handleDelete(id);
                }}
            />

            <CountryDrawer open={drawerOpen} country={editingCountry} onClose={handleClose} />
        </Space>
    );
}

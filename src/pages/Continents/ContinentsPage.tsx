import { Space } from "antd";
import { useState } from "react";

import { useContinent, useContinents, useDeleteContinent } from "@/entities/continent";
import { ContinentDrawer } from "@/pages/Continents/components/ContinentDrawer";
import { ContinentsTable } from "@/pages/Continents/components/ContinentsTable";
import { ContinentsToolbar } from "@/pages/Continents/components/ContinentsToolbar";

export function ContinentsPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingContinentId, setEditingContinentId] = useState<number | null>(null);

    const { data: continents = [], isLoading } = useContinents();

    const { data: editingContinent } = useContinent(editingContinentId);

    const deleteContinent = useDeleteContinent();

    const handleCreate = () => {
        setEditingContinentId(null);
        setDrawerOpen(true);
    };

    const handleEdit = (id: number) => {
        setEditingContinentId(id);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingContinentId(null);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteContinent.mutateAsync(id);
        } catch {
            console.error("Failed to delete continent");
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <ContinentsToolbar onCreate={handleCreate} />

            <ContinentsTable
                data={continents}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={(id) => {
                    void handleDelete(id);
                }}
            />

            <ContinentDrawer open={drawerOpen} continent={editingContinent} onClose={handleClose} />
        </Space>
    );
}

import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    type Continent,
    useContinent,
    useContinents,
    useDeleteContinent,
} from "@/entities/continent";
import { ContinentDrawer } from "@/pages/Continents/components/ContinentDrawer";
import { ContinentsTable } from "@/pages/Continents/components/ContinentsTable";
import { EntityToolbar } from "@/shared/components/EntityToolbar";

export function ContinentsPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { t } = useTranslation("app");
    const [editingContinentId, setEditingContinentId] = useState<number | null>(null);

    const { data: continents = [], isLoading } = useContinents();

    const { data: editingContinent } = useContinent(editingContinentId);

    const deleteContinent = useDeleteContinent();

    const handleCreate = () => {
        setEditingContinentId(null);
        setDrawerOpen(true);
    };

    const handleEdit = (continent: Continent) => {
        setEditingContinentId(continent.id);
        setDrawerOpen(true);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setEditingContinentId(null);
    };

    const handleDelete = async (continent: Continent) => {
        await deleteContinent.mutateAsync(continent.id);
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar entity={t("navigation.continent")} onAdd={handleCreate} />

            <ContinentsTable
                data={continents}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ContinentDrawer open={drawerOpen} continent={editingContinent} onClose={handleClose} />
        </Space>
    );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { type Airport, useAirport, useAirports, useDeleteAirport } from "@/entities/airport";
import { EntityToolbar } from "@/shared/components/EntityToolbar";

import styles from "./AirportsPage.module.scss";
import { AirportDrawer } from "./components/AirportDrawer";
import { AirportsTable } from "./components/AirportsTable";

export function AirportsPage() {
    const { data = [], isLoading } = useAirports();
    const { t } = useTranslation("app");

    const deleteAirport = useDeleteAirport();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAirportId, setSelectedAirportId] = useState<number | null>(null);

    const { data: airportDetail } = useAirport(selectedAirportId);

    function handleCreate() {
        setSelectedAirportId(null);
        setDrawerOpen(true);
    }

    function handleEdit(airport: Airport) {
        setSelectedAirportId(airport.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedAirportId(null);
    }

    const handleDelete = async (airport: Airport) => {
        await deleteAirport.mutateAsync(airport.id);
    };

    return (
        <div className={styles.page}>
            <EntityToolbar entity={t("navigation.airports")} onAdd={handleCreate} />

            <AirportsTable
                data={data}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AirportDrawer open={drawerOpen} airport={airportDetail} onClose={handleClose} />
        </div>
    );
}

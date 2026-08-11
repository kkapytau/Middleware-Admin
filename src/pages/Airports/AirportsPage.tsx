import { useState } from "react";

import { type Airport, useAirports, useDeleteAirport } from "@/entities/airport";
import { AirportsToolbar } from "@/pages/Airports/components";

import styles from "./AirportsPage.module.scss";
import { AirportDrawer } from "./components/AirportDrawer";
import { AirportsTable } from "./components/AirportsTable";

export function AirportsPage() {
    const { data = [], isLoading } = useAirports();

    const deleteAirport = useDeleteAirport();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAirport, setSelectedAirport] = useState<Airport>();

    function handleAdd() {
        setSelectedAirport(undefined);
        setDrawerOpen(true);
    }

    function handleEdit(airport: Airport) {
        setSelectedAirport(airport);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedAirport(undefined);
    }

    function handleDelete(airport: Airport) {
        deleteAirport.mutate(airport.id);
    }

    return (
        <div className={styles.page}>
            <AirportsToolbar onAdd={handleAdd} />

            <AirportsTable
                data={data}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AirportDrawer open={drawerOpen} airport={selectedAirport} onClose={handleClose} />
        </div>
    );
}

import { useState } from "react";

import { type Airport, useAirport, useAirports, useDeleteAirport } from "@/entities/airport";
import { AirportsToolbar } from "@/pages/Airports/components";

import styles from "./AirportsPage.module.scss";
import { AirportDrawer } from "./components/AirportDrawer";
import { AirportsTable } from "./components/AirportsTable";

export function AirportsPage() {
    const { data = [], isLoading } = useAirports();

    const deleteAirport = useDeleteAirport();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAirportId, setSelectedAirportId] = useState<number | null>(null);

    const { data: airportDetail, isLoading: isAirportDetailLoading } =
        useAirport(selectedAirportId);

    function handleAdd() {
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

            <AirportDrawer
                open={drawerOpen}
                loading={isAirportDetailLoading}
                airport={airportDetail}
                onClose={handleClose}
            />
        </div>
    );
}

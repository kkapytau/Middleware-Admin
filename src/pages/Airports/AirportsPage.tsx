import { useState } from "react";

import { useAirports } from "@/entities/airport";
import { AirportsToolbar } from "@/pages/Airports/components";

import styles from "./AirportsPage.module.scss";
import { AirportDrawer } from "./components/AirportDrawer";
import { AirportsTable } from "./components/AirportsTable";

export function AirportsPage() {
    const { data = [], isLoading } = useAirports();

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className={styles.page}>
            <AirportsToolbar onAdd={() => setDrawerOpen(true)} />

            <AirportsTable data={data} loading={isLoading} />

            <AirportDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
    );
}

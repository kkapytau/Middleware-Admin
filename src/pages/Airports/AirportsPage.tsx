import { useAirports } from "@/entities/airport";

import styles from "./AirportsPage.module.scss";
import { AirportsTable, AirportsToolbar } from "./components";

export function AirportsPage() {
    const { data = [], isLoading } = useAirports();

    return (
        <div className={styles.page}>
            <AirportsToolbar />

            <AirportsTable data={data} loading={isLoading} />
        </div>
    );
}

import { type TableProps } from "antd";
import { useTranslation } from "react-i18next";

import type { Airport } from "@/entities/airport";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";

interface AirportsTableProps {
    data: Airport[];

    loading: boolean;

    onEdit: (airport: Airport) => void;

    onDelete: (airport: Airport) => Promise<void>;
}

export function AirportsTable({ data, loading, onEdit, onDelete }: AirportsTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<Airport>["columns"] = [
        {
            title: t("columns.airport"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: 180,
            render: (_, airport) => (
                <EntityActions record={airport} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];

    return (
        <EntityTable<Airport>
            rowKey="airportCode"
            columns={columns}
            dataSource={data}
            loading={loading}
        />
    );
}

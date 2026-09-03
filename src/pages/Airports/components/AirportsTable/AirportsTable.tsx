import { type TableProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Airport } from "@/entities/airport";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH, LOCATION_CODE_COLUMN_WIDTH } from "@/shared/constants";

interface AirportsTableProps {
    data: Airport[];

    loading: boolean;
    pagination?: TablePaginationConfig;

    onEdit: (airport: Airport) => void;

    onDelete: (airport: Airport) => Promise<void>;
}

export function AirportsTable({ data, loading, onEdit, onDelete, pagination }: AirportsTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<Airport>["columns"] = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
            width: LOCATION_CODE_COLUMN_WIDTH,
        },
        {
            title: t("columns.name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
            render: (_, airport) => (
                <EntityActions record={airport} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];

    return (
        <EntityTable<Airport>
            rowKey="code"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

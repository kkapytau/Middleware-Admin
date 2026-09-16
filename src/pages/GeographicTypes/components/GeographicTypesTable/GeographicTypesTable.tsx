import { Checkbox, type TableProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { GeographicType } from "@/entities/geographicType";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH } from "@/shared/constants";

interface GeographicTypesTableProps {
    data: GeographicType[];

    loading: boolean;
    pagination?: TablePaginationConfig;

    onEdit: (geographicType: GeographicType) => void;

    onDelete: (geographicType: GeographicType) => Promise<void>;
}

export function GeographicTypesTable({
    data,
    loading,
    onEdit,
    onDelete,
    pagination,
}: GeographicTypesTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<GeographicType>["columns"] = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
        },
        {
            title: t("columns.disabled"),
            dataIndex: "deleted",
            key: "deleted",
            render: (deleted: boolean) => <Checkbox checked={deleted} disabled />,
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
            render: (_, geographicType) => (
                <EntityActions record={geographicType} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];

    return (
        <EntityTable<GeographicType>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

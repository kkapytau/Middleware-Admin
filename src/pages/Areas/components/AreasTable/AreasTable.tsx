import { Checkbox } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Area } from "@/entities/area";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH, LOCATION_CODE_COLUMN_WIDTH } from "@/shared/constants";

interface AreasTableProps {
    data: Area[];
    loading: boolean;
    entityName: string;
    pagination?: TablePaginationConfig;
    onEdit: (area: Area) => void;
    onDelete: (area: Area) => Promise<void>;
}

export function AreasTable({
    data,
    loading,
    onEdit,
    onDelete,
    pagination,
    entityName,
}: AreasTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<Area> = [
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
            title: t("columns.disabled"),
            dataIndex: "disabled",
            key: "disabled",
            render: (disabled: boolean) => <Checkbox checked={disabled} disabled />,
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
            render: (_, record) => (
                <EntityActions
                    entityName={entityName}
                    record={record}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <EntityTable<Area>
            rowKey="id"
            entityName={entityName}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

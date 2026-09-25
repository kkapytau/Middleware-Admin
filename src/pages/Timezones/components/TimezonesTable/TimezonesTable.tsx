import { Checkbox, type TableProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Timezone } from "@/entities/timezone";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH, LOCATION_CODE_COLUMN_WIDTH } from "@/shared/constants";

interface TimezonesTableProps {
    data: Timezone[];
    entityName: string;
    loading: boolean;
    pagination?: TablePaginationConfig;

    onEdit: (timezone: Timezone) => void;
}

export function TimezonesTable({
    data,
    loading,
    onEdit,
    pagination,
    entityName,
}: TimezonesTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<Timezone>["columns"] = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
            width: LOCATION_CODE_COLUMN_WIDTH,
        },
        {
            title: t("columns.utcOffset"),
            dataIndex: "utcOffset",
            key: "utcOffset",
            width: 160,
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
            render: (_, timezone) => (
                <EntityActions entityName={entityName} record={timezone} onEdit={onEdit} />
            ),
        },
    ];

    return (
        <EntityTable<Timezone>
            rowKey="id"
            entityName={entityName}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

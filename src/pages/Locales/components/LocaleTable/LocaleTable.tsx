import { Checkbox } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/entities/locale";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH, LOCATION_CODE_COLUMN_WIDTH } from "@/shared/constants";

interface LocalesTableProps {
    data: Locale[];
    loading: boolean;
    pagination?: TablePaginationConfig;
    onEdit: (locale: Locale) => void;
}

export function LocaleTable({ data, loading, pagination, onEdit }: LocalesTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<Locale> = [
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
            title: t("columns.deleted"),
            dataIndex: "deleted",
            key: "deleted",
            render: (deleted: boolean) => <Checkbox checked={deleted} disabled />,
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
            render: (_, record) => <EntityActions record={record} onEdit={onEdit} />,
        },
    ];

    return (
        <EntityTable<Locale>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

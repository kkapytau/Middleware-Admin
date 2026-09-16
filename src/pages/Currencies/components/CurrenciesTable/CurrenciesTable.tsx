import { Checkbox, type TableProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Currency } from "@/entities/currency";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH } from "@/shared/constants";

interface CurrenciesTableProps {
    data: Currency[];

    loading: boolean;
    pagination?: TablePaginationConfig;

    onEdit: (currency: Currency) => void;
}

export function CurrenciesTable({ data, loading, onEdit, pagination }: CurrenciesTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<Currency>["columns"] = [
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
            render: (_, currency) => <EntityActions record={currency} onEdit={onEdit} />,
        },
    ];

    return (
        <EntityTable<Currency>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

import { Checkbox, type TableProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { MarketGroup } from "@/entities/marketGroup";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH } from "@/shared/constants";

interface MarketGroupsTableProps {
    data: MarketGroup[];
    entityName: string;
    loading: boolean;
    pagination?: TablePaginationConfig;

    onEdit: (marketGroup: MarketGroup) => void;
    onDelete: (marketGroup: MarketGroup) => Promise<void>;
}

export function MarketGroupsTable({
    data,
    loading,
    onEdit,
    onDelete,
    pagination,
    entityName,
}: MarketGroupsTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<MarketGroup>["columns"] = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
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
            render: (_, marketGroup) => (
                <EntityActions
                    entityName={entityName}
                    record={marketGroup}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <EntityTable<MarketGroup>
            rowKey="id"
            entityName={entityName}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

import { Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Country } from "@/entities/country";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH, LOCATION_CODE_COLUMN_WIDTH } from "@/shared/constants";

interface CountriesTableProps {
    data: Country[];
    loading: boolean;
    entityName: string;
    pagination?: TablePaginationConfig;
    onEdit: (country: Country) => void;
    onDelete: (country: Country) => Promise<void>;
}

export function CountriesTable({
    data,
    loading,
    pagination,
    onEdit,
    onDelete,
    entityName,
}: CountriesTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<Country> = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
            width: LOCATION_CODE_COLUMN_WIDTH,
        },
        {
            title: t("columns.codeNumeric"),
            dataIndex: "codeNumeric",
            key: "codeNumeric",
            width: 120,
        },
        {
            title: t("columns.name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("columns.isCountry"),
            dataIndex: "isCountry",
            key: "isCountry",
            width: 120,
            render: (value: boolean) =>
                value ? <Tag>{t("common.yes")}</Tag> : <Tag>{t("common.no")}</Tag>,
        },
        {
            title: t("columns.isMarket"),
            dataIndex: "isMarket",
            key: "isMarket",
            width: 120,
            render: (value: boolean) =>
                value ? <Tag>{t("common.yes")}</Tag> : <Tag>{t("common.no")}</Tag>,
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
        <EntityTable<Country>
            rowKey="id"
            entityName={entityName}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Country } from "@/entities/country";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";

interface CountriesTableProps {
    data: Country[];
    loading: boolean;
    onEdit: (country: Country) => void;
    onDelete: (country: Country) => Promise<void>;
}

export function CountriesTable({ data, loading, onEdit, onDelete }: CountriesTableProps) {
    const { t } = useTranslation("app");
    const columns: ColumnsType<Country> = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
        },
        {
            title: t("columns.name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: 180,
            render: (_, record) => (
                <EntityActions record={record} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];

    return (
        <EntityTable<Country> rowKey="id" columns={columns} dataSource={data} loading={loading} />
    );
}

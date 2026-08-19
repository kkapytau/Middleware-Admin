import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { Continent } from "@/entities/continent";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";

interface ContinentsTableProps {
    data: Continent[];
    loading: boolean;
    onEdit: (continent: Continent) => void;
    onDelete: (continent: Continent) => Promise<void>;
}

export function ContinentsTable({ data, loading, onEdit, onDelete }: ContinentsTableProps) {
    const { t } = useTranslation("app");
    const columns: ColumnsType<Continent> = [
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
        <EntityTable<Continent> rowKey="id" columns={columns} dataSource={data} loading={loading} />
    );
}

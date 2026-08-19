import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { City } from "@/entities/city";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";

interface CityTableProps {
    cities: City[];
    loading: boolean;
    deleting: boolean;
    onEdit: (city: City) => void;
    onDelete: (city: City) => Promise<void>;
}

export function CityTable({ cities, loading, deleting, onEdit, onDelete }: CityTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<City> = [
        {
            title: t("columns.code"),
            dataIndex: "code",
            key: "code",
        },
        {
            title: t("columns.city"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("actions.actions"),
            key: "actions",
            width: 180,
            render: (_, city) => (
                <EntityActions
                    record={city}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleting={deleting}
                />
            ),
        },
    ];

    return (
        <EntityTable<City> rowKey="id" columns={columns} dataSource={cities} loading={loading} />
    );
}

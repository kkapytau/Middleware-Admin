import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useTranslation } from "react-i18next";

import type { City } from "@/entities/city";
import { EntityActions } from "@/shared/components/EntityActions";
import { EntityTable } from "@/shared/components/EntityTable";
import { LOCATION_ACTIONS_COLUMN_WIDTH, LOCATION_CODE_COLUMN_WIDTH } from "@/shared/constants";

interface CityTableProps {
    data: City[];
    loading: boolean;
    pagination?: TablePaginationConfig;
    deleting: boolean;
    onEdit: (city: City) => void;
    onDelete: (city: City) => Promise<void>;
}

export function CityTable({
    data,
    loading,
    deleting,
    onEdit,
    onDelete,
    pagination,
}: CityTableProps) {
    const { t } = useTranslation("app");

    const columns: ColumnsType<City> = [
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
            title: t("actions.actions"),
            key: "actions",
            width: LOCATION_ACTIONS_COLUMN_WIDTH,
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
        <EntityTable<City>
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}

import { Button, Popconfirm, Space, Table, type TableProps } from "antd";
import { useTranslation } from "react-i18next";

import type { Airport } from "@/entities/airport";

import { MetropolitanTag } from "../MetropolitanTag";
import styles from "./AirportsTable.module.scss";

interface AirportsTableProps {
    data: Airport[];

    loading: boolean;

    onEdit: (airport: Airport) => void;

    onDelete: (airport: Airport) => void;
}

export function AirportsTable({ data, loading, onEdit, onDelete }: AirportsTableProps) {
    const { t } = useTranslation("app");

    const columns: TableProps<Airport>["columns"] = [
        {
            title: t("columns.airport"),
            dataIndex: "airportName",
            key: "airportName",
            width: 260,
        },
        {
            title: t("columns.code"),
            dataIndex: "airportCode",
            key: "airportCode",
            width: 100,
        },
        {
            title: t("columns.city"),
            key: "city",
            render: (_, airport) => airport.city.cityName,
        },
        {
            title: t("columns.country"),
            key: "country",
            render: (_, airport) => airport.city.country.countryName,
        },
        {
            title: t("columns.continent"),
            key: "continent",
            render: (_, airport) => airport.city.country.continent.continentName,
        },
        {
            title: t("columns.metropolitan"),
            key: "metropolitan",
            width: 170,
            render: (_, airport) => <MetropolitanTag metropolitan={airport.isMetropolitan} />,
        },
        {
            title: t("actions.edit"),
            key: "actions",
            render: (_, airport) => (
                <Space>
                    <Button type="default" onClick={() => onEdit(airport)}>
                        {t("actions.edit")}
                    </Button>

                    <Popconfirm
                        title={t("actions.delete")}
                        description={t("actions.deleteConfirmation")}
                        onConfirm={() => onDelete(airport)}
                        okText={t("actions.delete")}
                        cancelText={t("actions.cancel")}
                    >
                        <Button danger>{t("actions.delete")}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <Table<Airport>
                className={styles.table}
                rowKey="airportCode"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                }}
            />
        </div>
    );
}

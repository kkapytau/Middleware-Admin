import { Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { type Airport, useAirport, useAirports, useDeleteAirport } from "@/entities/airport";
import { EntityToolbar } from "@/shared/components/EntityToolbar";
import { useMutationErrorHandler } from "@/shared/hooks";
import { getPaginationParams } from "@/shared/lib/pagination/getPaginationParams.ts";

import { AirportDrawer } from "./components/AirportDrawer";
import { AirportsTable } from "./components/AirportsTable";

export function AirportsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, pageSize } = getPaginationParams(searchParams);

    const { t } = useTranslation("app");

    const apiPage = page - 1;
    const { data, isLoading } = useAirports(apiPage, pageSize);

    const deleteAirport = useDeleteAirport();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedAirportId, setSelectedAirportId] = useState<number | null>(null);

    const { data: airportDetail } = useAirport(selectedAirportId);
    const { handleError } = useMutationErrorHandler();

    const handlePageChange = (nextPage: number, nextPageSize: number) => {
        setSearchParams({
            page: String(nextPage),
            size: String(nextPageSize),
        });
    };

    function handleCreate() {
        setSelectedAirportId(null);
        setDrawerOpen(true);
    }

    function handleEdit(airport: Airport) {
        setSelectedAirportId(airport.id);
        setDrawerOpen(true);
    }

    function handleClose() {
        setDrawerOpen(false);
        setSelectedAirportId(null);
    }

    const handleDelete = async (airport: Airport) => {
        try {
            await deleteAirport.mutateAsync(airport.id);
        } catch (error) {
            if (handleError(error, t("errors.deleteConflict"))) {
                return;
            }

            throw error;
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <EntityToolbar entity={t("navigation.airports")} onAdd={handleCreate} />

            <AirportsTable
                data={data?.content ?? []}
                loading={isLoading}
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.totalElements ?? 0,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AirportDrawer open={drawerOpen} airport={airportDetail} onClose={handleClose} />
        </Space>
    );
}

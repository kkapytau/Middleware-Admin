import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { Airport, AirportDetail } from "../model";

interface AirportListResponse {
    content: Array<{
        id: number;
        code: string;
        name: string;
    }>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface AirportDetailResponse {
    id: number;
    code: string;
    name: string;
    translations: Record<string, string>;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    city: {
        id: number;
        code: string;
        name: string;
        translations: Record<string, string>;
    };
}

const AIRPORTS_ENDPOINT = "internal/api/v1/airports";

function mapAirportDetail(response: AirportDetailResponse): AirportDetail {
    return {
        id: response.id,
        code: response.code,
        name: response.name,
        cityId: response.city.id,
        latitude: response.coordinates.latitude,
        longitude: response.coordinates.longitude,
        translations: response.translations,
    };
}

export async function getAirports(page: number, size: number): Promise<PageResponse<Airport>> {
    return await api
        .get(AIRPORTS_ENDPOINT, {
            searchParams: {
                page,
                size,
            },
        })
        .json<AirportListResponse>();
}

export async function getAllAirports(locale: string): Promise<Airport[]> {
    return getAllPages(getAirports, (a, b) =>
        a.name.localeCompare(b.name, locale, {
            sensitivity: "base",
        }),
    );
}

export async function getAirport(id: number): Promise<AirportDetail> {
    const response = await api.get(`${AIRPORTS_ENDPOINT}/${id}`).json<AirportDetailResponse>();

    return mapAirportDetail(response);
}

export async function createAirport(values: AirportRequestValues): Promise<AirportDetail> {
    if (values.cityId === null) {
        throw new Error("City is required");
    }

    const response = await api
        .post(AIRPORTS_ENDPOINT, {
            json: values,
        })
        .json<AirportDetailResponse>();

    return mapAirportDetail(response);
}

export interface AirportRequestValues {
    code: string;
    name: string;
    cityId: number;
    latitude: number;
    longitude: number;
    translations: Record<string, string>;
}

export interface UpdateAirportParams {
    id: number;
    values: AirportRequestValues;
}

export async function updateAirport({ id, values }: UpdateAirportParams): Promise<AirportDetail> {
    if (values.cityId === null) {
        throw new Error("City is required");
    }

    const response = await api
        .put(`${AIRPORTS_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<AirportDetailResponse>();

    return mapAirportDetail(response);
}

export async function deleteAirport(id: number): Promise<void> {
    await api.delete(AIRPORTS_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

import { api } from "@/shared/api";

import type { Airport, AirportDetail, AirportFormValues } from "../model";

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
    metropolitan: boolean;
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
        metropolitan: response.metropolitan,
    };
}

export async function getAirports(): Promise<Airport[]> {
    const response = await api
        .get(AIRPORTS_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 50,
            },
        })
        .json<AirportListResponse>();

    return response.content;
}

export async function getAirport(id: number): Promise<AirportDetail> {
    const response = await api.get(`${AIRPORTS_ENDPOINT}/${id}`).json<AirportDetailResponse>();

    return mapAirportDetail(response);
}

export async function createAirport(values: AirportFormValues): Promise<AirportDetail> {
    if (values.cityId === null) {
        throw new Error("City is required");
    }

    const response = await api
        .post(AIRPORTS_ENDPOINT, {
            json: {
                code: values.code,
                name: values.name,
                cityId: values.cityId,
                latitude: values.latitude,
                longitude: values.longitude,
                metropolitan: values.metropolitan,
            },
        })
        .json<AirportDetailResponse>();

    return mapAirportDetail(response);
}

export interface UpdateAirportParams {
    id: number;
    values: AirportFormValues;
}

export async function updateAirport({ id, values }: UpdateAirportParams): Promise<AirportDetail> {
    if (values.cityId === null) {
        throw new Error("City is required");
    }

    const response = await api
        .put(`${AIRPORTS_ENDPOINT}/${id}`, {
            json: {
                code: values.code,
                name: values.name,
                cityId: values.cityId,
                latitude: values.latitude,
                longitude: values.longitude,
                metropolitan: values.metropolitan,
            },
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

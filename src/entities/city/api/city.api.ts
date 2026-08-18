import { api } from "@/shared/api";

import type { City } from "../model";

interface CityListResponse {
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

interface CityDetailResponse {
    id: number;
    code: string;
    name: string;
    translations: Record<string, string>;
    country: {
        id: number;
        code: string;
        name: string;
    };
}

const CITIES_ENDPOINT = "internal/api/v1/cities";

function mapCityDetail(response: CityDetailResponse): City {
    return {
        id: response.id,
        code: response.code,
        name: response.name,
    };
}

export async function getCities(): Promise<City[]> {
    const response = await api
        .get(CITIES_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 100,
            },
        })
        .json<CityListResponse>();

    return response.content;
}

export async function getCity(id: number): Promise<City> {
    const response = await api.get(`${CITIES_ENDPOINT}/${id}`).json<CityDetailResponse>();

    return mapCityDetail(response);
}

export async function deleteCity(id: number): Promise<void> {
    await api.delete(CITIES_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

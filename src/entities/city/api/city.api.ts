import { api } from "@/shared/api";

import type { City, CityDetail, CityFormValues } from "../model";

interface CityListResponse {
    content: City[];
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
        translations: Record<string, string>;
    };
}

const CITIES_ENDPOINT = "internal/api/v1/cities";

export async function getCities(): Promise<City[]> {
    const response = await api
        .get(CITIES_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 50,
            },
        })
        .json<CityListResponse>();

    return response.content;
}

export async function getCity(id: number): Promise<CityDetail> {
    return api.get(`${CITIES_ENDPOINT}/${id}`).json<CityDetailResponse>();
}

export async function createCity(values: CityFormValues): Promise<CityDetail> {
    return api
        .post(CITIES_ENDPOINT, {
            json: values,
        })
        .json<CityDetailResponse>();
}

export interface UpdateCityParams {
    id: number;
    values: CityFormValues;
}

export async function updateCity({ id, values }: UpdateCityParams): Promise<CityDetail> {
    return api
        .put(`${CITIES_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<CityDetailResponse>();
}

export async function deleteCity(id: number): Promise<void> {
    await api.delete(CITIES_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

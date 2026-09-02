import { api } from "@/shared/api";

import type { Continent, ContinentDetail } from "../model";

interface ContinentListResponse {
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

interface ContinentDetailResponse {
    id: number;
    code: string;
    name: string;
    translations: Record<string, string>;
}

const CONTINENTS_ENDPOINT = "internal/api/v1/continents";

export async function getContinents(): Promise<Continent[]> {
    const response = await api
        .get(CONTINENTS_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 50,
            },
        })
        .json<ContinentListResponse>();

    return response.content;
}

export async function getContinent(id: number): Promise<ContinentDetail> {
    return await api.get(`${CONTINENTS_ENDPOINT}/${id}`).json<ContinentDetailResponse>();
}

export async function createContinent(values: ContinentRequestValues): Promise<ContinentDetail> {
    return await api
        .post(CONTINENTS_ENDPOINT, {
            json: values,
        })
        .json<ContinentDetailResponse>();
}

export interface ContinentRequestValues {
    code: string;
    name: string;
    translations: Record<string, string>;
}

export interface UpdateContinentParams {
    id: number;
    values: ContinentRequestValues;
}

export async function updateContinent({
    id,
    values,
}: UpdateContinentParams): Promise<ContinentDetail> {
    return await api
        .put(`${CONTINENTS_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<ContinentDetailResponse>();
}

export async function deleteContinent(id: number): Promise<void> {
    await api.delete(CONTINENTS_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

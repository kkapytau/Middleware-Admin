import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { Area, AreaDetail } from "../model";

interface AreaListResponse {
    content: Array<{
        id: number;
        code: string;
        name: string;
        deleted: boolean;
    }>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface AreaDetailResponse {
    id: number;
    code: string;
    name: string;
    deleted: boolean;
    translations: Record<string, string>;
    geographicType: {
        id: number;
        code: string;
        deleted: boolean;
    };
    parent: {
        id: number;
        code: string;
        name: string;
        deleted: boolean;
    } | null;
}

const AREAS_ENDPOINT = "internal/api/v1/areas";

export async function getAreas(
    page: number,
    size: number,
    deleted?: boolean,
): Promise<PageResponse<Area>> {
    return await api
        .get(AREAS_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(deleted !== undefined && { deleted }),
            },
        })
        .json<AreaListResponse>();
}

export async function getAllAreas(locale: string): Promise<Area[]> {
    return getAllPages(getAreas, (a, b) =>
        a.name.localeCompare(b.name, locale, {
            sensitivity: "base",
        }),
    );
}

export async function getArea(id: number): Promise<AreaDetail> {
    return await api.get(`${AREAS_ENDPOINT}/${id}`).json<AreaDetailResponse>();
}

export async function createArea(values: AreaRequestValues): Promise<AreaDetail> {
    return await api
        .post(AREAS_ENDPOINT, {
            json: values,
        })
        .json<AreaDetailResponse>();
}

export interface AreaRequestValues {
    code: string;
    name: string;
    geographicTypeId: number;
    parentId?: number;
    translations: Record<string, string>;
    deleted?: boolean;
}

export interface UpdateAreaParams {
    id: number;
    values: AreaRequestValues;
}

export async function updateArea({ id, values }: UpdateAreaParams): Promise<AreaDetail> {
    return await api
        .put(`${AREAS_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<AreaDetailResponse>();
}

export async function deleteArea(id: number): Promise<void> {
    await api.delete(AREAS_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

const AREAS_EXPORT_ENDPOINT = "/internal/api/v1/areas/export";

export async function downloadAreas(): Promise<Blob> {
    return api.get(AREAS_EXPORT_ENDPOINT).blob();
}

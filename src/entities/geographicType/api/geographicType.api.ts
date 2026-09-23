import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { GeographicType } from "../model";

interface GeographicTypeListResponse {
    content: Array<{
        id: number;
        code: string;
        disabled: boolean;
    }>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface GeographicTypeResponse {
    id: number;
    code: string;
    disabled: boolean;
}

const GEOGRAPHIC_TYPES_ENDPOINT = "internal/api/v1/geographic-types";

export async function getGeographicTypes(
    page: number,
    size: number,
    disabled?: boolean,
): Promise<PageResponse<GeographicType>> {
    return await api
        .get(GEOGRAPHIC_TYPES_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(disabled !== undefined && { disabled }),
            },
        })
        .json<GeographicTypeListResponse>();
}

export async function getGeographicType(id: number): Promise<GeographicType> {
    return await api.get(`${GEOGRAPHIC_TYPES_ENDPOINT}/${id}`).json<GeographicTypeResponse>();
}

export async function getAllGeographicTypes(
    locale: string,
    disabled?: boolean,
): Promise<GeographicType[]> {
    return getAllPages(
        (page, size) => getGeographicTypes(page, size, disabled),
        (a, b) =>
            a.code.localeCompare(b.code, locale, {
                sensitivity: "base",
            }),
    );
}

export interface GeographicTypeRequestValues {
    code: string;
    disabled: boolean;
}

export async function createGeographicType(
    values: GeographicTypeRequestValues,
): Promise<GeographicType> {
    return await api
        .post(GEOGRAPHIC_TYPES_ENDPOINT, {
            json: values,
        })
        .json<GeographicTypeResponse>();
}

export interface UpdateGeographicTypeParams {
    id: number;
    values: GeographicTypeRequestValues;
}

export async function updateGeographicType({
    id,
    values,
}: UpdateGeographicTypeParams): Promise<GeographicType> {
    return await api
        .put(`${GEOGRAPHIC_TYPES_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<GeographicTypeResponse>();
}

export async function deleteGeographicType(id: number): Promise<void> {
    await api.delete(GEOGRAPHIC_TYPES_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

const GEOGRAPHIC_TYPES_EXPORT_ENDPOINT = "internal/api/v1/geographic-types/export";

export async function downloadGeographicTypes(): Promise<Blob> {
    return api.get(GEOGRAPHIC_TYPES_EXPORT_ENDPOINT).blob();
}

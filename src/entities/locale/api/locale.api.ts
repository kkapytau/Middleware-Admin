import { api, type PageResponse } from "@/shared/api";

import type { Locale } from "../model";

interface LocaleListResponse {
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

interface LocaleDetailResponse {
    id: number;
    code: string;
    name: string;
    deleted: boolean;
}

const LOCALES_ENDPOINT = "internal/api/v1/locales";

function mapLocale(response: LocaleDetailResponse): Locale {
    return {
        id: response.id,
        code: response.code,
        name: response.name,
        deleted: response.deleted,
    };
}

export async function getLocales(
    page: number,
    size: number,
    deleted?: boolean,
): Promise<PageResponse<Locale>> {
    return api
        .get(LOCALES_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(deleted !== undefined && { deleted }),
            },
        })
        .json<LocaleListResponse>();
}

export async function getLocale(id: number): Promise<Locale> {
    const response = await api.get(`${LOCALES_ENDPOINT}/${id}`).json<LocaleDetailResponse>();

    return mapLocale(response);
}

export interface LocaleRequestValues {
    code: string;
    name: string;
    deleted: boolean;
}

export async function createLocale(values: LocaleRequestValues): Promise<Locale> {
    const response = await api
        .post(LOCALES_ENDPOINT, {
            json: {
                code: values.code,
                name: values.name,
            },
        })
        .json<LocaleDetailResponse>();

    return mapLocale(response);
}

export interface UpdateLocaleParams {
    id: number;
    values: LocaleRequestValues;
}

export async function updateLocale({ id, values }: UpdateLocaleParams): Promise<Locale> {
    const response = await api
        .put(`${LOCALES_ENDPOINT}/${id}`, {
            json: {
                name: values.name,
                deleted: values.deleted,
            },
        })
        .json<LocaleDetailResponse>();

    return mapLocale(response);
}

import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { Timezone, TimezoneDetail } from "../model";

interface TimezoneListResponse {
    content: Timezone[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface TimezoneResponse {
    id: number;
    code: string;
    utcOffset: string;
    disabled: boolean;
}

const TIMEZONES_ENDPOINT = "internal/api/v1/timezones";

const TIMEZONES_EXPORT_ENDPOINT = "internal/api/v1/timezones/export";

export async function getTimezones(
    page: number,
    size: number,
    disabled?: boolean,
): Promise<PageResponse<Timezone>> {
    return await api
        .get(TIMEZONES_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(disabled !== undefined ? { disabled } : {}),
            },
        })
        .json<TimezoneListResponse>();
}

export async function getAllTimezones(locale: string, disabled?: boolean): Promise<Timezone[]> {
    return getAllPages(
        (page, size) => getTimezones(page, size, disabled),
        (a, b) =>
            a.code.localeCompare(b.code, locale, {
                sensitivity: "base",
            }),
    );
}

export async function getTimezone(id: number): Promise<TimezoneDetail> {
    return await api.get(`${TIMEZONES_ENDPOINT}/${id}`).json<TimezoneResponse>();
}

export interface TimezoneRequestValues {
    code: string;
    utcOffset: string;
    disabled: boolean;
}

export async function createTimezone(values: TimezoneRequestValues): Promise<TimezoneDetail> {
    return await api
        .post(TIMEZONES_ENDPOINT, {
            json: values,
        })
        .json<TimezoneResponse>();
}

export interface UpdateTimezoneParams {
    id: number;
    values: TimezoneRequestValues;
}

export async function updateTimezone({
    id,
    values,
}: UpdateTimezoneParams): Promise<TimezoneDetail> {
    return await api
        .put(`${TIMEZONES_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<TimezoneResponse>();
}

export async function downloadTimezones(): Promise<Blob> {
    return await api.get(TIMEZONES_EXPORT_ENDPOINT).blob();
}

import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { Currency } from "../model";

interface CurrencyListResponse {
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

interface CurrencyResponse {
    id: number;
    code: string;
    disabled: boolean;
}

const CURRENCIES_ENDPOINT = "internal/api/v1/currencies";

export async function getCurrencies(
    page: number,
    size: number,
    disabled?: boolean,
): Promise<PageResponse<Currency>> {
    return await api
        .get(CURRENCIES_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(disabled !== undefined && { disabled }),
            },
        })
        .json<CurrencyListResponse>();
}

export async function getCurrency(id: number): Promise<Currency> {
    return await api.get(`${CURRENCIES_ENDPOINT}/${id}`).json<CurrencyResponse>();
}

export async function getAllCurrencies(locale: string, disabled?: boolean): Promise<Currency[]> {
    return getAllPages(
        (page, size) => getCurrencies(page, size, disabled),
        (a, b) =>
            a.code.localeCompare(b.code, locale, {
                sensitivity: "base",
            }),
    );
}

export interface CurrencyRequestValues {
    code: string;
    disabled: boolean;
}

export async function createCurrency(values: CurrencyRequestValues): Promise<Currency> {
    return await api
        .post(CURRENCIES_ENDPOINT, {
            json: values,
        })
        .json<CurrencyResponse>();
}

export interface UpdateCurrencyParams {
    id: number;
    values: {
        disabled: boolean;
    };
}

export async function updateCurrency({ id, values }: UpdateCurrencyParams): Promise<Currency> {
    return await api
        .put(`${CURRENCIES_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<CurrencyResponse>();
}

const CURRENCIES_EXPORT_ENDPOINT = "internal/api/v1/currencies/export";

export async function downloadCurrencies(): Promise<Blob> {
    return api.get(CURRENCIES_EXPORT_ENDPOINT).blob();
}

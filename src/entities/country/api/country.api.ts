import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { Country, CountryDetail } from "../model";

interface CountryListResponse {
    content: Array<{
        id: number;
        code: string;
        codeNumeric: string;
        name: string;
        isCountry: boolean;
        isMarket: boolean;
    }>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface CountryDetailResponse {
    id: number;
    code: string;
    codeNumeric: string;
    name: string;
    isCountry: boolean;
    isMarket: boolean;
    translations: Record<string, string>;
    currency: {
        id: number;
        code: string;
        name: string;
        disabled: boolean;
    };
    marketGroup: {
        id: number;
        code: string;
        disabled: boolean;
        translations: Record<string, string>;
    };
}

const COUNTRIES_ENDPOINT = "internal/api/v1/countries";

function mapCountryDetail(response: CountryDetailResponse): CountryDetail {
    return {
        id: response.id,
        code: response.code,
        codeNumeric: response.codeNumeric,
        name: response.name,
        isCountry: response.isCountry,
        isMarket: response.isMarket,
        translations: response.translations,
        currency: response.currency,
        marketGroup: response.marketGroup,
    };
}

export async function getCountries(
    page: number,
    size: number,
    isCountry?: boolean,
    isMarket?: boolean,
): Promise<PageResponse<Country>> {
    return api
        .get(COUNTRIES_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(isCountry !== undefined && { isCountry }),
                ...(isMarket !== undefined && { isMarket }),
            },
        })
        .json<CountryListResponse>();
}

export async function getAllCountries(
    locale: string,
    isCountry?: boolean,
    isMarket?: boolean,
): Promise<Country[]> {
    return getAllPages(
        (page, size) => getCountries(page, size, isCountry, isMarket),
        (a, b) =>
            a.name.localeCompare(b.name, locale, {
                sensitivity: "base",
            }),
    );
}

export async function getCountry(id: number): Promise<CountryDetail> {
    const response = await api.get(`${COUNTRIES_ENDPOINT}/${id}`).json<CountryDetailResponse>();

    return mapCountryDetail(response);
}

export interface CountryRequestValues {
    code: string;
    codeNumeric: string;
    name: string;
    currencyId: number;
    marketGroupId: number;
    isCountry: boolean;
    isMarket: boolean;
    translations: Record<string, string>;
}

export async function createCountry(values: CountryRequestValues): Promise<CountryDetail> {
    const response = await api
        .post(COUNTRIES_ENDPOINT, {
            json: {
                code: values.code,
                codeNumeric: values.codeNumeric,
                name: values.name,
                currencyId: values.currencyId,
                marketGroupId: values.marketGroupId,
                isCountry: values.isCountry,
                isMarket: values.isMarket,
                translations: values.translations,
            },
        })
        .json<CountryDetailResponse>();

    return mapCountryDetail(response);
}

export interface UpdateCountryParams {
    id: number;
    values: CountryRequestValues;
}

export async function updateCountry({ id, values }: UpdateCountryParams): Promise<CountryDetail> {
    const response = await api
        .put(`${COUNTRIES_ENDPOINT}/${id}`, {
            json: {
                code: values.code,
                codeNumeric: values.codeNumeric,
                name: values.name,
                currencyId: values.currencyId,
                marketGroupId: values.marketGroupId,
                isCountry: values.isCountry,
                isMarket: values.isMarket,
                translations: values.translations,
            },
        })
        .json<CountryDetailResponse>();

    return mapCountryDetail(response);
}

export async function deleteCountry(id: number): Promise<void> {
    await api.delete(COUNTRIES_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

const COUNTRIES_EXPORT_ENDPOINT = "/internal/api/v1/countries/export";

export async function downloadCountries(): Promise<Blob> {
    return api.get(COUNTRIES_EXPORT_ENDPOINT).blob();
}

import { api } from "@/shared/api";

import type { Country, CountryDetail, CountryFormValues } from "../model";

interface CountryListResponse {
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

interface CountryDetailResponse {
    id: number;
    code: string;
    name: string;
    translations: Record<string, string>;
    continent: {
        id: number;
        code: string;
        name: string;
        translations: Record<string, string>;
    };
}

const COUNTRIES_ENDPOINT = "internal/api/v1/countries";

function mapCountryDetail(response: CountryDetailResponse): CountryDetail {
    return {
        id: response.id,
        code: response.code,
        name: response.name,
        translations: response.translations,
        continent: response.continent,
    };
}

export async function getCountries(): Promise<Country[]> {
    const response = await api
        .get(COUNTRIES_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 50,
            },
        })
        .json<CountryListResponse>();

    return response.content;
}

export async function getCountry(id: number): Promise<CountryDetail> {
    const response = await api.get(`${COUNTRIES_ENDPOINT}/${id}`).json<CountryDetailResponse>();

    return mapCountryDetail(response);
}

export async function createCountry(values: CountryFormValues): Promise<CountryDetail> {
    const response = await api
        .post(COUNTRIES_ENDPOINT, {
            json: {
                code: values.code,
                name: values.name,
                continentId: values.continentId,
                translations: values.translations,
            },
        })
        .json<CountryDetailResponse>();

    return mapCountryDetail(response);
}

export interface UpdateCountryParams {
    id: number;
    values: CountryFormValues;
}

export async function updateCountry({ id, values }: UpdateCountryParams): Promise<CountryDetail> {
    const response = await api
        .put(`${COUNTRIES_ENDPOINT}/${id}`, {
            json: {
                code: values.code,
                name: values.name,
                continentId: values.continentId,
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

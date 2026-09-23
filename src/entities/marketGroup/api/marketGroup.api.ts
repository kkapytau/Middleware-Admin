import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { MarketGroup, MarketGroupDetail } from "../model";

interface MarketGroupListResponse {
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

interface MarketGroupResponse {
    id: number;
    code: string;
    disabled: boolean;
    translations: Record<string, string>;
}

const MARKET_GROUPS_ENDPOINT = "internal/api/v1/market-groups";

export async function getMarketGroups(
    page: number,
    size: number,
    disabled?: boolean,
): Promise<PageResponse<MarketGroup>> {
    return await api
        .get(MARKET_GROUPS_ENDPOINT, {
            searchParams: {
                page,
                size,
                ...(disabled !== undefined && { disabled }),
            },
        })
        .json<MarketGroupListResponse>();
}

export async function getMarketGroup(id: number): Promise<MarketGroupDetail> {
    return await api.get(`${MARKET_GROUPS_ENDPOINT}/${id}`).json<MarketGroupDetail>();
}

export async function getAllMarketGroups(
    locale: string,
    disabled?: boolean,
): Promise<MarketGroup[]> {
    return getAllPages(
        (page, size) => getMarketGroups(page, size, disabled),
        (a, b) =>
            a.code.localeCompare(b.code, locale, {
                sensitivity: "base",
            }),
    );
}

export interface MarketGroupRequestValues {
    code: string;
    disabled: boolean;
    translations: Record<string, string>;
}

export async function createMarketGroup(values: MarketGroupRequestValues): Promise<MarketGroup> {
    return await api
        .post(MARKET_GROUPS_ENDPOINT, {
            json: values,
        })
        .json<MarketGroupResponse>();
}

export interface UpdateMarketGroupParams {
    id: number;
    values: MarketGroupRequestValues;
}

export async function updateMarketGroup({
    id,
    values,
}: UpdateMarketGroupParams): Promise<MarketGroup> {
    return await api
        .put(`${MARKET_GROUPS_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<MarketGroupResponse>();
}

export async function deleteMarketGroup(id: number): Promise<void> {
    await api.delete(MARKET_GROUPS_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

const MARKET_GROUPS_EXPORT_ENDPOINT = "internal/api/v1/market-groups/export";

export async function downloadMarketGroups(): Promise<Blob> {
    return api.get(MARKET_GROUPS_EXPORT_ENDPOINT).blob();
}

import { api } from "@/shared/api";

import type { FlowFunction, FlowFunctionDetail, FlowFunctionFormValues } from "../model";

interface FunctionListResponse {
    content: Array<{
        id: number;
        name: string;
    }>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface FunctionDetailResponse {
    id: number;
    name: string;
    map: Record<string, string>;
}

const FUNCTIONS_ENDPOINT = "internal/api/v1/functions";

function mapFunctionDetail(response: FunctionDetailResponse): FlowFunctionDetail {
    return {
        id: response.id,
        name: response.name,
        values: Object.entries(response.map).map(([key, value]) => ({
            key,
            value,
        })),
    };
}

export async function getFlowFunctions(): Promise<FlowFunction[]> {
    const response = await api
        .get(FUNCTIONS_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 50,
            },
        })
        .json<FunctionListResponse>();

    return response.content;
}

export async function getFlowFunction(id: number): Promise<FlowFunctionDetail> {
    const response = await api.get(`${FUNCTIONS_ENDPOINT}/${id}`).json<FunctionDetailResponse>();

    return mapFunctionDetail(response);
}

export async function createFlowFunction(
    values: FlowFunctionFormValues,
): Promise<FlowFunctionDetail> {
    const response = await api
        .post(FUNCTIONS_ENDPOINT, {
            json: {
                name: values.name,
                map: Object.fromEntries(values.values.map(({ key, value }) => [key, value])),
            },
        })
        .json<FunctionDetailResponse>();

    return mapFunctionDetail(response);
}

export interface UpdateFlowFunctionParams {
    id: number;
    values: FlowFunctionFormValues;
}

export async function updateFlowFunction({
    id,
    values,
}: UpdateFlowFunctionParams): Promise<FlowFunctionDetail> {
    const response = await api
        .put(`${FUNCTIONS_ENDPOINT}/${id}`, {
            json: {
                name: values.name,
                map: Object.fromEntries(values.values.map(({ key, value }) => [key, value])),
            },
        })
        .json<FunctionDetailResponse>();

    return mapFunctionDetail(response);
}

export async function deleteFlowFunction(id: number): Promise<void> {
    await api.delete(FUNCTIONS_ENDPOINT, {
        searchParams: {
            ids: String(id),
        },
    });
}

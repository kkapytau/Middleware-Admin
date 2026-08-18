import { api } from "@/shared/api";

import type { Flow, FlowFormValues } from "../model";

interface FlowListResponse {
    content: Flow[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface FlowDetailResponse {
    id: number;
    code: string;
    name: string;
}

const FLOWS_ENDPOINT = "internal/api/v1/flows";

export async function getFlows(): Promise<Flow[]> {
    const response = await api
        .get(FLOWS_ENDPOINT, {
            searchParams: {
                page: 0,
                size: 50,
            },
        })
        .json<FlowListResponse>();

    return response.content;
}

export async function createFlow(values: FlowFormValues): Promise<Flow> {
    return api
        .post(FLOWS_ENDPOINT, {
            json: values,
        })
        .json<FlowDetailResponse>();
}

export interface UpdateFlowParams {
    id: number;
    values: FlowFormValues;
}

export async function updateFlow({ id, values }: UpdateFlowParams): Promise<Flow> {
    return api
        .put(`${FLOWS_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<FlowDetailResponse>();
}

export async function deleteFlow(id: number): Promise<void> {
    await api.delete(FLOWS_ENDPOINT, {
        json: [id],
    });
}

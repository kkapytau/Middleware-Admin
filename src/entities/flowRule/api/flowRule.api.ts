import { api, getAllPages, type PageResponse } from "@/shared/api";

import type { FlowRule, FlowRuleFormValues } from "../model";

interface FlowRuleListResponse {
    content: FlowRule[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: string;
}

interface FlowRuleDetailResponse {
    id: number;
    name: string;
    enabled: boolean;
    config: Record<string, unknown>;
    flow: FlowRule["flow"];
}

const FLOW_RULES_ENDPOINT = "internal/api/v1/flow-rules";

export async function getFlowRules(page: number, size: number): Promise<PageResponse<FlowRule>> {
    return await api
        .get(FLOW_RULES_ENDPOINT, {
            searchParams: {
                page,
                size,
            },
        })
        .json<FlowRuleListResponse>();
}

export async function getAllFlowRules(locale: string): Promise<FlowRule[]> {
    return getAllPages(getFlowRules, (a, b) =>
        a.name.localeCompare(b.name, locale, {
            sensitivity: "base",
        }),
    );
}

export async function getFlowRule(id: number): Promise<FlowRule> {
    return api.get(`${FLOW_RULES_ENDPOINT}/${id}`).json<FlowRuleDetailResponse>();
}

export async function createFlowRule(values: FlowRuleFormValues): Promise<FlowRule> {
    return api
        .post(FLOW_RULES_ENDPOINT, {
            json: values,
        })
        .json<FlowRuleDetailResponse>();
}

export interface UpdateFlowRuleParams {
    id: number;
    values: FlowRuleFormValues;
}

export async function updateFlowRule({ id, values }: UpdateFlowRuleParams): Promise<FlowRule> {
    return api
        .put(`${FLOW_RULES_ENDPOINT}/${id}`, {
            json: values,
        })
        .json<FlowRuleDetailResponse>();
}

export async function deleteFlowRule(id: number): Promise<void> {
    await api.delete(FLOW_RULES_ENDPOINT, {
        json: [id],
    });
}

import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants/query.ts";

import { flowRuleKeys, getFlowRule, getFlowRules } from "../api";

export function useFlowRules(page: number, size: number) {
    return useQuery({
        queryKey: [...flowRuleKeys.lists(), page, size],
        queryFn: () => getFlowRules(page, size),
        staleTime: QUERY_STALE_TIME,
    });
}

export function useFlowRule(id: number | undefined) {
    return useQuery({
        queryKey: flowRuleKeys.detail(id as number),
        queryFn: () => getFlowRule(id!),
        enabled: id !== undefined,
    });
}

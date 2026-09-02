import { useQuery } from "@tanstack/react-query";

import { flowFunctionKeys } from "@/entities/flowFunction";
import { getFlowFunction, getFlowFunctions } from "@/entities/flowFunction/api/flowFunction.api";
import { QUERY_STALE_TIME } from "@/shared/constants/query";

export function useFlowFunctions(page: number, size: number) {
    return useQuery({
        queryKey: [...flowFunctionKeys.lists(), page, size],
        queryFn: () => getFlowFunctions(page, size),
        staleTime: QUERY_STALE_TIME,
    });
}

export function useFlowFunction(id: number | null) {
    return useQuery({
        queryKey: flowFunctionKeys.detail(id),
        queryFn: () => getFlowFunction(id as number),
        enabled: id !== null,
    });
}

import { useQuery } from "@tanstack/react-query";

import { getFlowFunction, getFlowFunctions } from "@/entities/flowFunction/api/flowFunction.api";

export const flowFunctionKeys = {
    all: ["flowFunctions"] as const,

    lists: () => [...flowFunctionKeys.all, "list"] as const,

    detail: (id: number | null) => [...flowFunctionKeys.all, "detail", id] as const,
};

export function useFlowFunctions() {
    return useQuery({
        queryKey: flowFunctionKeys.lists(),
        queryFn: getFlowFunctions,
    });
}

export function useFlowFunction(id: number | null) {
    return useQuery({
        queryKey: flowFunctionKeys.detail(id),
        queryFn: () => getFlowFunction(id as number),
        enabled: id !== null,
    });
}

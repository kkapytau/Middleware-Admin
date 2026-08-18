import { useQuery } from "@tanstack/react-query";

import { flowFunctionKeys } from "@/entities/flowFunction";
import { getFlowFunction, getFlowFunctions } from "@/entities/flowFunction/api/flowFunction.api";

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

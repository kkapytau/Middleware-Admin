import { useQuery } from "@tanstack/react-query";

import { getFlowFunctions } from "../api";

export const flowFunctionKeys = {
    all: ["flow-functions"] as const,
};

export function useFlowFunctions() {
    return useQuery({
        queryKey: flowFunctionKeys.all,
        queryFn: getFlowFunctions,
    });
}

import { useQuery } from "@tanstack/react-query";

import { flowKeys, getFlows } from "../api";

export function useFlows() {
    return useQuery({
        queryKey: flowKeys.all,
        queryFn: getFlows,
    });
}

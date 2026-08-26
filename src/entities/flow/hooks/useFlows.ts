import { useQuery } from "@tanstack/react-query";

import { flowKeys, getFlows } from "../api";

export function useFlows(page: number, size: number) {
    return useQuery({
        queryKey: [...flowKeys.lists(), page, size],
        queryFn: () => getFlows(page, size),
    });
}
